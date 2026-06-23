import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";

type Msg = { role: "user" | "ai"; text: string };

const suggestions = [
  "Tell me about Konark Sun Temple",
  "What is Kalinga architecture?",
  "How were the caves of Udayagiri built?",
  "Plan a 2-day heritage trip in Odisha",
];

const seed: Msg[] = [
  { role: "ai", text: "Namaste! I'm your Heritage Assistant. Ask me anything about Odisha's monuments, eras, or architecture." },
];

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");

  function send(text: string) {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          role: "ai",
          text:
            "Great question. In a live deployment, I'd consult curated heritage knowledge — but here's a preview: " +
            text.split(" ").slice(0, 6).join(" ") +
            "… is a fascinating thread of Odisha's history I can guide you through.",
        },
      ]);
    }, 700);
  }

  return (
    <>
      <section id="assistant" className="relative px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.78_0.13_85/0.15),transparent_60%)]" />
            <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-primary">— AI Heritage Assistant</p>
                <h2 className="mt-4 font-display text-3xl font-bold text-ivory sm:text-5xl">
                  Your personal <span className="text-gold italic">curator</span>,
                  always nearby.
                </h2>
                <p className="mt-4 max-w-xl text-muted-foreground">
                  Ask about Kalinga architecture, plan a heritage trail, or decode a sculpture's iconography — instantly.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setOpen(true); send(s); }}
                      className="glass rounded-full px-3 py-1.5 text-xs text-muted-foreground transition hover:text-primary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setOpen(true)}
                className="btn-gold btn-gold-hover inline-flex items-center gap-2 self-start rounded-xl px-6 py-3.5 text-sm md:self-end"
              >
                <Sparkles className="h-4 w-4" /> Open Assistant
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Floating bubble */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open assistant"
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full btn-gold gold-glow transition hover:scale-110"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass-strong fixed bottom-24 right-4 z-40 flex h-[520px] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl btn-gold">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ivory">Heritage Assistant</p>
                <p className="text-[10px] uppercase tracking-widest text-primary">Online</p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${
                      m.role === "user"
                        ? "btn-gold rounded-br-sm"
                        : "glass rounded-bl-sm text-ivory"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 border-t border-border/60 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a monument…"
                className="flex-1 rounded-xl border border-border/60 bg-background/60 px-3 py-2 text-sm text-ivory placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl btn-gold"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
