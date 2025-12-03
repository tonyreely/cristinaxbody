import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LocationsSection from "@/components/LocationsSection";
import FounderSection from "@/components/FounderSection";
import PillarsSection from "@/components/PillarsSection";
import ComparisonSection from "@/components/ComparisonSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickedText = target.textContent || "";
      const parentText = target.closest("button")?.textContent || "";
      
      if (
        clickedText.includes("VREAU SĂ ÎNCEP TRANSFORMAREA") ||
        parentText.includes("VREAU SĂ ÎNCEP TRANSFORMAREA")
      ) {
        console.log("GLOBAL TRACKING: Click detected");
        if ((window as any).fbq) {
          (window as any).fbq("track", "InitiateCheckout");
          console.log("GLOBAL TRACKING: Pixel fired");
        }
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <ProblemSection />
      <TestimonialsSection />
      <LocationsSection />
      <FounderSection />
      <PillarsSection />
      <ComparisonSection />
      <FAQSection />
      <CTASection />
    </main>
  );
};

export default Index;
