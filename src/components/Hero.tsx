"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";
import Header from "./Header";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Scroll parallax translation for title and video
  const yText = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);
  const scaleVideo = useTransform(scrollY, [0, 800], [1, 1.08]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      const x = (e.clientX / clientWidth - 0.5) * 40; // 40px max shift
      const y = (e.clientY / clientHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const wordAnimation = {
    hidden: { opacity: 0, y: 80, rotateX: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.5
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-between"
    >
      <Header />

      {/* Cinematic Video Background */}
      <motion.div 
        style={{ scale: scaleVideo }}
        className="absolute inset-0 w-full h-full"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 filter brightness-[0.7]"
          src="https://player.vimeo.com/external/435674703.sd.mp4?s=7f551b9e075cd6a4574971c261e479a9557a151b&profile_id=165&oauth2_token_id=57447761"
        />
        {/* Layered vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Mouse Parallax Glow Lighting */}
      <div
        className="absolute hidden md:block w-[600px] h-[600px] rounded-full bg-accent-green/5 blur-[120px] pointer-events-none"
        style={{
          left: `calc(50% + ${mousePos.x}px)`,
          top: `calc(50% + ${mousePos.y}px)`,
          transform: "translate(-50%, -50%)",
          transition: "left 0.4s ease-out, top 0.4s ease-out",
        }}
      />

      {/* Hero Typography & Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-20">
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
          className="max-w-6xl"
        >
          <span className="text-[10px] md:text-xs font-bold tracking-[0.5em] text-accent-green uppercase mb-6 block font-sans">
            EST. 2026 / THE APEX OF FITNESS
          </span>

          <h1 className="text-fluid-hero uppercase tracking-tighter text-white font-extrabold flex flex-col gap-0 select-none perspective-[1000px]">
            <span className="clip-text block">
              <motion.span className="inline-block" variants={wordAnimation}>FORGE</motion.span>{" "}
              <motion.span className="inline-block text-stroke-white" variants={wordAnimation}>YOUR</motion.span>
            </span>
            <span className="clip-text block">
              <motion.span className="inline-block text-accent-green" variants={wordAnimation}>ULTIMATE</motion.span>
            </span>
            <span className="clip-text block">
              <motion.span className="inline-block" variants={wordAnimation}>TEMPLE</motion.span>
            </span>
          </h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 0.8, y: 0, transition: { duration: 0.8, delay: 1.0 } }
            }}
            className="text-sm md:text-lg max-w-xl text-secondary-text mt-8 leading-relaxed font-light"
          >
            Where architectural luxury meets world-class human performance. Explore elite personal training suites, bio-hacking therapies, and high-performance group spaces.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.2 } }
            }}
            className="flex flex-wrap items-center gap-4 md:gap-6 mt-10"
          >
            <MagneticButton
              onClick={() => {
                const element = document.querySelector("#facilities");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-white hover:bg-white/90 text-black font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full border border-transparent shadow-2xl transition-all duration-300"
              data-cursor="hover"
            >
              Explore Spaces
            </MagneticButton>

            <MagneticButton
              onClick={() => {
                const element = document.querySelector("#classes");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="glass-panel text-white hover:bg-white hover:text-black font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full border border-white/10 transition-all duration-300"
              data-cursor="hover"
            >
              View Classes
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Footer: Mouse Indicator & Extra Info */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-8 flex items-end justify-between border-t border-white/5 bg-gradient-to-t from-background to-transparent">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.2em] text-secondary-text font-semibold"
        >
          <div>
            <p className="text-white font-bold">Location</p>
            <p className="opacity-60">100 Luxury Ave, NY</p>
          </div>
          <div>
            <p className="text-white font-bold">Hours</p>
            <p className="opacity-60">24/7 Premium Access</p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.6,
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="flex flex-col items-center gap-2 mx-auto md:mx-0 select-none cursor-pointer"
          onClick={() => {
            const element = document.querySelector("#about");
            if (element) element.scrollIntoView({ behavior: "smooth" });
          }}
          data-cursor="hover"
        >
          <span className="text-[9px] uppercase tracking-widest text-secondary-text font-bold">
            Scroll Down
          </span>
          <div className="w-5 h-9 border border-white/30 rounded-full flex justify-center p-1">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-2 bg-accent-green rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
