import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./FeaturedSites";

const milestones = [
  { year: "3rd c. BCE", title: "Ashokan Pillars", desc: "Emperor Ashoka inscribes edicts of dharma on stone pillars across the subcontinent." },
  { year: "2nd c. BCE", title: "Ajanta Foundations", desc: "First Buddhist cave-temples carved into the Waghora gorge cliffs." },
  { year: "1250 CE", title: "Konark Construction", desc: "King Narasimhadeva I completes the monumental Sun Temple at Konark." },
  { year: "1861", title: "ASI Foundation", desc: "The Archaeological Survey of India is founded to protect the subcontinent's monuments." },
  { year: "2025", title: "HeritageAR Launch", desc: "An immersive AR platform reopens Odisha's monuments to the world — digitally." },
];

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progress = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="timeline" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          kicker="A Continuum"
          title={<>Two thousand years on <span className="text-gold italic">one line</span></>}
          subtitle="From Ashokan dharma to the launch of HeritageAR — scroll through the milestones."
        />

        <div ref={ref} className="relative mt-16">
          {/* Horizontal scroll on desktop, vertical on mobile */}
          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-border/60 md:block">
              <motion.div style={{ width: progress }} className="h-full bg-gradient-to-r from-primary via-primary to-transparent gold-glow" />
            </div>

            <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 py-8 md:gap-8">
              {milestones.map((m, idx) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="snap-center"
                >
                  <div className="glass relative w-[280px] rounded-2xl p-6 sm:w-[320px]">
                    <div className="absolute -top-3 left-6 rounded-full btn-gold px-3 py-1 text-[11px] uppercase tracking-widest">
                      {m.year}
                    </div>
                    <h3 className="mt-3 font-display text-xl text-ivory">{m.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                    <div className="mt-5 hidden h-3 w-3 rounded-full bg-primary gold-glow md:block" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}