import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [status, setStatus] = useState<"loading" | "valid" | "already" | "invalid" | "success" | "error">("loading");

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }
    fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`, {
      headers: { apikey: SUPABASE_KEY },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.valid === false && data.reason === "already_unsubscribed") setStatus("already");
        else if (data.valid) setStatus("valid");
        else setStatus("invalid");
      })
      .catch(() => setStatus("invalid"));
  }, [token]);

  const handleUnsubscribe = async () => {
    try {
      const { error } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
      if (error) throw error;
      setStatus("success");
    } catch { setStatus("error"); }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {status === "loading" && <p className="text-muted-foreground">Se încarcă...</p>}
        {status === "valid" && (
          <>
            <h1 className="text-2xl font-serif text-foreground">Dezabonare</h1>
            <p className="text-muted-foreground">Ești sigur(ă) că vrei să te dezabonezi de la email-urile noastre?</p>
            <button onClick={handleUnsubscribe} className="bg-primary text-primary-foreground px-6 py-3 rounded font-medium">
              Confirmă dezabonarea
            </button>
          </>
        )}
        {status === "already" && (
          <>
            <h1 className="text-2xl font-serif text-foreground">Deja dezabonat(ă)</h1>
            <p className="text-muted-foreground">Adresa ta de email a fost deja dezabonată.</p>
          </>
        )}
        {status === "success" && (
          <>
            <h1 className="text-2xl font-serif text-foreground">Dezabonare reușită</h1>
            <p className="text-muted-foreground">Nu vei mai primi email-uri de la noi.</p>
          </>
        )}
        {(status === "invalid" || status === "error") && (
          <>
            <h1 className="text-2xl font-serif text-foreground">Link invalid</h1>
            <p className="text-muted-foreground">Acest link de dezabonare nu este valid sau a expirat.</p>
          </>
        )}
      </div>
    </main>
  );
};

export default Unsubscribe;
