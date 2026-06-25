import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment, useGLTF, Center } from "@react-three/drei";
import { motion } from "framer-motion";
import { SectionHeader } from "./FeaturedSites";

type Model = {
  id: string;
  name: string;
  shape: "temple" | "wheel" | "tower" | "stupa";
  style: string;
  height: string;
  year: string;
  material: string;
};

const models: Model[] = [
  { id: "ranipur", name: "Ranipur Jharial", shape: "temple", style: "Chausath Yogini Temple", height: "5 m", year: "8th century CE", material: "Sandstone" },
  { id: "raj", name: "Rajarani Temple", shape: "tower", style: "Pancha-ratha Nagara", height: "18 m", year: "11th century", material: "Khondalite" },
  { id: "kon", name: "Konark Sun Temple", shape: "wheel", style: "Kalinga Chariot Temple", height: "30 m", year: "13th century CE", material: "Khondalite & Laterite" },
  { id: "dhauli", name: "Dhauli Hill", shape: "stupa", style: "Buddhist Shanti Stupa", height: "15 m", year: "3rd century BCE", material: "Marble & Laterite" },
];

function RanipurJharialModel() {
  const { scene } = useGLTF("/models/ranipur-jharial.glb");
  return (
    <Center>
      <primitive object={scene} scale={1.5} />
    </Center>
  );
}

useGLTF.preload("/models/ranipur-jharial.glb");

function RajaraniModel() {
  const { scene } = useGLTF("/models/rajarani.glb");
  return (
    <Center>
      <primitive object={scene} scale={1.5} />
    </Center>
  );
}

useGLTF.preload("/models/rajarani.glb");

function KonarkSunTempleModel() {
  const { scene } = useGLTF("/models/konark-sun-temple.glb");
  return (
    <Center>
      <primitive object={scene} scale={1.5} />
    </Center>
  );
}

useGLTF.preload("/models/konark-sun-temple.glb");

function DhauliHillModel() {
  const { scene } = useGLTF("/models/dhaulihill.glb");
  return (
    <Center>
      <primitive object={scene} scale={1.5} />
    </Center>
  );
}

useGLTF.preload("/models/dhaulihill.glb");

function ModelByShape({ shape }: { shape: Model["shape"] }) {
  if (shape === "temple") return <RanipurJharialModel />;
  if (shape === "wheel") return <KonarkSunTempleModel />;
  if (shape === "tower") return <RajaraniModel />;
  return <DhauliHillModel />;
}

export function MonumentExplorer() {
  const [active, setActive] = useState<Model>(models[2]);

  return (
    <section id="explorer" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          kicker="3D Monument Explorer"
          title={<>Touch the past in <span className="text-gold italic">three dimensions</span></>}
          subtitle="Rotate, zoom and inspect digital twins of Odisha's most iconic structures."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="glass relative h-[520px] overflow-hidden rounded-3xl">
            <Canvas camera={{ position: [4, 2.5, 4], fov: 45 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 8, 5]} intensity={1.2} color="#fff5da" />
                <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#d4af37" />
                <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
                  <ModelByShape shape={active.shape} />
                </Float>
                <Environment preset="sunset" />
                <OrbitControls enablePan={false} enableZoom autoRotate autoRotateSpeed={0.6} />
              </Suspense>
            </Canvas>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between px-6 py-4 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="glass rounded-full px-3 py-1">Drag to rotate · Scroll to zoom</span>
              <span className="glass rounded-full px-3 py-1 text-primary">{active.name}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-strong rounded-2xl p-6"
            >
              <h3 className="font-display text-2xl text-ivory">{active.name}</h3>
              <dl className="mt-5 space-y-3 text-sm">
                <Row k="Architecture" v={active.style} />
                <Row k="Height" v={active.height} />
                <Row k="Construction" v={active.year} />
                <Row k="Material" v={active.material} />
              </dl>
            </motion.div>

            <div className="glass grid grid-cols-2 gap-2 rounded-2xl p-3">
              {models.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActive(m)}
                  className={`rounded-xl p-3 text-left text-xs transition ${
                    active.id === m.id
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "border border-transparent text-muted-foreground hover:bg-white/5"
                  }`}
                >
                  <p className="font-display text-sm text-ivory">{m.name}</p>
                  <p className="mt-0.5">{m.year}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/40 pb-2 last:border-0">
      <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">{k}</dt>
      <dd className="text-right text-ivory">{v}</dd>
    </div>
  );
}