import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ratnagiri from "@/assets/ratnagiri.jpg";
import rajarani from "@/assets/rajarani.jpg";
import mukteswara from "@/assets/mukteswara.jpg";
import jagannath from "@/assets/jagannath.jpg";
import konark from "@/assets/konark.jpg";
import udayagiri from "@/assets/udayagiri.jpg";

const sites = [
  { name: "Ratnagiri", era: "5th century CE", img: ratnagiri, desc: "A Buddhist monastery complex of stupas and viharas hidden in the green Assia hills." },
  { name: "Rajarani Temple", era: "11th century CE", img: rajarani, desc: "Sculpted from richly-coloured Khondalite sandstone — a temple without a deity." },
  { name: "Mukteswara Temple", era: "10th century CE", img: mukteswara, desc: "The gem of Odisha architecture, famed for its ornate torana arch." },
  { name: "Jagannath Temple", era: "12th century CE", img: jagannath, desc: "One of the Char Dham — a living temple of devotion in Puri." },
  { name: "Konark Sun Temple", era: "13th century CE", img: konark, desc: "A monumental chariot for the sun god, a UNESCO World Heritage Site." },
  { name: "Udayagiri & Khandagiri", era: "2nd century BCE", img: udayagiri, desc: "Rock-cut Jain caves carved into twin hills overlooking Bhubaneswar." },
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
                  <a href="#map" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Explore Details
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
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