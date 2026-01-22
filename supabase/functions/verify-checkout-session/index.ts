import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type VerifyBody = {
  sessionId?: string;
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

    const body = (await req.json().catch(() => ({}))) as VerifyBody;
    const sessionId = (body.sessionId || "").toString().trim();
    const leadId = (body.leadId || "").toString().trim();
    
    if (!sessionId) {
      return new Response(JSON.stringify({ error: "Missing sessionId" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
        },
      }
    );

    const text = await res.text();
    if (!res.ok) {
      console.error("Stripe verify session failed", res.status, text);
      return new Response(JSON.stringify({ error: "Stripe error", details: text }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const session = JSON.parse(text) as {
      payment_status?: string;
      amount_total?: number;
      currency?: string;
      customer_details?: { email?: string | null };
    };

    const paid = session.payment_status === "paid";

    // Update payment record if paid and we have a leadId or can find by session
    if (paid) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Update payment record
      const { error: updateError } = await supabase
        .from("payments")
        .update({ paid: true, paid_at: new Date().toISOString() })
        .eq("stripe_session_id", sessionId);

      if (updateError) {
        console.error("Failed to update payment record:", updateError);
      } else {
        console.log("Payment record updated as paid for session:", sessionId);
      }

      // If we have a leadId, also return it for the frontend to sync
      if (leadId) {
        console.log("Lead ID for sync:", leadId);
      }
    }

    return new Response(
      JSON.stringify({
        paid,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: session.customer_details?.email ?? null,
        leadId: leadId || null,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("verify-checkout-session error", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
