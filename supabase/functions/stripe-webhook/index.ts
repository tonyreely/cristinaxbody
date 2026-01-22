import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2025-08-27.basil",
});

const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    console.error("No stripe-signature header");
    return new Response("No signature", { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;

  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, endpointSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", errorMessage);
    return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  console.log("Received Stripe event:", event.type);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const leadId = session.client_reference_id;
    const customerEmail = session.customer_details?.email || session.customer_email;
    const amountTotal = session.amount_total;
    const paymentStatus = session.payment_status;
    
    console.log("Checkout session completed:", {
      sessionId: session.id,
      leadId,
      customerEmail,
      amountTotal,
      paymentStatus,
    });

    if (leadId && paymentStatus === "paid") {
      // Create Supabase client with service role for bypassing RLS
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL") || "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
      );

      // Check if payment record already exists for this session
      const { data: existingPayment } = await supabase
        .from("payments")
        .select("id")
        .eq("stripe_session_id", session.id)
        .single();

      if (existingPayment) {
        console.log("Payment already recorded for session:", session.id);
        return new Response(JSON.stringify({ received: true, status: "already_recorded" }), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        });
      }

      // Insert new payment record
      const { data: paymentData, error: paymentError } = await supabase
        .from("payments")
        .insert({
          lead_id: leadId,
          stripe_session_id: session.id,
          paid: true,
          paid_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (paymentError) {
        console.error("Error inserting payment:", paymentError);
        // Don't return 500 - Stripe will retry. Log and acknowledge.
        return new Response(JSON.stringify({ received: true, error: paymentError.message }), {
          headers: { "Content-Type": "application/json" },
          status: 200,
        });
      }

      console.log("Payment recorded successfully:", paymentData);

      // Trigger sync to Google Sheets
      try {
        const sheetsResponse = await fetch(
          `${Deno.env.get("SUPABASE_URL")}/functions/v1/sync-lead-to-sheets`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
            },
            body: JSON.stringify({ leadId, paid: true }),
          }
        );
        console.log("Sheets sync response:", sheetsResponse.status);
      } catch (sheetsError) {
        console.error("Error syncing to sheets:", sheetsError);
        // Non-critical, don't fail the webhook
      }
    } else {
      console.log("Skipping payment record - no leadId or not paid:", { leadId, paymentStatus });
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});
