const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

type CreateCheckoutBody = {
  email?: string;
  leadId?: string;
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
    const leadId = (body.leadId || "").toString().trim();
    
    if (!email) {
      return new Response(JSON.stringify({ error: "Missing email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create payment record if leadId is provided
    if (leadId) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      // We'll update with the actual session ID after creating it
      console.log("Lead ID received for payment tracking:", leadId);
    }

    const params = new URLSearchParams();
    params.set("mode", "payment");
    params.set("payment_method_types[]", "card");
    params.set("customer_email", email);
    // Include leadId in success URL for payment verification
    const successUrl = leadId 
      ? `${baseUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}&lead_id=${leadId}`
      : `${baseUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`;
    params.set("success_url", successUrl);
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
    
    // Create payment record with session ID
    if (leadId && session.id) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      const { error: paymentError } = await supabase.from("payments").insert({
        lead_id: leadId,
        stripe_session_id: session.id,
        paid: false,
      });
      
      if (paymentError) {
        console.error("Failed to create payment record:", paymentError);
      } else {
        console.log("Payment record created for session:", session.id);
      }
    }
    
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
