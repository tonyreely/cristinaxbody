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
  // Generate unique request ID for tracing
  const requestId = crypto.randomUUID().slice(0, 8);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  console.log(`[${requestId}] create-checkout-session: start`);

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      console.error(`[${requestId}] Missing STRIPE_SECRET_KEY`);
      return new Response(JSON.stringify({ error: "Missing Stripe secret", requestId }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const origin = req.headers.get("origin") ?? "";
    const baseUrl = origin || "https://cristinaxbody.lovable.app";
    console.log(`[${requestId}] origin=${origin}, baseUrl=${baseUrl}`);

    const body = (await req.json().catch(() => ({}))) as CreateCheckoutBody;
    const email = (body.email || "").toString().trim().toLowerCase();
    const leadId = (body.leadId || "").toString().trim();
    
    console.log(`[${requestId}] email=${email ? "present" : "missing"}, leadId=${leadId ? leadId.slice(0, 8) + "..." : "none"}`);
    
    if (!email) {
      console.error(`[${requestId}] Missing email in request`);
      return new Response(JSON.stringify({ error: "Missing email", requestId }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Log leadId for payment tracking
    if (leadId) {
      console.log(`[${requestId}] Lead ID received for payment tracking: ${leadId}`);
    }

    const params = new URLSearchParams();
    params.set("mode", "payment");
    params.set("payment_method_types[]", "card");
    params.set("customer_email", email);
    params.set("locale", "ro"); // Forțează interfața în română
    
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
    params.set(
      "line_items[0][price_data][product_data][description]",
      "Avansul de 47 RON se scade integral din pret (nu e o taxa suplimentara). Este confirmarea ta ca vrei sa faci o schimbare reala."
    );

    console.log(`[${requestId}] Calling Stripe API...`);
    
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
      console.error(`[${requestId}] Stripe error: status=${res.status}, body=${text}`);
      // Extract Stripe error message if available
      let stripeError = "Stripe payment error";
      try {
        const parsed = JSON.parse(text);
        stripeError = parsed?.error?.message || stripeError;
      } catch {}
      
      return new Response(JSON.stringify({ 
        error: stripeError, 
        details: text,
        requestId 
      }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const session = JSON.parse(text) as { url?: string; id?: string };
    console.log(`[${requestId}] Stripe session created: ${session.id}, url domain: ${session.url?.split("/")[2]}`);
    
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
        console.error(`[${requestId}] Failed to create payment record:`, paymentError);
      } else {
        console.log(`[${requestId}] Payment record created for session: ${session.id}`);
      }
    }
    
    console.log(`[${requestId}] Success - returning checkout URL`);
    return new Response(JSON.stringify({ url: session.url, id: session.id, requestId }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(`[${requestId}] Unexpected error:`, e);
    return new Response(JSON.stringify({ 
      error: "Unexpected server error", 
      details: e instanceof Error ? e.message : String(e),
      requestId 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
