import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadData {
  prenume: string;
  telefon: string;
  email: string;
  obiectiv: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing environment variables");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body: LeadData = await req.json();
    const { prenume, telefon, email, obiectiv } = body;

    // Validate required fields
    if (!prenume || !telefon || !email || !obiectiv) {
      console.error("Missing required fields:", { prenume: !!prenume, telefon: !!telefon, email: !!email, obiectiv: !!obiectiv });
      return new Response(
        JSON.stringify({ error: "Toate câmpurile sunt obligatorii" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Basic validation
    const trimmedPrenume = prenume.trim();
    const trimmedTelefon = telefon.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedPrenume.length < 2 || trimmedPrenume.length > 100) {
      return new Response(
        JSON.stringify({ error: "Prenumele trebuie să aibă între 2 și 100 caractere" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (trimmedTelefon.length < 10 || trimmedTelefon.length > 15) {
      return new Response(
        JSON.stringify({ error: "Numărul de telefon este invalid" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return new Response(
        JSON.stringify({ error: "Adresa de email nu este validă" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const validGoals = ["slabire", "tonifiere", "dureri-spate", "post-sarcina"];
    if (!validGoals.includes(obiectiv)) {
      return new Response(
        JSON.stringify({ error: "Obiectivul selectat nu este valid" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role (bypasses RLS)
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Insert lead
    const { data: insertedLead, error: insertError } = await supabase
      .from("leads")
      .insert({
        first_name: trimmedPrenume,
        phone: trimmedTelefon,
        email: trimmedEmail,
        goal: obiectiv,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Failed to insert lead:", insertError);
      return new Response(
        JSON.stringify({ error: "Nu am putut salva datele. Te rugăm să încerci din nou." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const leadId = insertedLead.id;
    console.log("Lead inserted successfully:", leadId);

    // Fire and forget: sync to Google Sheets
    const appsScriptUrl = Deno.env.get("GOOGLE_APPS_SCRIPT_URL");
    if (appsScriptUrl) {
      const goalLabels: Record<string, string> = {
        slabire: "Slăbire",
        tonifiere: "Tonifiere",
        "dureri-spate": "Dureri de spate",
        "post-sarcina": "Post-sarcină",
      };

      const payload = {
        id: leadId,
        first_name: trimmedPrenume,
        phone: trimmedTelefon,
        email: trimmedEmail,
        goal: goalLabels[obiectiv] || obiectiv,
        created_at: new Date().toISOString(),
        status: "NEPLĂTIT",
      };

      // Don't await - fire and forget
      fetch(appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(async (res) => {
          if (res.ok) {
            const result = await res.json();
            if (result.rowId) {
              // Update sheet_row_id in background
              await supabase
                .from("leads")
                .update({ sheet_row_id: String(result.rowId) })
                .eq("id", leadId);
              console.log("Sheet row ID updated:", result.rowId);
            }
          }
        })
        .catch((err) => console.error("Failed to sync to sheets:", err));
    }

    return new Response(
      JSON.stringify({ success: true, leadId }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "A apărut o eroare neașteptată" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
