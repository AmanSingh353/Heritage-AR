import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Monuments", href: "#monuments" },
  { label: "Heritage Map", href: "#map" },
  { label: "AR Explorer", href: "#ar" },
  { label: "Timeline", href: "#timeline" },
  { label: "Virtual Museum", href: "#museum" },
  { label: "AI Assistant", href: "#assistant" },
];

export function Navbar({ theme, toggleTheme }: { theme: "dark" | "light"; toggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`glass flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6 ${
            scrolled ? "gold-glow" : ""
          }`}
        >
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <div className="grid h-9 w-9 place-items-center rounded-xl btn-gold">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display text-lg font-bold tracking-wider">
              Heritage<span className="text-gold">AR</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="hidden h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition hover:text-primary sm:flex"
            >
              {theme === "dark" ? "☾" : "☀"}
            </button>
            <a
              href="#ar"
              className="hidden btn-gold btn-gold-hover rounded-lg px-4 py-2 text-sm md:inline-block"
            >
              Launch AR
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border/60 lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass mt-2 flex flex-col gap-1 rounded-2xl p-3 lg:hidden"
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-white/5 hover:text-primary"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#ar"
                onClick={() => setOpen(false)}
                className="btn-gold mt-2 rounded-lg px-4 py-2.5 text-center text-sm"
              >
                Launch AR
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}