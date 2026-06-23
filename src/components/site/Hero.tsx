import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import konark from "@/assets/konark.jpg";
import jagannath from "@/assets/jagannath.jpg";
import mukteswara from "@/assets/mukteswara.jpg";
import ratnagiri from "@/assets/ratnagiri.jpg";
import rajarani from "@/assets/rajarani.jpg";
import ajanta from "@/assets/ajanta.jpg";

const slides = [
  { img: jagannath, name: "Jagannath Temple" },
  { img: mukteswara, name: "Mukteswara Temple" },
  { img: ratnagiri, name: "Ratnagiri" },
  { img: rajarani, name: "Rajarani Temple" },
  { img: konark, name: "Konark Sun Temple" },
  { img: ajanta, name: "Ajanta Caves" },
];

export function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background carousel */}
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[i].img}
            alt={slides[i].name}
            className="h-full w-full object-cover animate-ken-burns"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/60 to-navy" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.10_0.03_265/0.85)_100%)]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-primary"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-marker" />
          Cultural Heritage of Odisha
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display text-4xl font-bold leading-[1.05] text-ivory sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          Reliving History
          <br />
          Through <span className="text-gold italic">Augmented Reality</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          Step inside Odisha's ancient temples, caves, and monasteries. An immersive
          museum-grade journey across centuries — guided by AR, 3D and AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#monuments"
            className="btn-gold btn-gold-hover inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm sm:text-base"
          >
            Explore Heritage <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#ar"
            className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm text-ivory transition hover:border-primary/60 sm:text-base"
          >
            <Play className="h-4 w-4 text-primary" /> View AR Experience
          </a>
        </motion.div>

        {/* Dots */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.name}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-8 bg-primary" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Current slide name */}
      <div className="absolute bottom-10 right-6 hidden text-right md:block">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Featuring</p>
        <p className="font-display text-lg text-ivory">{slides[i].name}</p>
      </div>
    </section>
  );
}