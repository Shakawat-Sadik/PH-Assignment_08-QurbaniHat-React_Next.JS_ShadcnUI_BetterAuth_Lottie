"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export function HeroAurora() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(420px at ${x}px ${y}px, oklch(0.841 0.238 128.85), transparent 70%)`;

  return (
    <section onMouseMove={(e) => {
      const r = e.currentTarget.getBoundingClientRect();
      x.set(e.clientX - r.left); y.set(e.clientY - r.top);
    }} className="relative isolate overflow-hidden rounded-lg border border-primary/25 bg-primary/10 p-10 w-full h-[60vh] ">
      <div className="lf-aurora absolute inset-0 opacity-80" />
      <motion.div className="absolute inset-0" style={{ backgroundImage: spotlight }} />
      <div className="relative">
        <p className="text-xs uppercase tracking-[0.2em] text-foreground/80">Ship faster</p>
        <h1 className="mt-3 text-4xl font-semibold text-foreground">Motion-native interfaces</h1>
      </div>
    </section>
  );
}