import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Eye, Sparkles } from "lucide-react";
import { SectionHeader } from "./FeaturedSites";
import odishaMapImage from "../../assets/Odisha_Map.svg";

type Site = {
  id: string;
  name: string;
  location: string;
  era: string;
  coords: string;
  description: string;
  x: number; // % within map
  y: number;
};

const sites: Site[] = [
  {
    id: "muk",
    name: "Mukteswara Temple",
    location: "Bhubaneswar",
    era: "10th century CE",
    coords: "20.2376° N, 85.8362° E",
    description:
      "The 'gem of Odisha architecture' — a 10th-century Shiva temple famous for its sculpted torana.",
    x: 42,
    y: 58,
  },
  {
    id: "kon",
    name: "Konark Sun Temple",
    location: "Konark",
    era: "13th century CE",
    coords: "19.8876° N, 86.0945° E",
    description: "UNESCO-listed chariot of the Sun, carved from khondalite and laterite stone.",
    x: 56,
    y: 64,
  },
  {
    id: "jag",
    name: "Jagannath Temple",
    location: "Puri",
    era: "12th century CE",
    coords: "19.8048° N, 85.8175° E",
    description: "A living temple to Lord Jagannath and one of the four sacred Char Dham sites.",
    x: 50,
    y: 72,
  },
  {
    id: "uda",
    name: "Udayagiri & Khandagiri",
    location: "Bhubaneswar",
    era: "2nd century BCE",
    coords: "20.2625° N, 85.7847° E",
    description: "Twin hills with rock-cut Jain caves from the reign of King Kharavela.",
    x: 40,
    y: 56,
  },
  {
    id: "rat",
    name: "Ratnagiri",
    location: "Jajpur",
    era: "5th–12th century CE",
    coords: "20.6500° N, 86.3333° E",
    description: "A vast Buddhist monastic complex of stupas, viharas and exquisite sculptures.",
    x: 64,
    y: 36,
  },
];

export function HeritageMap() {
  const [active, setActive] = useState<Site>(sites[1]);

  return (
    <section id="map" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          kicker="Interactive Heritage Map"
          title={
            <>
              Trace Odisha's <span className="text-gold italic">sacred geography</span>
            </>
          }
          subtitle="Glowing markers locate every monument across the state. Tap one to open its dossier."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Map */}
          <div className="glass relative aspect-[4/3] overflow-hidden rounded-3xl p-4 sm:p-6">
            <img src={odishaMapImage} alt="Map of Odisha" className="h-full w-full object-cover opacity-60 mix-blend-luminosity" />

            {sites.map((s) => {
              const isActive = active.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s)}
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  aria-label={s.name}
                >
                  <span className="relative flex items-center justify-center">
                    <span
                      className={`absolute h-8 w-8 rounded-full bg-primary/40 ${isActive ? "animate-pulse-marker" : "opacity-50"}`}
                    />
                    <span
                      className={`relative grid h-7 w-7 place-items-center rounded-full border-2 transition-all ${
                        isActive
                          ? "border-primary bg-primary text-primary-foreground gold-glow scale-110"
                          : "border-primary/70 bg-navy text-primary"
                      }`}
                    >
                      <MapPin className="h-3.5 w-3.5" />
                    </span>
                  </span>
                  <span
                    className={`mt-1 block whitespace-nowrap text-[10px] uppercase tracking-widest transition ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {s.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-strong relative flex flex-col rounded-3xl p-7"
            >
              <span className="text-xs uppercase tracking-[0.3em] text-primary">Site Dossier</span>
              <h3 className="mt-3 font-display text-3xl font-semibold text-ivory">{active.name}</h3>
              <div className="mt-5 grid grid-cols-2 gap-4 border-y border-border/60 py-5 text-sm">
                <Info label="Location" value={active.location} />
                <Info label="Era" value={active.era} />
                <Info label="Coordinates" value={active.coords} />
                <Info label="Status" value="UNESCO / ASI" />
              </div>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
                {active.description}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#explorer"
                  className="btn-gold btn-gold-hover inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm"
                >
                  <Eye className="h-4 w-4" /> View in 3D
                </a>
                <a
                  href="#ar"
                  className="glass inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm text-ivory"
                >
                  <Sparkles className="h-4 w-4 text-primary" /> Launch AR
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 truncate text-ivory">{value}</p>
    </div>
  );
}
