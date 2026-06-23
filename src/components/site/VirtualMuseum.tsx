import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import a1 from "@/assets/artifact1.jpg";
import a2 from "@/assets/artifact2.jpg";
import a3 from "@/assets/artifact3.jpg";
import a4 from "@/assets/artifact4.jpg";
import { SectionHeader } from "./FeaturedSites";

const artifacts = [
  { img: a1, name: "Bronze Devi Figurine", era: "9th century CE", origin: "Ratnagiri monastery", desc: "A small votive bronze of a tantric goddess, cast in the lost-wax method." },
  { img: a2, name: "Terracotta Storage Jar", era: "2nd century BCE", origin: "Sisupalgarh excavation", desc: "Wheel-thrown earthenware with an incised wave motif, used in royal granaries." },
  { img: a3, name: "Sandstone Buddha Head", era: "6th century CE", origin: "Lalitgiri stupa", desc: "Serene fragment from a colossal seated Buddha, carved in fine khondalite." },
  { img: a4, name: "Palm-Leaf Manuscript", era: "16th century CE", origin: "Puri scriptorium", desc: "A leaf of the Geeta Govinda inscribed in Oriya script with iron stylus." },
];

export function VirtualMuseum() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="museum" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          kicker="Virtual Museum"
          title={<>A gallery for the <span className="text-gold italic">handheld</span></>}
          subtitle="Artefacts photographed in collaboration with state museums and the ASI archives."
        />

        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {artifacts.map((a, idx) => (
            <motion.button
              key={a.name}
              onClick={() => setOpen(idx)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="group glass overflow-hidden rounded-2xl text-left"
            >
              <div className="relative aspect-square overflow-hidden">
                <img src={a.img} alt={a.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                <span className="absolute left-3 top-3 glass rounded-full px-2.5 py-0.5 text-[9px] uppercase tracking-widest text-primary">
                  {a.era}
                </span>
              </div>
              <div className="p-4">
                <p className="font-display text-sm text-ivory">{a.name}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{a.origin}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-50 grid place-items-center bg-navy/80 p-4 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative grid w-full max-w-4xl gap-0 overflow-hidden rounded-3xl sm:grid-cols-2"
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full glass text-ivory"
              >
                <X className="h-4 w-4" />
              </button>
              <img src={artifacts[open].img} alt="" className="h-72 w-full object-cover sm:h-full" />
              <div className="p-8">
                <span className="text-[11px] uppercase tracking-[0.3em] text-primary">{artifacts[open].era}</span>
                <h3 className="mt-3 font-display text-3xl text-ivory">{artifacts[open].name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{artifacts[open].origin}</p>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{artifacts[open].desc}</p>
                <button className="btn-gold btn-gold-hover mt-7 inline-flex items-center rounded-lg px-5 py-2.5 text-sm">
                  Inspect in 3D
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}