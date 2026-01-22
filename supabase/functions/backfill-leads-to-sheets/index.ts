import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify backfill token for security
    const backfillToken = Deno.env.get("BACKFILL_TOKEN");
    const authHeader = req.headers.get("Authorization") || "";
    const providedToken = authHeader.replace("Bearer ", "");

    if (!backfillToken || providedToken !== backfillToken) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const appsScriptUrl = Deno.env.get("GOOGLE_APPS_SCRIPT_URL");
    if (!appsScriptUrl) {
      return new Response(JSON.stringify({ error: "Missing Apps Script URL" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all leads
    const { data: leads, error: leadsError } = await supabase
      .from("leads")
      .select("id, first_name, phone, email, goal, created_at, sheet_row_id")
      .order("created_at", { ascending: true });

    if (leadsError) {
      console.error("Error fetching leads:", leadsError);
      return new Response(JSON.stringify({ error: "Failed to fetch leads" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch all paid payments
    const { data: payments, error: paymentsError } = await supabase
      .from("payments")
      .select("lead_id")
      .eq("paid", true);

    if (paymentsError) {
      console.error("Error fetching payments:", paymentsError);
    }

    const paidLeadIds = new Set((payments || []).map((p) => p.lead_id));

    const goalLabels: Record<string, string> = {
      slabire: "Slăbire",
      tonifiere: "Tonifiere",
      "dureri-spate": "Dureri de spate",
      "post-sarcina": "Post-sarcină",
    };

    let synced = 0;
    let errors = 0;

    for (const lead of leads || []) {
      const createdAt = new Date(lead.created_at);
      const formattedDate = `${createdAt.getDate().toString().padStart(2, "0")}.${(createdAt.getMonth() + 1).toString().padStart(2, "0")}.${createdAt.getFullYear()}`;

      const status = paidLeadIds.has(lead.id) ? "PLĂTIT" : "NEPLĂTIT";

      const payload = {
        data: formattedDate,
        nume: lead.first_name,
        telefon: lead.phone,
        email: lead.email,
        scop: goalLabels[lead.goal ?? ""] || lead.goal || "",
        status: status,
        existingRowId: lead.sheet_row_id || null,
      };

      try {
        const response = await fetch(appsScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const responseText = await response.text();

        if (response.ok) {
          synced++;
          // Update sheet_row_id if returned
          try {
            const result = JSON.parse(responseText);
            if (result.rowId && !lead.sheet_row_id) {
              await supabase
                .from("leads")
                .update({ sheet_row_id: result.rowId.toString() })
                .eq("id", lead.id);
            }
          } catch {
            // Ignore parse errors
          }
        } else {
          console.error(`Failed to sync lead ${lead.id}:`, responseText);
          errors++;
        }
      } catch (e) {
        console.error(`Error syncing lead ${lead.id}:`, e);
        errors++;
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log(`Backfill complete: ${synced} synced, ${errors} errors`);

    return new Response(
      JSON.stringify({
        success: true,
        total: leads?.length || 0,
        synced,
        errors,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("backfill-leads-to-sheets error:", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
