"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import MagneticButton from "./MagneticButton";
import canvasConfetti from "canvas-confetti";

interface Tier {
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  popular: boolean;
  accent: "green" | "orange" | "white";
  features: string[];
}

const tiers: Tier[] = [
  {
    name: "Club Pass",
    priceMonthly: 180,
    priceAnnual: 1800,
    popular: false,
    accent: "white",
    features: [
      "Access to all basic fitness zones",
      "Matte-black towel & locker services",
      "Complimentary body scan audit",
      "Unlimited group fitness classes",
      "Standard hydro-pool entry",
      "Standard WiFi and workspace lounge"
    ],
  },
  {
    name: "Elite Club",
    priceMonthly: 290,
    priceAnnual: 2900,
    popular: true,
    accent: "green",
    features: [
      "24/7 keyless club access",
      "Dedicated biomechanical coach (2h/mo)",
      "Full Bio-Recovery Suite (sauna & plunges)",
      "2 monthly hormonal & metabolic diagnostics",
      "Luxury apparel washing & private locker",
      "Oxygen bar and nutrition shake credit ($100/mo)"
    ],
  },
  {
    name: "Black Tier",
    priceMonthly: 550,
    priceAnnual: 5500,
    popular: false,
    accent: "orange",
    features: [
      "Unlimited private suite bookings",
      "Unlimited bespoke personal training sessions",
      "Unlimited Bio-Recovery (cryo & hyperbaric)",
      "Daily biometric diagnostic assessment",
      "Personal sports nutritionist & tailor meal plans",
      "Worldwide access to affiliate luxury clubs"
    ],
  },
];

export default function Membership() {
  const [isAnnual, setIsAnnual] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const triggerCelebration = () => {
    // Elegant spark confetti on securing access
    canvasConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00E676", "#FF6B00", "#ffffff"],
    });
  };

  return (
    <section
      id="memberships"
      ref={containerRef}
      className="relative min-h-screen bg-secondary-bg py-24 md:py-32 px-6 md:px-16 lg:px-24 border-b border-border-custom"
    >
      {/* Dynamic tech backgrounds */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : {}}
            className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-accent-green uppercase mb-4"
          >
            Membership Experiences
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-fluid-section uppercase text-white font-extrabold tracking-tight mb-8"
          >
            Choose your <span className="text-stroke-white">Access</span>
          </motion.h2>
          
          {/* Toggle Switch */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center bg-[#181818] p-1.5 rounded-full border border-white/5"
          >
            {/* Sliding bubble */}
            <div
              className={`absolute top-1.5 bottom-1.5 bg-white/10 rounded-full transition-all duration-300 ${
                isAnnual ? "left-[50%] w-[48%]" : "left-1.5 w-[48%]"
              }`}
            />
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative z-10 text-[10px] md:text-xs uppercase tracking-widest px-6 py-2.5 rounded-full font-bold transition-colors ${
                !isAnnual ? "text-white" : "text-secondary-text"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative z-10 text-[10px] md:text-xs uppercase tracking-widest px-6 py-2.5 rounded-full font-bold transition-colors ${
                isAnnual ? "text-white" : "text-secondary-text"
              }`}
            >
              Annual (Save 20%)
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => {
            const isGreen = tier.accent === "green";
            const isOrange = tier.accent === "orange";
            const currentPrice = isAnnual ? tier.priceAnnual : tier.priceMonthly;
            const pricePeriod = isAnnual ? "/yr" : "/mo";

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 55 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 border
                  ${
                    tier.popular
                      ? "glass-panel-glow-green lg:scale-105"
                      : isOrange
                      ? "glass-panel-glow-orange"
                      : "glass-panel"
                  }
                  hover:-translate-y-3
                `}
              >
                {/* Visual glows inside popular card */}
                {tier.popular && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-green/10 rounded-full blur-[40px] pointer-events-none" />
                )}
                {isOrange && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-orange/10 rounded-full blur-[40px] pointer-events-none" />
                )}

                {/* Card Top */}
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-secondary-text font-mono">
                      {tier.popular ? "RECOMMENDED APEX" : "MEMBERSHIP PASS"}
                    </span>
                    {tier.popular && (
                      <span className="bg-accent-green text-black font-semibold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full font-bold shadow-[0_0_15px_rgba(0,230,118,0.3)]">
                        POPULAR
                      </span>
                    )}
                  </div>

                  <h3 className="text-3xl font-display font-black uppercase text-white tracking-tight mb-2">
                    {tier.name}
                  </h3>

                  {/* Pricing value */}
                  <div className="flex items-baseline font-display mb-8">
                    <span className="text-[20px] font-bold text-secondary-text mr-1">$</span>
                    <span className="text-5xl md:text-6xl font-black text-white tracking-tighter tabular-nums">
                      {currentPrice}
                    </span>
                    <span className="text-xs font-semibold text-secondary-text tracking-widest ml-1 font-sans">
                      {pricePeriod}
                    </span>
                  </div>

                  {/* Separation line */}
                  <div className="h-[1px] bg-white/10 mb-8" />

                  {/* Feature lists */}
                  <ul className="space-y-4">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start text-xs text-secondary-text leading-relaxed">
                        <Check
                          size={14}
                          className={`mr-3 mt-0.5 flex-shrink-0 ${
                            isGreen ? "text-accent-green" : isOrange ? "text-accent-orange" : "text-white"
                          }`}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <div className="mt-10 pt-6 border-t border-white/5">
                  <MagneticButton
                    onClick={triggerCelebration}
                    className={`w-full font-semibold text-xs uppercase tracking-widest py-4.5 rounded-2xl border transition-all duration-300
                      ${
                        isGreen
                          ? "bg-accent-green text-black border-transparent shadow-lg shadow-accent-green/10 hover:bg-accent-green/90"
                          : isOrange
                          ? "bg-accent-orange text-white border-transparent shadow-lg shadow-accent-orange/10 hover:bg-accent-orange/90"
                          : "bg-transparent text-white border-white/10 hover:border-white hover:bg-white/5"
                      }
                    `}
                    data-cursor="hover"
                  >
                    Secure Access
                  </MagneticButton>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
