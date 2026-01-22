const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type CreateCheckoutBody = {
  email?: string;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      return new Response(JSON.stringify({ error: "Missing Stripe secret" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const origin = req.headers.get("origin") ?? "";
    const baseUrl = origin || "https://cristinaxbody.lovable.app";

    const body = (await req.json().catch(() => ({}))) as CreateCheckoutBody;
    const email = (body.email || "").toString().trim().toLowerCase();
    if (!email) {
      return new Response(JSON.stringify({ error: "Missing email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const params = new URLSearchParams();
    params.set("mode", "payment");
    params.set("payment_method_types[]", "card");
    params.set("customer_email", email);
    params.set("success_url", `${baseUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`);
    params.set("cancel_url", `${baseUrl}/?canceled=1`);

    // 47.00 RON deposit
    params.set("line_items[0][quantity]", "1");
    params.set("line_items[0][price_data][currency]", "ron");
    params.set("line_items[0][price_data][unit_amount]", "4700");
    params.set("line_items[0][price_data][product_data][name]", "Avans rezervare xBody (47 RON)");

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error("Stripe create session failed", res.status, text);
      return new Response(JSON.stringify({ error: "Stripe error", details: text }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const session = JSON.parse(text) as { url?: string; id?: string };
    return new Response(JSON.stringify({ url: session.url, id: session.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("create-checkout-session error", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
