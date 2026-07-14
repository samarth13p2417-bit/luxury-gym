"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function BMICalculator() {
  const [height, setHeight] = useState(175); // cm
  const [weight, setWeight] = useState(70); // kg
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const bmi = useMemo(() => {
    const heightInMeters = height / 100;
    if (heightInMeters === 0) return 0;
    return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
  }, [height, weight]);

  const bmiInfo = useMemo(() => {
    if (bmi < 18.5) return { status: "Underweight", color: "#FFD54F", pct: 20 };
    if (bmi >= 18.5 && bmi < 25) return { status: "Optimal / Healthy", color: "#00E676", pct: 50 };
    if (bmi >= 25 && bmi < 30) return { status: "Overweight", color: "#FF6B00", pct: 75 };
    return { status: "Clinically Obese", color: "#E53935", pct: 95 };
  }, [bmi]);

  // SVG Gauge calculations
  // Circle radius r = 70, Circumference C = 2 * PI * r = 439.8
  const strokeCircumference = 439.8;
  const strokeOffset = useMemo(() => {
    // Map BMI range (15 to 35) to 0-100 percentage
    const minBmi = 15;
    const maxBmi = 35;
    const pct = Math.max(0, Math.min(100, ((bmi - minBmi) / (maxBmi - minBmi)) * 100));
    return strokeCircumference - (pct / 100) * strokeCircumference;
  }, [bmi]);

  return (
    <section
      id="bmi"
      ref={containerRef}
      className="relative min-h-screen bg-background py-24 md:py-32 px-6 md:px-16 lg:px-24 flex items-center overflow-hidden border-b border-border-custom"
    >
      {/* Decorative grids */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: UI Controls & Sliders */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.5 } : {}}
              className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-accent-green uppercase mb-4"
            >
              Diagnostic Tools
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-fluid-section uppercase text-white font-extrabold tracking-tight mb-8"
            >
              Bio-Metric <span className="text-stroke-white">Calculator</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 0.8, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-secondary-text text-xs md:text-sm leading-relaxed mb-12 font-light max-w-xl"
            >
              Adjust sliders in real-time to compute Body Mass Index (BMI). We integrate these diagnostics into our smart tracking systems to set baseline load guidelines.
            </motion.p>

            {/* Sliders Panels */}
            <div className="space-y-8 max-w-xl">
              {/* Height Slider */}
              <div className="glass-panel p-6 rounded-2xl border border-white/5 relative">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-xs uppercase tracking-wider text-secondary-text font-bold">
                    Height
                  </span>
                  <div className="flex items-baseline font-display">
                    <span className="text-3xl font-black text-white">{height}</span>
                    <span className="text-xs text-accent-green font-bold ml-1">cm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-green outline-none"
                  data-cursor="hover"
                />
              </div>

              {/* Weight Slider */}
              <div className="glass-panel p-6 rounded-2xl border border-white/5 relative">
                <div className="flex justify-between items-baseline mb-4">
                  <span className="text-xs uppercase tracking-wider text-secondary-text font-bold">
                    Weight
                  </span>
                  <div className="flex items-baseline font-display">
                    <span className="text-3xl font-black text-white">{weight}</span>
                    <span className="text-xs text-accent-green font-bold ml-1">kg</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="40"
                  max="150"
                  value={weight}
                  onChange={(e) => setWeight(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-green outline-none"
                  data-cursor="hover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Visual Gauge Ring */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-[300px] h-[300px] md:w-[320px] md:h-[320px] rounded-full glass-panel flex items-center justify-center border border-white/5 shadow-2xl shadow-black/80"
            >
              {/* SVG Ring Container */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                {/* Background Ring Track */}
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="transparent"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="8"
                />

                {/* Animated colored progress circle */}
                <motion.circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="transparent"
                  stroke={bmiInfo.color}
                  strokeWidth="8"
                  strokeDasharray={strokeCircumference}
                  animate={{ strokeDashoffset: strokeOffset }}
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                  strokeLinecap="round"
                  style={{
                    filter: `drop-shadow(0 0 8px ${bmiInfo.color}55)`,
                  }}
                />
              </svg>

              {/* Central Details Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary-text mb-1">
                  BMI Score
                </span>
                
                <span className="text-5xl md:text-6xl font-display font-black text-white tracking-tighter leading-none mb-3">
                  {bmi}
                </span>

                {/* Diagnostic Category Pill */}
                <motion.div
                  key={bmiInfo.status}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest font-sans shadow-md"
                  style={{
                    backgroundColor: `${bmiInfo.color}15`,
                    color: bmiInfo.color,
                    border: `1px solid ${bmiInfo.color}35`,
                  }}
                >
                  {bmiInfo.status}
                </motion.div>
              </div>
            </motion.div>

            {/* Scale legend labels under the gauge */}
            <div className="flex gap-4 mt-8 text-[9px] uppercase tracking-widest font-mono text-secondary-text opacity-70">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#FFD54F]" /> &lt;18.5</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#00E676]" /> 18.5-25</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" /> 25-30</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#E53935]" /> 30+</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
