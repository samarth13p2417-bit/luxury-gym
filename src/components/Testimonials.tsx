"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

const row1Testimonials: Testimonial[] = [
  {
    id: 1,
    name: "David K.",
    role: "Tech Venture Capitalist",
    quote: "KINETIX is the sovereign state of training. The bio-recovery suites alone saved my spine and postural alignment after decades in venture capital.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah V.",
    role: "Ex-Heptathlete & Founder",
    quote: "Every single lift is tracked by floor pressure vectors. The biomechanical intelligence here represents Apple-level detail and engineering.",
    rating: 5,
  },
  {
    id: 3,
    name: "Lawrence G.",
    role: "Hedge Fund Principal",
    quote: "A true sanctuary. The Black Tier daily metabolic diagnostic scans and nutrition support help me sustain 14-hour trading days at peak focus.",
    rating: 5,
  },
];

const row2Testimonials: Testimonial[] = [
  {
    id: 4,
    name: "Amanda M.",
    role: "Luxury Architect",
    quote: "The concrete-clad CrossFit vault and heated black-tile pool are masterpieces of design. Training in a physical temple alters your cognitive drive.",
    rating: 5,
  },
  {
    id: 5,
    name: "Dr. Ethan W.",
    role: "Cardiovascular Surgeon",
    quote: "The oxygen-enrichment run labs and cryotherapy suites allow for rapid lactic acid clearance. Their science is medically and physiologically sound.",
    rating: 5,
  },
  {
    id: 6,
    name: "Helena R.",
    role: "Creative Director",
    quote: "A beautiful, uncompromising luxury fitness brand. From the custom matte weights to the sound-engineered cedar yoga rooms, it is flawless.",
    rating: 5,
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative min-h-screen bg-secondary-bg py-24 md:py-32 overflow-hidden border-b border-border-custom"
    >
      {/* Component-Specific Keyframes Style Tag */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marqueeL {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes marqueeR {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }
      `}} />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-16 lg:px-24 mb-16 relative z-10">
        {/* Editorial Heading */}
        <div className="flex flex-col">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : {}}
            className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-accent-green uppercase mb-4"
          >
            MEMBER STATEMENTS
          </motion.span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-fluid-section uppercase text-white font-extrabold tracking-tight"
            >
              Elite <span className="text-stroke-white">Testimonials</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.7 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs md:text-sm text-secondary-text max-w-sm font-light"
            >
              Read testimonies from the high-performing executives, athletes, and designers who train inside KINETIX.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Wrapper */}
      <div className="flex flex-col gap-6 w-full relative z-10">
        
        {/* Row 1: Leftward Scrolling Marquee */}
        <div className="marquee-container w-full overflow-hidden flex relative select-none">
          {/* Overlay Faders */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-secondary-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-secondary-bg to-transparent z-10 pointer-events-none" />

          <div
            className="marquee-track flex gap-6 w-max"
            style={{ animation: "marqueeL 40s linear infinite" }}
          >
            {/* First Set */}
            {row1Testimonials.map((t) => (
              <div
                key={`r1-orig-${t.id}`}
                className="w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] glass-panel p-8 rounded-3xl border border-white/5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-accent-green">
                    <Quote size={24} className="opacity-40" />
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" className="stroke-none" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white text-xs md:text-sm leading-relaxed font-light font-sans">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-8 border-t border-white/5 pt-4 flex flex-col">
                  <span className="text-white text-xs font-display font-extrabold uppercase tracking-wider">{t.name}</span>
                  <span className="text-[10px] text-secondary-text tracking-wide mt-0.5">{t.role}</span>
                </div>
              </div>
            ))}

            {/* Cloned Set for seamless looping */}
            {row1Testimonials.map((t) => (
              <div
                key={`r1-clone-${t.id}`}
                className="w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] glass-panel p-8 rounded-3xl border border-white/5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-accent-green">
                    <Quote size={24} className="opacity-40" />
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" className="stroke-none" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white text-xs md:text-sm leading-relaxed font-light font-sans">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-8 border-t border-white/5 pt-4 flex flex-col">
                  <span className="text-white text-xs font-display font-extrabold uppercase tracking-wider">{t.name}</span>
                  <span className="text-[10px] text-secondary-text tracking-wide mt-0.5">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Rightward Scrolling Marquee */}
        <div className="marquee-container w-full overflow-hidden flex relative select-none">
          {/* Overlay Faders */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-secondary-bg to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-secondary-bg to-transparent z-10 pointer-events-none" />

          <div
            className="marquee-track flex gap-6 w-max"
            style={{ animation: "marqueeR 40s linear infinite" }}
          >
            {/* First Set */}
            {row2Testimonials.map((t) => (
              <div
                key={`r2-orig-${t.id}`}
                className="w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] glass-panel p-8 rounded-3xl border border-white/5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-accent-orange">
                    <Quote size={24} className="opacity-40" />
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" className="stroke-none" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white text-xs md:text-sm leading-relaxed font-light font-sans">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-8 border-t border-white/5 pt-4 flex flex-col">
                  <span className="text-white text-xs font-display font-extrabold uppercase tracking-wider">{t.name}</span>
                  <span className="text-[10px] text-secondary-text tracking-wide mt-0.5">{t.role}</span>
                </div>
              </div>
            ))}

            {/* Cloned Set */}
            {row2Testimonials.map((t) => (
              <div
                key={`r2-clone-${t.id}`}
                className="w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] glass-panel p-8 rounded-3xl border border-white/5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-accent-orange">
                    <Quote size={24} className="opacity-40" />
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" className="stroke-none" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white text-xs md:text-sm leading-relaxed font-light font-sans">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-8 border-t border-white/5 pt-4 flex flex-col">
                  <span className="text-white text-xs font-display font-extrabold uppercase tracking-wider">{t.name}</span>
                  <span className="text-[10px] text-secondary-text tracking-wide mt-0.5">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
