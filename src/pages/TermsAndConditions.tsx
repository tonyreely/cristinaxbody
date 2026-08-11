import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Înapoi la pagina principală
        </Link>

        <h1 className="text-4xl font-serif text-foreground mb-8">
          Termeni și Condiții
        </h1>

        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-serif text-foreground mb-3">
              1. Informații Generale
            </h2>
            <p>
              Prezentul document stabilește termenii și condițiile de utilizare a
              serviciilor oferite de <strong>xBody by Cristina</strong> (denumit
              în continuare „Prestatorul"). Prin achiziționarea oricărui
              serviciu sau program, clientul confirmă că a citit, a înțeles și
              acceptă în totalitate acești termeni.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-foreground mb-3">
              2. Servicii Oferite
            </h2>
            <p>
              Prestatorul oferă antrenamente EMS (Electrical Muscle Stimulation)
              personalizate, programe de transformare corporală și consultanță
              asociată. Detaliile fiecărui program, inclusiv durata, frecvența
              ședințelor și prețul, sunt comunicate clientului înainte de
              achiziție.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-foreground mb-3">
              3. Plata și Prețuri
            </h2>
            <p>
              Plata se efectuează în avans, conform pachetului ales. Prețurile
              afișate includ toate taxele aplicabile. Prestatorul își rezervă
              dreptul de a modifica prețurile, modificările aplicându-se doar
              pachetelor achiziționate ulterior.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-foreground mb-3">
              4. Politica de Rambursare
            </h2>
            <p>
              Sumele achitate pentru servicii <strong>nu se returnează</strong>,
              cu excepția cazurilor în care clientul prezintă{" "}
              <strong>probleme grave de sănătate</strong>, documentate medical,
              care îl împiedică să continue antrenamentele. În acest caz,
              clientul trebuie să prezinte un certificat medical emis de un medic
              specialist care confirmă incapacitatea de a participa la ședințe
              EMS.
            </p>
            <p className="mt-2">
              Cererea de rambursare trebuie transmisă în scris în termen de 14
              zile de la emiterea documentului medical. Prestatorul va analiza
              fiecare solicitare individual și va comunica decizia în termen de
              10 zile lucrătoare.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-foreground mb-3">
              5. Programări și Anulări
            </h2>
            <p>
              Ședințele se fac exclusiv pe baza de programare, în funcție de
              disponibilitatea confirmată de Prestator. Clientul trebuie să
              anuleze sau reprogrameze o ședință cu minimum 24 de ore înainte.
              Ședințele neanulate în termenul menționat se consideră efectuate
              și nu pot fi recuperate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-foreground mb-3">
              6. Responsabilitatea Clientului
            </h2>
            <p>
              Clientul este responsabil să informeze Prestatorul despre orice
              condiție medicală, alergie sau restricție care ar putea influența
              siguranța antrenamentelor. Participarea la antrenamente se face pe
              propria răspundere a clientului.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-foreground mb-3">
              7. Confidențialitate
            </h2>
            <p>
              Datele personale colectate (nume, email, telefon) sunt utilizate
              exclusiv pentru furnizarea serviciilor și comunicarea cu clientul.
              Prestatorul nu va partaja datele cu terți fără consimțământul
              explicit al clientului, cu excepția cazurilor prevăzute de lege.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-foreground mb-3">
              8. Modificarea Termenilor
            </h2>
            <p>
              Prestatorul își rezervă dreptul de a modifica prezentele condiții
              în orice moment. Versiunea actualizată va fi publicată pe site.
              Continuarea utilizării serviciilor după publicarea modificărilor
              constituie acceptarea noilor termeni.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-foreground mb-3">
              9. Contact
            </h2>
            <p>
              Pentru întrebări sau solicitări legate de acești termeni, ne puteți
              contacta prin intermediul formularului de pe site sau la adresa de
              email afișată pe pagina principală.
            </p>
          </section>

          <p className="text-sm text-muted-foreground/60 pt-4 border-t border-border">
            Ultima actualizare: Aprilie 2026
          </p>
        </div>
      </div>
    </main>
  );
};

export default TermsAndConditions;
