import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border/60 px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl btn-gold">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-display text-lg font-bold tracking-wider">
                Heritage<span className="text-gold">AR</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              An immersive cultural heritage exploration platform dedicated to the monuments of Odisha and beyond.
            </p>
          </div>

          <FooterCol title="Explore" items={["Monuments", "Heritage Map", "Timeline", "Museum"]} />
          <FooterCol title="Experience" items={["AR Explorer", "3D Models", "AI Assistant", "Stories"]} />
          <FooterCol title="About" items={["Mission", "Partners", "Press", "Contact"]} />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} HeritageAR. In collaboration with the ASI & State Museums.</p>
          <p>Crafted with reverence for Odisha's heritage.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.25em] text-primary">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i}><a href="#" className="hover:text-primary">{i}</a></li>
        ))}
      </ul>
    </div>
  );
}
