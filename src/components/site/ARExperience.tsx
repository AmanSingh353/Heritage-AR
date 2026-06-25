import { motion } from "framer-motion";
import { Camera, Sparkles, ScanLine, Wifi, Battery } from "lucide-react";
import konark from "@/assets/konark.jpg";
import { AR_APP_FILENAME, AR_APP_URL } from "@/lib/ar-app";
import { SectionHeader } from "./FeaturedSites";

export function ARExperience() {
  return (
    <section id="ar" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          kicker="AR Experience"
          title={<>Point. Scan. <span className="text-gold italic">Step inside.</span></>}
          subtitle="HeritageAR rebuilds vanished façades over your camera feed — in real time, on any modern phone."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto"
          >
            <div className="relative h-[600px] w-[300px] rounded-[3rem] border-4 border-border/80 bg-navy p-3 shadow-2xl gold-glow">
              {/* Notch */}
              <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-navy" />
              {/* Screen */}
              <div className="relative h-full w-full overflow-hidden rounded-[2.4rem]">
                <img src={konark} alt="AR view" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-transparent to-navy/60" />

                {/* Status bar */}
                <div className="absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-3 text-[10px] text-ivory">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="h-3 w-3" />
                    <Battery className="h-3 w-3" />
                  </div>
                </div>

                {/* Scan bracket */}
                <div className="absolute inset-12 top-20 bottom-32 overflow-hidden rounded-2xl border border-primary/60">
                  <div className="absolute -inset-px overflow-hidden">
                    <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-primary/60 to-transparent animate-scan-line" />
                  </div>
                  {/* corners */}
                  {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((p) => (
                    <span key={p} className={`absolute h-5 w-5 border-primary ${p} ${
                      p.includes("top-0 left-0") ? "border-t-2 border-l-2" :
                      p.includes("top-0 right-0") ? "border-t-2 border-r-2" :
                      p.includes("bottom-0 left-0") ? "border-b-2 border-l-2" : "border-b-2 border-r-2"
                    }`} />
                  ))}
                </div>

                {/* Floating data chips */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="glass-strong absolute left-4 top-32 rounded-xl px-3 py-2 text-[10px]"
                >
                  <p className="text-[9px] uppercase tracking-widest text-primary">Detected</p>
                  <p className="text-ivory">Konark Sun Temple</p>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.6, repeat: Infinity }}
                  className="glass-strong absolute right-4 top-48 rounded-xl px-3 py-2 text-[10px]"
                >
                  <p className="text-[9px] uppercase tracking-widest text-primary">Era</p>
                  <p className="text-ivory">1250 CE</p>
                </motion.div>

                {/* Bottom AR controls */}
                <div className="absolute inset-x-4 bottom-6">
                  <div className="glass-strong flex items-center justify-between rounded-2xl px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                      <span className="text-[10px] uppercase tracking-widest text-ivory">AR Active</span>
                    </div>
                    <button className="grid h-10 w-10 place-items-center rounded-full btn-gold">
                      <Camera className="h-4 w-4" />
                    </button>
                    <span className="text-[10px] text-muted-foreground">95%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side */}
          <div className="space-y-5">
            {[
              { icon: ScanLine, title: "Real-time monument detection", desc: "On-device ML identifies temples and overlays historical reconstructions in milliseconds." },
              { icon: Sparkles, title: "Holographic overlays", desc: "See the original paint, missing spires, and lost sculptures rebuilt over live camera." },
              { icon: Camera, title: "Capture & share", desc: "Record cinematic AR walkthroughs and share them as heritage stories." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass flex gap-4 rounded-2xl p-5"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl btn-gold">
                  <f.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-display text-lg text-ivory">{f.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
            <a
              href={AR_APP_URL}
              download={AR_APP_FILENAME}
              className="btn-gold btn-gold-hover inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm"
            >
              <Sparkles className="h-4 w-4" /> Launch AR Experience
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}