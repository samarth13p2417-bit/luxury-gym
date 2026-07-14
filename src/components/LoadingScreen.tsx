"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 2200; // 2.2 seconds total load
    const interval = 25;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Apply an ease-out feeling to the loading percentage bar
      const progressRatio = currentStep / steps;
      const easedProgress = Math.min(
        Math.round((1 - Math.pow(1 - progressRatio, 3)) * 100),
        100
      );
      setProgress(easedProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 800); // trigger page load complete when animation starts sliding out
        }, 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100vh",
            transition: { duration: 1.0, ease: [0.85, 0, 0.15, 1] },
          }}
          className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Tech Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent-green/10 rounded-full blur-[80px]" />

          {/* Logo Drawing */}
          <div className="relative flex flex-col items-center z-10">
            <svg
              className="w-20 h-20 md:w-24 md:h-24 mb-6 text-accent-green"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Geometric 'K' for Kinetix */}
              <motion.path
                d="M25 15 V85"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.path
                d="M25 50 L75 15"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
              />
              <motion.path
                d="M45 36 L75 85"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
              />
            </svg>

            {/* Glowing Brand Name */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl font-display font-extrabold tracking-[0.25em] text-white uppercase relative pl-2"
            >
              KINETIX
            </motion.h1>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-[9px] uppercase tracking-[0.4em] text-secondary-text mt-3 font-sans"
            >
              Elite Fitness Experience
            </motion.span>
          </div>

          {/* Numeric loader */}
          <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center justify-center z-10">
            <div className="flex items-baseline font-mono">
              <span className="text-6xl md:text-8xl font-black tracking-tighter text-white tabular-nums">
                {progress.toString().padStart(3, "0")}
              </span>
              <span className="text-xl md:text-2xl font-bold text-accent-green ml-1">%</span>
            </div>

            {/* Progress bar tracking line */}
            <div className="w-56 h-[2px] bg-white/10 mt-5 overflow-hidden rounded-full relative">
              <motion.div
                className="h-full bg-accent-green"
                style={{ width: `${progress}%` }}
                layout
              />
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ repeat: Infinity, duration: 2.0 }}
              className="text-[9px] text-secondary-text uppercase tracking-widest mt-4"
            >
              Preloading Cinematic Assets
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
