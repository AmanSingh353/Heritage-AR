import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { FeaturedSites } from "@/components/site/FeaturedSites";
import { HeritageMap } from "@/components/site/HeritageMap";
import { MonumentExplorer } from "@/components/site/MonumentExplorer";
import { Timeline } from "@/components/site/Timeline";
import { ARExperience } from "@/components/site/ARExperience";
import { VirtualMuseum } from "@/components/site/VirtualMuseum";
import { Assistant } from "@/components/site/Assistant";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HeritageAR — Reliving History Through Augmented Reality" },
      { name: "description", content: "Explore Odisha's iconic monuments through immersive AR, 3D models, an interactive heritage map and a virtual museum." },
      { property: "og:title", content: "HeritageAR — Reliving History Through Augmented Reality" },
      { property: "og:description", content: "An immersive cultural heritage exploration platform for Odisha's historical monuments." },
    ],
  }),
  component: Index,
});

function Index() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="relative min-h-screen">
      <Navbar theme={theme} toggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />
      <main>
        <Hero />
        <FeaturedSites />
        <HeritageMap />
        <MonumentExplorer />
        <Timeline />
        <ARExperience />
        <VirtualMuseum />
        <Assistant />
      </main>
      <Footer />
    </div>
  );
}
