import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCTAModal } from "@/contexts/CTAModalContext";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Comprehensive input validation schema
const leadSchema = z.object({
  prenume: z
    .string()
    .trim()
    .min(2, { message: "Prenumele trebuie să aibă minim 2 caractere" })
    .max(100, { message: "Prenumele este prea lung" })
    .regex(/^[a-zA-ZăâîșțĂÂÎȘȚ\s\-']+$/, { 
      message: "Prenumele conține caractere invalide" 
    }),
  telefon: z
    .string()
    .trim()
    .min(10, { message: "Numărul de telefon este prea scurt" })
    .max(15, { message: "Numărul de telefon este prea lung" })
    .regex(/^[0-9+\s\-()]+$/, { 
      message: "Numărul de telefon conține caractere invalide" 
    }),
  email: z
    .string()
    .trim()
    .email({ message: "Adresa de email nu este validă" })
    .max(255, { message: "Email-ul este prea lung" })
    .toLowerCase(),
  obiectiv: z
    .enum(["slabire", "tonifiere", "dureri-spate", "post-sarcina"], {
      errorMap: () => ({ message: "Te rugăm să selectezi un obiectiv valid" })
    })
});

const CTAModal = () => {
  const { isOpen, closeModal } = useCTAModal();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    prenume: "",
    telefon: "",
    email: "",
    obiectiv: "",
  });
  const [leadId, setLeadId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStartingCheckout, setIsStartingCheckout] = useState(false);

  // Load Stripe script and fire InitiateCheckout pixel when step 2 is shown
  useEffect(() => {
    if (step === 2 && isOpen) {
      // Fire Meta Pixel InitiateCheckout event
      if ((window as any).fbq) {
        (window as any).fbq('track', 'InitiateCheckout', {
          value: 47,
          currency: 'RON'
        });
        console.log('Meta Pixel: InitiateCheckout fired');
      }
    }
  }, [step, isOpen]);

  // Reset step when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setFormData({ prenume: "", telefon: "", email: "", obiectiv: "" });
      setLeadId(null);
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Comprehensive validation with zod
    try {
      const validatedData = leadSchema.parse(formData);

      setIsSubmitting(true);
      
      // Save lead data to database with validated and sanitized input
      const { data: insertedLead, error } = await supabase.from("leads").insert({
        first_name: validatedData.prenume,
        phone: validatedData.telefon,
        email: validatedData.email,
        goal: validatedData.obiectiv,
      }).select("id").single();

      if (error) {
        throw error;
      }

      // Store lead ID for checkout
      const newLeadId = insertedLead?.id;
      if (newLeadId) {
        setLeadId(newLeadId);
        
        // Sync to Google Sheets with NEPLĂTIT status (fire and forget)
        supabase.functions.invoke("sync-lead-to-sheets", {
          body: { leadId: newLeadId, status: "NEPLĂTIT" },
        }).then(({ error: syncError }) => {
          if (syncError) {
            console.error("Failed to sync lead to sheets:", syncError);
          } else {
            console.log("Lead synced to sheets with NEPLĂTIT status");
          }
        });
      }

      // Success - move to step 2
      setStep(2);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Display validation error
        const firstError = error.errors[0];
        toast({ 
          title: firstError.message,
          variant: "destructive" 
        });
      } else {
        toast({ 
          title: "A apărut o eroare", 
          description: "Te rugăm să încerci din nou.",
          variant: "destructive" 
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    closeModal();
  };

  const startCheckout = async () => {
    try {
      setIsStartingCheckout(true);
      const { data, error } = await supabase.functions.invoke(
        "create-checkout-session",
        {
          body: {
            email: formData.email,
            leadId: leadId,
          },
        }
      );

      if (error) throw error;
      if (!data?.url) {
        throw new Error("Missing Stripe Checkout URL");
      }

      window.location.href = data.url as string;
    } catch (err) {
      console.error("Failed to start checkout", err);
      toast({
        title: "Nu am putut porni plata",
        description: "Te rugăm să încerci din nou.",
        variant: "destructive",
      });
      setIsStartingCheckout(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-richblack/90 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
              aria-label="Închide"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Content */}
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-2">
                        🎉 Excelent! Ai blocat Pachetul <span className="text-primary">"3+1 GRATIS"</span> la doar <span className="text-primary">347 RON</span> <span className="line-through text-muted-foreground text-lg">436 RON</span>
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Mai ai un singur pas pentru a-ți securiza locul în calendar în Ianuarie.
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">Progres</span>
                        <span className="text-xs font-semibold text-primary">50% Complet</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "50%" }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-primary to-gold-400 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="prenume" className="text-foreground">
                          Prenume
                        </Label>
                        <Input
                          id="prenume"
                          type="text"
                          placeholder="Cum îți spunem?"
                          value={formData.prenume}
                          onChange={(e) => handleInputChange("prenume", e.target.value)}
                          className="bg-muted border-border focus:border-primary focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="telefon" className="text-foreground">
                          Telefon
                        </Label>
                        <Input
                          id="telefon"
                          type="tel"
                          placeholder="Pentru confirmarea programării"
                          value={formData.telefon}
                          onChange={(e) => handleInputChange("telefon", e.target.value)}
                          className="bg-muted border-border focus:border-primary focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Unde îți trimitem sfaturile gratuite?"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-muted border-border focus:border-primary focus:ring-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="obiectiv" className="text-foreground">
                          Care este obiectivul tău principal?
                        </Label>
                        <Select
                          value={formData.obiectiv}
                          onValueChange={(value) => handleInputChange("obiectiv", value)}
                        >
                          <SelectTrigger className="bg-muted border-border focus:border-primary focus:ring-primary">
                            <SelectValue placeholder="Selectează obiectivul" />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            <SelectItem value="slabire">
                              Vreau să scap de burtică / kg în plus
                            </SelectItem>
                            <SelectItem value="tonifiere">
                              Vreau tonifiere și definire musculară
                            </SelectItem>
                            <SelectItem value="dureri-spate">
                              Vreau să scap de durerile de spate
                            </SelectItem>
                            <SelectItem value="post-sarcina">
                              Vreau să revin în formă după sarcină
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-6 bg-gradient-to-r from-primary to-gold-400 text-primary-foreground font-display font-bold text-sm md:text-base py-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                      >
                        {isSubmitting ? (
                          "Se procesează..."
                        ) : (
                          "PASUL URMĂTOR CĂTRE CORPUL LA CARE VISEZI »"
                        )}
                      </Button>
                    </form>

                    {/* Trust Badge */}
                    <p className="text-center text-xs text-muted-foreground mt-4">
                      🔒 Datele tale sunt în siguranță și nu vor fi distribuite.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Step 2 Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-2">
                        🔒 Ești la 99%... Mai ai un singur pas.
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Te rog să confirmi locația și să securizezi rezervarea.
                      </p>
                    </div>

                    {/* Progress Bar - 99% Green */}
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">Progres</span>
                        <span className="text-xs font-semibold text-green-500">99% Complet</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: "50%" }}
                          animate={{ width: "99%" }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Commitment Message Box */}
                    <div className="mb-8 p-5 bg-amber-50/10 dark:bg-amber-900/10 border border-amber-200/30 dark:border-amber-700/30 rounded-lg">
                      <p className="text-sm md:text-base text-foreground/90 leading-relaxed italic">
                        "Lucrăm în regim privat, așa că timpul rezervat este 100% al tău. Avansul de <span className="font-semibold text-primary">47 RON</span> se scade integral din preț (nu e o taxă). Nu îl privi ca pe o plată, ci ca pe o promisiune. Este modul tău concret de a spune: <span className="font-semibold">'De data asta sunt serios și chiar vreau să fac o schimbare în viața mea'</span>."
                      </p>
                    </div>

                    {/* Stripe Payment Button */}
                    <div className="flex justify-center py-6">
                      <button
                        type="button"
                        onClick={startCheckout}
                        disabled={isStartingCheckout}
                        className="inline-flex items-center justify-center px-8 py-4 bg-[#635BFF] hover:bg-[#5851DB] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {isStartingCheckout ? "Se deschide plata..." : "Începe Transformarea"}
                      </button>
                    </div>

                    {/* Trust Badge */}
                    <p className="text-center text-xs text-muted-foreground mt-4">
                      🔒 Plată securizată prin Stripe. Datele tale sunt protejate.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CTAModal;
