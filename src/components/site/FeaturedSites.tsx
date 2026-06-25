import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import dhauliHill from "@/assets/Dhauli_Hill.png";
import rajarani from "@/assets/rajarani.jpg";
import mukteswara from "@/assets/mukteswara.jpg";
import jagannath from "@/assets/jagannath.jpg";
import konark from "@/assets/konark.jpg";
import ranipurJharial from "@/assets/Ranipur_Jharial.png";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


const sites = [
  { name: "Dhauli Hill", era: "3rd century BCE", img: dhauliHill, desc: "A beautiful white Buddhist stupa build by Japanese Buddhist organization as a symbol of peace", location: "Khordha District, Odisha, India", origin: "3rd Century BCE", builtBy: "Emperor Ashoka (Maurya Empire)", fullDesc: "Dhauli Hills is a historic site associated with the Kalinga War fought in the 3rd century BCE. It is believed to be the place where Emperor Ashoka embraced Buddhism after witnessing the devastation of the war. The site features Ashokan Rock Edicts and the iconic Shanti Stupa, symbolizing peace, compassion, and India's rich Buddhist heritage." },
  { name: "Rajarani Temple", era: "11th century CE", img: rajarani, desc: "Sculpted from richly-coloured Khondalite sandstone — a temple without a deity.", location: "Bhubaneswar, Khordha District, Odisha, India", origin: "11th Century CE", builtBy: "Somavamsi Dynasty", fullDesc: "Rajarani Temple is an elegant 11th-century temple renowned for its exquisite red and yellow sandstone, locally known as 'Rajarani' stone. A masterpiece of Kalinga architecture, it is admired for its intricate carvings of celestial figures, musicians, and graceful sculptures. Although it contains no presiding deity, the temple remains one of Odisha's finest architectural landmarks." },
  { name: "Mukteswara Temple", era: "10th century CE", img: mukteswara, desc: "The gem of Odisha architecture, famed for its ornate torana arch.", location: "Bhubaneswar, Khordha District, Odisha, India", origin: "10th Century CE", builtBy: "Somavamsi Dynasty", fullDesc: "Mukteswara Temple is a celebrated 10th-century Shiva temple and is often called the 'Gem of Odisha Architecture'. Renowned for its beautifully carved stone archway, intricate sculptures, and detailed lattice windows, the temple marks a significant milestone in the evolution of Kalinga architecture. Its elegant craftsmanship and spiritual significance make it one of Bhubaneswar's most treasured heritage monuments." },
  { name: "Jagannath Temple", era: "12th century CE", img: jagannath, desc: "One of the Char Dham — a living temple of devotion in Puri.", location: "Enter location...", origin: "Enter origin...", builtBy: "Enter builder...", fullDesc: "This text only appears in the dialog. Replace me with full details!" },
  { name: "Konark Sun Temple", era: "13th century CE", img: konark, desc: "A monumental chariot for the sun god, a UNESCO World Heritage Site.", location: "Enter location...", origin: "Enter origin...", builtBy: "Enter builder...", fullDesc: "This text only appears in the dialog. Replace me with full details!" },
  { name: "Ranipur Jharial", era: "8th century CE", img: ranipurJharial, desc: "An open-air circular temple dedicated to the 64 Yoginis (8th–9th century CE). ", location: "Balangir District, Odisha, India.", origin: "8th–9th Century CE", builtBy: "Somavamsi Rulers", fullDesc: "Ranipur Jharial is an ancient temple complex dating back to the 8th–9th century CE. Known as the 'Som Tirtha' of Western Odisha, it is home to over 50 temples and shrines. The site is best known for the rare Chausath Yogini Temple and the Somesvara Temple, which showcase early Kalinga architecture, intricate stone carvings, and the region's rich spiritual, cultural, and artistic heritage." },
];

export function FeaturedSites() {
  return (
    <section id="monuments" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          kicker="Featured Heritage Sites"
          title={<>Six monuments. <span className="text-gold italic">Centuries</span> of memory.</>}
          subtitle="Hand-curated, museum-grade entries with 3D models, AR overlays, and a built-in heritage guide."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((s, idx) => (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="group glass relative overflow-hidden rounded-2xl"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                <span className="absolute left-4 top-4 glass rounded-full px-3 py-1 text-[11px] uppercase tracking-widest text-primary">
                  {s.era}
                </span>
              </div>
              <div className="relative p-6">
                <h3 className="font-display text-2xl font-semibold text-ivory">{s.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground transition-all duration-500 group-hover:line-clamp-none">
                  {s.desc}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="inline-flex items-center gap-1.5 text-sm font-medium text-primary cursor-pointer outline-none">
                        Explore Details
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-5xl w-[90vw] sm:w-[70vw] glass-strong p-0 overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Image Section */}
                        <div className="relative h-64 md:h-full min-h-[300px]">
                          <img src={s.img} alt={s.name} className="absolute inset-0 w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-navy" />
                        </div>
                        
                        {/* Content Section */}
                        <div className="p-6 sm:p-8 flex flex-col h-full bg-navy/40">
                          <DialogHeader className="mb-6 text-left">
                            <DialogTitle className="font-display text-3xl text-ivory">{s.name}</DialogTitle>
                            <DialogDescription className="text-primary tracking-widest uppercase text-xs mt-2">
                              {s.era}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="grid grid-cols-2 gap-x-4 gap-y-5 mb-6">
                            <div className="space-y-1.5">
                              <span className="text-xs uppercase tracking-widest text-primary/80 font-semibold">Location</span>
                              <p className="text-sm text-ivory/90">{s.location}</p>
                            </div>
                            <div className="space-y-1.5">
                              <span className="text-xs uppercase tracking-widest text-primary/80 font-semibold">Origin</span>
                              <p className="text-sm text-ivory/90">{s.origin}</p>
                            </div>
                            <div className="space-y-1.5 col-span-2">
                              <span className="text-xs uppercase tracking-widest text-primary/80 font-semibold">Built By</span>
                              <p className="text-sm text-ivory/90">{s.builtBy}</p>
                            </div>
                          </div>

                          <div className="space-y-2 border-t border-border/40 pt-5 flex-grow">
                            <span className="text-xs uppercase tracking-widest text-primary/80 font-semibold">Description</span>
                            <p className="text-sm text-ivory/80 leading-relaxed whitespace-pre-wrap text-justify">{s.fullDesc}</p>
                          </div>

                          <div className="mt-8 flex justify-end">
                            <button className="bg-primary hover:bg-primary/90 text-navy px-6 py-2.5 rounded-md text-sm font-semibold transition-colors shadow-lg shadow-primary/20">
                              Start AR Experience
                            </button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    AR Ready
                  </span>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  kicker, title, subtitle, align = "center",
}: { kicker: string; title: React.ReactNode; subtitle?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs uppercase tracking-[0.3em] text-primary"
      >
        — {kicker}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mt-4 font-display text-3xl font-bold leading-tight text-ivory sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base text-muted-foreground sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}