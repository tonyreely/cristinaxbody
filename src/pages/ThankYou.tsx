import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type VerifyResponse = {
  paid: boolean;
  amount_total?: number;
  currency?: string;
  customer_email?: string | null;
  leadId?: string | null;
};

const PURCHASE_PIXEL_ID = "863161972736074";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id") || "";
  const leadIdFromUrl = searchParams.get("lead_id") || "";

  const [status, setStatus] = useState<
    "idle" | "verifying" | "paid" | "unpaid" | "error"
  >(sessionId ? "verifying" : "error");

  const trackedKey = useMemo(
    () => (sessionId ? `purchase_tracked_${sessionId}` : ""),
    [sessionId]
  );

  useEffect(() => {
    const verify = async () => {
      if (!sessionId) {
        setStatus("error");
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke(
          "verify-checkout-session",
          {
            body: { sessionId, leadId: leadIdFromUrl },
          }
        );
        if (error) throw error;

        const payload = data as VerifyResponse;
        if (!payload?.paid) {
          setStatus("unpaid");
          return;
        }

        // Fire Purchase ONLY for pixel 863...
        const alreadyTracked = trackedKey
          ? window.localStorage.getItem(trackedKey) === "true"
          : false;

        if (!alreadyTracked && (window as any).fbq) {
          (window as any).fbq(
            "trackSingle",
            PURCHASE_PIXEL_ID,
            "Purchase",
            { value: 47.0, currency: "RON" }
          );
          if (trackedKey) window.localStorage.setItem(trackedKey, "true");
          console.log("Meta Pixel: Purchase fired (trackSingle)");
        }

        // Sync to Google Sheets with PLĂTIT status
        const leadIdToSync = leadIdFromUrl || payload.leadId;
        if (leadIdToSync) {
          supabase.functions.invoke("sync-lead-to-sheets", {
            body: { leadId: leadIdToSync, status: "PLĂTIT" },
          }).then(({ error: syncError }) => {
            if (syncError) {
              console.error("Failed to sync payment to sheets:", syncError);
            } else {
              console.log("Payment synced to sheets with PLĂTIT status");
            }
          });
        }

        setStatus("paid");
      } catch (e) {
        console.error("Failed to verify checkout session", e);
        setStatus("error");
      }
    };

    void verify();
  }, [sessionId, leadIdFromUrl, trackedKey]);

  return (
    <main className="min-h-screen bg-background">
      <section className="max-w-2xl mx-auto px-4 py-24">
        {status === "verifying" && (
          <>
            <h1 className="text-3xl md:text-4xl font-serif text-foreground">
              Verificăm plata...
            </h1>
            <p className="mt-4 text-muted-foreground">
              Te rugăm să aștepți câteva secunde.
            </p>
          </>
        )}

        {status === "paid" && (
          <>
            <h1 className="text-3xl md:text-4xl font-serif text-foreground">
              Mulțumim! Plata a fost confirmată.
            </h1>
            <p className="mt-4 text-muted-foreground">
              Locul tău este securizat. Revenim în cel mai scurt timp cu
              confirmarea.
            </p>
          </>
        )}

        {status === "unpaid" && (
          <>
            <h1 className="text-3xl md:text-4xl font-serif text-foreground">
              Plata nu a fost confirmată.
            </h1>
            <p className="mt-4 text-muted-foreground">
              Dacă ai întâmpinat o problemă, poți încerca din nou.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-3xl md:text-4xl font-serif text-foreground">
              Nu am putut verifica plata.
            </h1>
            <p className="mt-4 text-muted-foreground">
              Verifică linkul sau încearcă din nou.
            </p>
          </>
        )}

        <div className="mt-10">
          <Link
            to="/"
            className="text-primary underline underline-offset-4"
          >
            Înapoi la pagină
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ThankYou;
