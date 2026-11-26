import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Timer,
  HeartPulse,
  ShieldCheck,
  Activity,
  Sparkles,
  Flame,
  SlidersHorizontal,
  Smile,
  Dumbbell,
  MapPin,
  Phone,
  Check,
} from "lucide-react";

const benefits = [
  {
    icon: Dumbbell,
    title: "Creșterea forței și a masei musculare",
    text: "EMS ajută la dezvoltarea musculaturii prin activarea simultană a mai multor grupe de mușchi, crescând forța și rezistența.",
  },
  {
    icon: Timer,
    title: "Reducerea timpului de antrenament",
    text: "O sesiune EMS activează până la 90% din fibrele musculare în același timp — antrenamente mai scurte, la fel de eficiente.",
  },
  {
    icon: HeartPulse,
    title: "Recuperare musculară mai rapidă",
    text: "Folosită în fizioterapie: reduce tensiunea și crește circulația sanguină, accelerând vindecarea după leziuni.",
  },
  {
    icon: ShieldCheck,
    title: "Reducerea durerilor musculare și articulare",
    text: "Stimularea electrică reduce disconfortul cauzat de tensiune musculară sau suprasolicitare.",
  },
  {
    icon: Activity,
    title: "Postură și stabilitate",
    text: "Antrenarea mușchilor posturali profunzi ajută la corectarea posturii și întărirea coloanei vertebrale.",
  },
  {
    icon: Zap,
    title: "Activarea musculaturii profunde",
    text: "EMS ajunge la mușchii greu accesibili prin antrenamentele obișnuite, oferind un antrenament complet.",
  },
  {
    icon: Sparkles,
    title: "Terapie anti-celulită și tonifiere",
    text: "Prin stimularea mușchilor și a circulației, contribuie la îmbunătățirea aspectului pielii.",
  },
  {
    icon: Flame,
    title: "Îmbunătățirea metabolismului",
    text: "Crește rata metabolică, ajutând la arderea caloriilor și la scăderea în greutate.",
  },
  {
    icon: SlidersHorizontal,
    title: "Personalizare totală",
    text: "Intensitatea impulsurilor se reglează în funcție de obiectivele și condiția fizică a fiecăruia.",
  },
  {
    icon: Smile,
    title: "Reducerea oboselii și a stresului",
    text: "Relaxarea musculară și circulația mai bună contribuie la o stare generală de bine.",
  },
];

const packages = [
  { sessions: "1 ȘEDINȚĂ", old: "110 RON", discount: "-10%", price: "99 RON", validity: "SINGLE CLASS" },
  { sessions: "6 ȘEDINȚE", old: "576 RON", discount: "-10%", price: "519 RON", validity: "VALABIL 6 SĂPTĂMÂNI" },
  { sessions: "12 ȘEDINȚE", old: "1068 RON", discount: "-20%", price: "855 RON", validity: "VALABIL 3 LUNI", featured: true },
  { sessions: "24 ȘEDINȚE", old: "1992 RON", discount: "-30%", price: "1395 RON", validity: "VALABIL 6 LUNI" },
  { sessions: "48 ȘEDINȚE", old: "3840 RON", discount: "-40%", price: "2304 RON", validity: "VALABIL 12 LUNI" },
];

const included = [
  "Antrenor personal",
  "Antrenamente personalizate pe obiective",
  "Consiliere nutrițională",
  "Analiză corporală și măsurători",
  "Monitorizarea rezultatelor pe toată perioada",
  "Asigurarea condițiilor de igienă necesare",
];

const pillars = [
  {
    title: "Echipamente moderne",
    text: "Îți punem la dispoziție echipamente de ultimă generație pentru ca tu să obții cele mai bune rezultate.",
  },
  {
    title: "Plan nutrițional dedicat",
    text: "Primești un plan nutrițional dedicat, astfel încât să slăbești cu doar 30 de minute de antrenament pe zi.",
  },
  {
    title: "Instructori calificați",
    text: "Instructorii noștri sunt pregătiți să îți asigure un antrenament realizat corect, pentru a-ți atinge obiectivele.",
  },
  {
    title: "Clienți mulțumiți",
    text: "Alătură-te celor peste 40.000 de clienți mulțumiți de antrenamentele Body Tone EMS.",
  },
];

const locations = [
  {
    title: "CLUJ — IRIS",
    address: "Strada Oașului 86-90",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Strada+Oașului+86-90,+Cluj-Napoca",
  },
  {
    title: "CLUJ — MĂNĂȘTUR",
    address: "Strada Agricultorilor 1",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Strada+Agricultorilor+1,+Cluj-Napoca",
  },
  {
    title: "FLOREȘTI",
    address: "Strada Eroilor 82B",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Strada+Eroilor+82B,+Florești",
  },
];

const trainerReasons = [
  "Tehnicile și programele pe care le implementez sunt personalizate și țin cont de starea de sănătate și de obiectivele fiecărui client.",
  "Structură și evaluare — înainte de orice antrenament discutăm pentru a stabili cea mai bună modalitate de lucru, adaptată programului tău.",
  "Motivație — te responsabilizez și te ajut să îți depășești limitele.",
  "Cunoștințe și cercetare — sunt mereu în curs de învățare pentru a mă perfecționa.",
  "Atitudine și comportament — respect fiecare client și mă concentrez pe îndeplinirea obiectivelor.",
];

const Prezentare = () => {
  useEffect(() => {
    document.title = "Body Tone EMS Cluj — Slăbește sănătos prin electrostimulare";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--gold-500)/0.12),transparent_60%)]" />
        <div className="container relative mx-auto px-4 md:px-8 py-20 md:py-28 text-center">
          <p className="text-primary tracking-[0.3em] text-xs md:text-sm font-semibold mb-6">
            BODY TONE EMS · CLUJ-NAPOCA
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
            Remodelează-ți corpul cu <span className="text-primary">Body Tone EMS</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Slăbește sănătos prin electrostimulare musculară. Antrenamente personalizate de 20–30 de
            minute, cu antrenor personal și plan nutrițional dedicat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 font-semibold text-primary-foreground hover:opacity-90 transition"
            >
              Vezi oferta actuală
            </Link>
            <a
              href="tel:+40749577746"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-8 py-4 font-semibold hover:border-primary/50 transition"
            >
              <Phone className="w-4 h-4" /> +40 749 577 746
            </a>
          </div>
        </div>
      </header>

      {/* Ce este EMS */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Ce este antrenamentul EMS
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Electrostimularea musculară (EMS) este o tehnică utilizată pentru a stimula contracția
            mușchilor prin intermediul impulsurilor electrice. Poate fi folosită în diverse scopuri,
            inclusiv în recuperarea medicală, antrenamentul sportiv și îmbunătățirea aspectului fizic.
          </p>
        </div>
      </section>

      {/* Beneficii */}
      <section className="py-20 md:py-28 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            Beneficiile EMS
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-14">
            EMS folosește impulsuri electrice pentru a stimula contracția mușchilor, aducând o serie
            de avantaje atât în fitness, cât și în recuperarea medicală.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-border/60 bg-card p-7 hover:border-primary/30 transition"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rezultat */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <p className="text-primary tracking-[0.25em] text-xs font-semibold text-center mb-4">
            STUDIU DE CAZ
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            -15 kilograme în 4 luni
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Sportul nu este doar slăbire, hipertrofie, creșterea fesierilor sau abdomen plat. Sportul
            este stare de bine într-un corp frumos și armonios.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Vârstă", value: "35 ani" },
              { label: "Greutate iniţială", value: "62 kg" },
              { label: "Înălțime", value: "165 cm" },
              { label: "Ședințe / lună", value: "3" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border/60 bg-card p-6 text-center">
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">{s.label}</p>
                <p className="font-display text-2xl font-bold">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">
              Rezultat după doar 12 ședințe
            </p>
            <p className="font-display text-4xl font-bold text-primary">47 kg</p>
          </div>
        </div>
      </section>

      {/* Capsula Body Space */}
      <section className="py-20 md:py-28 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-8">
            Capsula Body Space
          </h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Unul dintre principalele efecte ale antrenamentului pe capsula Body Space este reducerea
              centimetrilor din zonele persistente ale corpului. Datorită acțiunii de vid, care
              stimulează circulația sângelui, se produce o stimulare a țesutului adipos, ceea ce duce
              la reducerea circumferințelor în zonele problematice.
            </p>
            <p>
              Un alt beneficiu este îmbunătățirea stării pielii: efectul de vid favorizează o mai bună
              oxigenare a țesuturilor, are efect detoxifiant, dilată vasele de sânge și îmbunătățește
              metabolismul celular. Ca rezultat, pielea devine mai fermă, iar textura ei se
              uniformizează.
            </p>
            <p>
              Pe lângă beneficiile legate de pierderea în greutate, tehnologia capsulei Body Space are
              un impact pozitiv asupra sănătății în timpul antrenamentului, reducând presiunea asupra
              coloanei vertebrale și a mușchilor. Solicitarea articulațiilor este mai mică în
              comparație cu antrenamentul pe o bandă de alergat clasică.
            </p>
          </div>
        </div>
      </section>

      {/* Pilari */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-primary tracking-[0.25em] text-xs font-semibold text-center mb-4">
            SCHIMBAREA ÎNCEPE CU NOI
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-14">
            De ce Body Tone EMS
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border/60 bg-card p-7">
                <h3 className="font-display font-semibold text-lg mb-3 text-primary">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preturi */}
      <section id="preturi" className="py-20 md:py-28 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            Listă de prețuri
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-14">
            Toate pachetele includ antrenor personal, consiliere nutrițională și monitorizarea
            rezultatelor.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {packages.map((p) => (
              <div
                key={p.sessions}
                className={`rounded-2xl border bg-card p-8 flex flex-col ${
                  p.featured ? "border-primary/60 shadow-lg" : "border-border/60"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-xl">{p.sessions}</h3>
                  <span className="rounded-full bg-primary/15 text-primary text-xs font-semibold px-3 py-1">
                    {p.discount}
                  </span>
                </div>
                <p className="text-muted-foreground line-through text-sm">{p.old}</p>
                <p className="font-display text-3xl font-bold text-primary mb-1">{p.price}</p>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-6">
                  {p.validity}
                </p>
                <ul className="space-y-2 mb-8 flex-1">
                  {included.map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 transition"
                >
                  Înscrie-te
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainer */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <p className="text-primary tracking-[0.25em] text-xs font-semibold text-center mb-4">
            PERSONAL TRAINER
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-8">
            Cristina Oșan
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Activez în domeniul sportiv de 12 ani, începând activitatea la 18 ani. Am urmat un curs de
            EMS Miha Bodytec în Germania, am absolvit cursul de instructor Fitness Level 1 și Level 2
            la Fitness Scandinavia, precum și Cursul Autorizat de Consultant Nutriție Generală și
            Remodelare Corporală.
          </p>
          <h3 className="font-display font-semibold text-lg mb-4">
            De ce să mă alegi ca Personal Trainer?
          </h3>
          <ul className="space-y-4 mb-8">
            {trainerReasons.map((r, i) => (
              <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                <span className="font-display font-bold text-primary shrink-0">{i + 1}.</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Încrederea pe care o transmit clienților este cea mai importantă pentru mine. La rândul meu
            am slăbit 40 kg, rezultat pe care l-am păstrat până în prezent, doar prin muncă și
            determinare.
          </p>
          <p className="font-display font-semibold text-primary mt-6">
            VĂ AȘTEPTĂM CU DRAG LA ANTRENAMENTE!
          </p>
        </div>
      </section>

      {/* Locatii */}
      <section className="py-20 md:py-28 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">
            Studiouri private
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-14">
            Body Tone EMS este un spațiu privat, conceput special pentru cei care caută discreție și
            intimitate în antrenamentele lor. Cu circuit închis și un număr limitat de membri.
          </p>
          <div className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
            {locations.map((l) => (
              <a
                key={l.title}
                href={l.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-border/60 bg-card p-8 text-center hover:border-primary/30 transition"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{l.title}</h3>
                <p className="text-muted-foreground text-sm">{l.address}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / footer */}
      <footer className="py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Înscrie-te acum la Body Tone EMS
          </h2>
          <p className="text-muted-foreground mb-8">
            Unde sănătatea, frumusețea și fitnessul se întâlnesc.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="tel:+40749577746"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 font-semibold text-primary-foreground hover:opacity-90 transition"
            >
              <Phone className="w-4 h-4" /> +40 749 577 746
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md border border-border px-8 py-4 font-semibold hover:border-primary/50 transition"
            >
              Vezi oferta actuală
            </Link>
          </div>
          <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition">Acasă</Link>
            <a href="#preturi" className="hover:text-primary transition">Prețuri</a>
            <Link to="/termeni-si-conditii" className="hover:text-primary transition">
              Termeni și condiții
            </Link>
            <a
              href="https://anpc.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              ANPC
            </a>
          </div>
          <p className="text-muted-foreground text-xs">
            Copyright © bodytoneems.ro. Toate drepturile rezervate.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Prezentare;
