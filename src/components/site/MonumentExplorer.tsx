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
  { id: "jag", name: "Jagannath Temple", shape: "temple", style: "Kalinga Architecture", height: "65 m", year: "1161 CE", material: "Sandstone & Granite" },
  { id: "raj", name: "Rajarani Temple", shape: "tower", style: "Pancha-ratha Nagara", height: "18 m", year: "11th century", material: "Khondalite" },
  { id: "wheel", name: "Konark Wheel", shape: "wheel", style: "Solar Iconography", height: "3 m", year: "1250 CE", material: "Chlorite & Khondalite" },
  { id: "dhauli", name: "Dhauli Hill", shape: "stupa", style: "Buddhist Shanti Stupa", height: "15 m", year: "3rd century BCE", material: "Marble & Laterite" },
];

function TempleMesh() {
  return (
    <group>
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[2.6, 0.3, 2.6]} />
        <meshStandardMaterial color="#8a6a3a" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[2, 1.1, 2]} />
        <meshStandardMaterial color="#a07a44" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[1.2, 1.8, 8]} />
        <meshStandardMaterial color="#c89a5a" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} emissive="#d4af37" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function RajaraniModel() {
  const { scene } = useGLTF("/models/rajarani.glb");
  return (
    <Center>
      <primitive object={scene} scale={1.5} />
    </Center>
  );
}

useGLTF.preload("/models/rajarani.glb");

function WheelMesh() {
  return (
    <group rotation={[0.4, 0, 0]}>
      <mesh>
        <torusGeometry args={[1.3, 0.12, 16, 64]} />
        <meshStandardMaterial color="#c9a14a" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.95, 0.08, 16, 64]} />
        <meshStandardMaterial color="#b58a3a" metalness={0.6} roughness={0.4} />
      </mesh>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 4]}>
          <boxGeometry args={[2.6, 0.08, 0.08]} />
          <meshStandardMaterial color="#a47830" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} emissive="#d4af37" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

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
  if (shape === "temple") return <TempleMesh />;
  if (shape === "wheel") return <WheelMesh />;
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