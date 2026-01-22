import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type SyncBody = {
  leadId: string;
  status: "PLĂTIT" | "NEPLĂTIT";
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const appsScriptUrl = Deno.env.get("GOOGLE_APPS_SCRIPT_URL");
    if (!appsScriptUrl) {
      console.error("Missing GOOGLE_APPS_SCRIPT_URL secret");
      return new Response(JSON.stringify({ error: "Missing Apps Script URL" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = (await req.json().catch(() => ({}))) as SyncBody;
    const { leadId, status } = body;

    if (!leadId || !status) {
      return new Response(JSON.stringify({ error: "Missing leadId or status" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch lead data
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .select("first_name, phone, email, goal, created_at, sheet_row_id")
      .eq("id", leadId)
      .single();

    if (leadError || !lead) {
      console.error("Lead not found:", leadError);
      return new Response(JSON.stringify({ error: "Lead not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Format date as DD.MM.YYYY
    const createdAt = new Date(lead.created_at);
    const formattedDate = `${createdAt.getDate().toString().padStart(2, "0")}.${(createdAt.getMonth() + 1).toString().padStart(2, "0")}.${createdAt.getFullYear()}`;

    // Map goal values to Romanian labels
    const goalLabels: Record<string, string> = {
      slabire: "Slăbire",
      tonifiere: "Tonifiere",
      "dureri-spate": "Dureri de spate",
      "post-sarcina": "Post-sarcină",
    };

    const payload = {
      data: formattedDate,
      nume: lead.first_name,
      telefon: lead.phone,
      email: lead.email,
      scop: goalLabels[lead.goal ?? ""] || lead.goal || "",
      status: status,
      existingRowId: lead.sheet_row_id || null,
    };

    console.log("Syncing to sheet:", payload);

    // Send to Apps Script
    const response = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log("Apps Script response:", response.status, responseText);

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Apps Script error", details: responseText }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse response and update sheet_row_id if returned
    try {
      const result = JSON.parse(responseText);
      if (result.rowId && !lead.sheet_row_id) {
        await supabase
          .from("leads")
          .update({ sheet_row_id: result.rowId.toString() })
          .eq("id", leadId);
        console.log("Updated lead with sheet_row_id:", result.rowId);
      }
    } catch {
      // Response might not be JSON, that's okay
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("sync-lead-to-sheets error:", e);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
