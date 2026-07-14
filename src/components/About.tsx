"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
}

function Counter({ value, suffix, label }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16); // ~60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col border-l border-white/10 pl-6 py-4">
      <div className="flex items-baseline font-display">
        <span className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter tabular-nums">
          {count}
        </span>
        <span className="text-2xl md:text-3xl font-extrabold text-accent-green ml-0.5">
          {suffix}
        </span>
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-secondary-text mt-2 font-semibold">
        {label}
      </span>
    </div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isContainerInView = useInView(containerRef, { once: true, margin: "-150px" });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen bg-background py-24 md:py-32 px-6 md:px-16 lg:px-24 flex items-center overflow-hidden border-b border-border-custom"
    >
      {/* Decorative vertical mesh grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10%_100%] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10">
        {/* Left Column: Typography & Text Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isContainerInView ? { opacity: 0.5, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-accent-green uppercase mb-4"
          >
            Philosophy / Who We Are
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-fluid-section uppercase text-white font-extrabold tracking-tight mb-8"
          >
            We sculpt <br />
            <span className="text-stroke-white">masterworks,</span> <br />
            not routines.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-secondary-text text-sm md:text-base leading-relaxed max-w-2xl"
          >
            <p>
              KINETIX represents a tectonic shift in fitness architectural philosophy. We do not support boring grids or generic exercise regimens. Our purpose is to design custom human optimization environments that merge luxury aesthetics with scientific athletic conditioning.
            </p>
            <p className="opacity-70">
              Each square inch of our club is curated for the sensory stimulation of high-achievers. From premium custom weight-lifting equipment made of architectural metals, to recovery suites delivering active oxygen and ice hydrotherapies. This is a sanctuary of extreme physical focus.
            </p>
          </motion.div>

          {/* Stats layout */}
          <div className="grid grid-cols-3 gap-4 mt-12 border-t border-white/5 pt-8">
            <Counter value={12000} suffix="+" label="Sq Ft Club Space" />
            <Counter value={40} suffix="+" label="Elite Masters" />
            <Counter value={98} suffix="%" label="Member Retention" />
          </div>
        </div>

        {/* Right Column: Parallax Image Reveal */}
        <div className="lg:col-span-5 relative w-full flex justify-center items-center">
          {/* Animated Background ambient ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent-orange/10 rounded-full blur-[80px] -z-10" />

          {/* Interactive Image Panel */}
          <motion.div
            initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", scale: 1.15 }}
            animate={isContainerInView ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            className="relative w-full aspect-[4/5] max-w-[420px] rounded-2xl overflow-hidden group shadow-2xl shadow-black/80 border border-white/5"
            data-cursor="hover"
          >
            <Image
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000"
              alt="Premium Club Interior"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              priority
              className="object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-90 grayscale-[20%]"
            />
            {/* Dark mask overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-30" />
            
            {/* Visual content on image */}
            <div className="absolute bottom-6 left-6 z-10 right-6">
              <span className="text-[9px] uppercase tracking-widest text-accent-green font-bold">
                Elite Conditioning
              </span>
              <p className="text-white text-lg font-display uppercase font-bold mt-1 leading-tight">
                Architectural Performance Suites
              </p>
            </div>
          </motion.div>

          {/* Secondary overlapping float box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isContainerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute -bottom-6 -left-6 hidden md:block glass-panel-glow-green p-5 rounded-xl max-w-[200px]"
          >
            <p className="text-white font-display text-sm font-extrabold uppercase">
              Bio-Metrics Tracking
            </p>
            <p className="text-[10px] text-secondary-text mt-1 leading-snug">
              Every workout at Kinetix measures hormonal and cardiac output in real-time.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
