const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

Deno.serve(async (req) => {
  const requestId = crypto.randomUUID().slice(0, 8);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  console.log(`[${requestId}] redirect-to-checkout: start`);

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      console.error(`[${requestId}] Missing STRIPE_SECRET_KEY`);
      // Redirect to error page
      return new Response(null, {
        status: 303,
        headers: {
          "Location": "https://cristinaxbody.lovable.app/?checkout_error=config",
          "Cache-Control": "no-store",
        },
      });
    }

    // Get query params from URL (GET request for direct navigation)
    const url = new URL(req.url);
    const email = (url.searchParams.get("email") || "").trim().toLowerCase();
    const leadId = (url.searchParams.get("leadId") || "").trim();
    const returnTo = url.searchParams.get("returnTo") || "https://cristinaxbody.lovable.app";
    
    console.log(`[${requestId}] email=${email ? "present" : "missing"}, leadId=${leadId ? leadId.slice(0, 8) + "..." : "none"}`);
    
    if (!email) {
      console.error(`[${requestId}] Missing email in request`);
      return new Response(null, {
        status: 303,
        headers: {
          "Location": `${returnTo}/?checkout_error=email`,
          "Cache-Control": "no-store",
        },
      });
    }

    // Build Stripe checkout session params
    const params = new URLSearchParams();
    params.set("mode", "payment");
    params.set("payment_method_types[]", "card");
    params.set("customer_email", email);
    params.set("locale", "ro");
    
    // Include leadId in success URL for payment verification
    const successUrl = leadId 
      ? `${returnTo}/thank-you?session_id={CHECKOUT_SESSION_ID}&lead_id=${leadId}`
      : `${returnTo}/thank-you?session_id={CHECKOUT_SESSION_ID}`;
    params.set("success_url", successUrl);
    params.set("cancel_url", `${returnTo}/?canceled=1`);

    // 47.00 RON deposit - real Stripe price ID
    params.set("line_items[0][price]", "price_1SZ6cLFGNkHneS3ebOWNKUZG");
    params.set("line_items[0][quantity]", "1");

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
      return new Response(null, {
        status: 303,
        headers: {
          "Location": `${returnTo}/?checkout_error=stripe`,
          "Cache-Control": "no-store",
        },
      });
    }

    const session = JSON.parse(text) as { url?: string; id?: string };
    console.log(`[${requestId}] Stripe session created: ${session.id}`);
    
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
    
    if (!session.url) {
      console.error(`[${requestId}] No URL in Stripe response`);
      return new Response(null, {
        status: 303,
        headers: {
          "Location": `${returnTo}/?checkout_error=nourl`,
          "Cache-Control": "no-store",
        },
      });
    }

    // 303 redirect directly to Stripe checkout
    console.log(`[${requestId}] Redirecting to Stripe checkout`);
    return new Response(null, {
      status: 303,
      headers: {
        "Location": session.url,
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error(`[${requestId}] Unexpected error:`, e);
    return new Response(null, {
      status: 303,
      headers: {
        "Location": "https://cristinaxbody.lovable.app/?checkout_error=server",
        "Cache-Control": "no-store",
      },
    });
  }
});
