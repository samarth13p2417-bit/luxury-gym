"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function Transformation() {
  const [sliderPos, setSliderPos] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  // Statistics values
  const stats = [
    { label: "Avg Body Fat Loss", val: 14, suffix: "%" },
    { label: "Lean Muscle Gain", val: 8, suffix: "kg" },
    { label: "Active Endurance", val: 32, suffix: "%" },
  ];

  const [countVals, setCountVals] = useState([0, 0, 0]);

  useEffect(() => {
    if (!isInView) return;
    const timers = stats.map((stat, idx) => {
      let cur = 0;
      const end = stat.val;
      const timer = setInterval(() => {
        cur += 1;
        if (cur >= end) {
          setCountVals((prev) => {
            const copy = [...prev];
            copy[idx] = end;
            return copy;
          });
          clearInterval(timer);
        } else {
          setCountVals((prev) => {
            const copy = [...prev];
            copy[idx] = cur;
            return copy;
          });
        }
      }, 16 * 2);
      return timer;
    });

    return () => timers.forEach((t) => clearInterval(t));
  }, [isInView]);

  return (
    <section
      id="transformations"
      ref={containerRef}
      className="relative min-h-screen bg-background py-24 md:py-32 px-6 md:px-16 lg:px-24 flex items-center overflow-hidden border-b border-border-custom"
    >
      {/* Mesh lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:10%_100%] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text description and stats */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.5 } : {}}
              className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-accent-green uppercase mb-4"
            >
              Proven Performance
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-fluid-section uppercase text-white font-extrabold tracking-tight mb-8"
            >
              Biological <br />
              <span className="text-stroke-white">Metamorphosis</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 0.8, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-secondary-text text-xs md:text-sm leading-relaxed mb-10 font-light"
            >
              We measure conditioning mathematically. Track metabolic transformations, cardiac optimization rates, and body architecture alterations. Drag the slider to review the visual results of our custom VIP conditioning plan over a 16-week cycle.
            </motion.p>

            {/* Metrics cards */}
            <div className="space-y-4">
              {stats.map((stat, idx) => (
                <div key={stat.label} className="glass-panel p-5 rounded-2xl flex justify-between items-center border border-white/5">
                  <span className="text-xs uppercase tracking-wider text-secondary-text font-semibold">
                    {stat.label}
                  </span>
                  <span className="text-2xl font-display font-black text-accent-green">
                    {countVals[idx]}
                    {stat.suffix}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Draggable comparison container */}
          <div className="lg:col-span-7 flex justify-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 select-none shadow-2xl shadow-black/90 cursor-none"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              data-cursor="drag"
              data-cursor-text="DRAG"
            >
              {/* After Image (Always sits in the back, fully visible) */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000"
                  alt="After Transformation"
                  fill
                  priority
                  className="object-cover pointer-events-none"
                />
                <div className="absolute bottom-4 right-4 bg-accent-green text-black font-semibold text-[8px] uppercase tracking-widest px-3 py-1.5 rounded-md font-extrabold z-10">
                  After (Week 16)
                </div>
              </div>

              {/* Before Image (Sits in front, masked/clipped by slider position) */}
              <div
                className="absolute inset-y-0 left-0 w-full h-full overflow-hidden z-10"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="absolute inset-y-0 left-0 w-[700px] h-full" style={{ width: containerRef.current?.getBoundingClientRect().width }}>
                  <Image
                    src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000"
                    alt="Before Transformation"
                    fill
                    priority
                    className="object-cover pointer-events-none filter grayscale brightness-90"
                  />
                </div>
                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm text-white font-semibold text-[8px] uppercase tracking-widest px-3 py-1.5 rounded-md font-extrabold z-10">
                  Before (Week 0)
                </div>
              </div>

              {/* Vertical Slider Bar */}
              <div
                className="absolute inset-y-0 w-[2px] bg-accent-green z-20"
                style={{ left: `${sliderPos}%` }}
              >
                {/* Neon center button handle */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-accent-green flex items-center justify-center shadow-[0_0_20px_rgba(0,230,118,0.6)] cursor-col-resize active:scale-95 transition-transform"
                >
                  <svg
                    className="w-4 h-4 text-black font-bold"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 9l-3 3 3 3m8-6l3 3-3 3"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
