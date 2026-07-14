"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import MagneticButton from "./MagneticButton";
import canvasConfetti from "canvas-confetti";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", tier: "Elite Club", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);

    // Simulate luxury API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Fire celebration confetti
      canvasConfetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#00E676", "#ffffff", "#FF6B00"],
      });

      // Clear form
      setTimeout(() => {
        setFormData({ name: "", email: "", tier: "Elite Club", message: "" });
        setIsSubmitted(false);
      }, 5000);
    }, 2000);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative min-h-screen bg-background py-24 md:py-32 px-6 md:px-16 lg:px-24 flex items-center overflow-hidden border-b border-border-custom"
    >
      {/* Decorative vertical mesh grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:10%_100%] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Coordinates details & Stylized Architectural Map */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.5 } : {}}
                className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-accent-green uppercase mb-4 block"
              >
                SECURE AN AUDIT
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-fluid-section uppercase text-white font-extrabold tracking-tight mb-8"
              >
                Request <br />
                <span className="text-stroke-white">Admittance</span>
              </motion.h2>

              <div className="space-y-6 text-xs md:text-sm text-secondary-text font-light tracking-wide mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-accent-green">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-white font-bold uppercase tracking-wider text-[10px]">Location</p>
                    <p className="opacity-80">100 Luxury Avenue, Suite 500, New York</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-accent-green">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-white font-bold uppercase tracking-wider text-[10px]">Coordinations</p>
                    <p className="opacity-80">+1 (212) 555-8000</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-accent-green">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-white font-bold uppercase tracking-wider text-[10px]">Inquiries</p>
                    <p className="opacity-80">admissions@kinetix.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized Architectural Map SVG */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#111] border border-white/5 shadow-2xl p-4 flex items-center justify-center">
              <svg className="w-full h-full text-white/5 opacity-50" viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* City Blocks grid lines */}
                <path d="M10 0v150M40 0v150M70 0v150M100 0v150M130 0v150M160 0v150M190 0v150M220 0v150M250 0v150M280 0v150" stroke="currentColor" strokeWidth="0.5" />
                <path d="M0 20h300M0 50h300M0 80h300M0 110h300M0 140h300" stroke="currentColor" strokeWidth="0.5" />
                
                {/* Diagonal parks or river outlines */}
                <path d="M-10 150L180 -10 M120 160L310 -10" stroke="rgba(255,255,255,0.02)" strokeWidth="8" />
                
                {/* Stylized park block */}
                <rect x="100" y="50" width="30" height="30" fill="rgba(0,230,118,0.03)" stroke="rgba(0,230,118,0.08)" strokeWidth="0.5" />
              </svg>

              {/* Glowing Club Coordinates Pin */}
              <div className="absolute top-[48%] left-[42%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <span className="absolute inline-flex h-12 w-12 rounded-full bg-accent-green/30 animate-ping opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-accent-green shadow-[0_0_15px_rgba(0,230,118,0.8)] border-2 border-black" />
                
                {/* Location tooltip popover */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black border border-accent-green/40 px-3 py-1 rounded text-[8px] font-bold text-white tracking-widest uppercase pointer-events-none select-none whitespace-nowrap shadow-lg">
                  KINETIX HQ
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 h-full flex flex-col justify-center relative overflow-hidden"
            >
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-background/95 backdrop-blur-xl z-20 flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-16 h-16 rounded-full bg-accent-green/20 border border-accent-green/50 flex items-center justify-center text-accent-green mb-6 animate-bounce">
                    <Send size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-extrabold uppercase text-white tracking-tight">
                    Access Requested
                  </h3>
                  <p className="text-secondary-text text-xs md:text-sm font-light leading-relaxed max-w-sm mt-3">
                    Your admissions query has been secure. Our concierge will review your bio-credentials and contact you within 24 hours.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8 relative">
                
                {/* Name field (Floating labels style) */}
                <div className="relative border-b border-white/10 pb-2">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-none text-white text-sm md:text-base outline-none pt-6 pb-1 focus:ring-0 peer"
                  />
                  <label
                    className={`absolute left-0 bottom-2 text-xs md:text-sm transition-all duration-300 pointer-events-none uppercase tracking-wider
                      ${
                        focusedField === "name" || formData.name
                          ? "bottom-10 text-[9px] text-accent-green font-bold"
                          : "text-secondary-text"
                      }
                    `}
                  >
                    Full Name
                  </label>
                  <div
                    className={`h-[1px] bg-accent-green absolute bottom-0 left-0 transition-all duration-500
                      ${focusedField === "name" ? "w-full" : "w-0"}
                    `}
                  />
                </div>

                {/* Email field */}
                <div className="relative border-b border-white/10 pb-2">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-none text-white text-sm md:text-base outline-none pt-6 pb-1 focus:ring-0 peer"
                  />
                  <label
                    className={`absolute left-0 bottom-2 text-xs md:text-sm transition-all duration-300 pointer-events-none uppercase tracking-wider
                      ${
                        focusedField === "email" || formData.email
                          ? "bottom-10 text-[9px] text-accent-green font-bold"
                          : "text-secondary-text"
                      }
                    `}
                  >
                    Electronic Mail
                  </label>
                  <div
                    className={`h-[1px] bg-accent-green absolute bottom-0 left-0 transition-all duration-500
                      ${focusedField === "email" ? "w-full" : "w-0"}
                    `}
                  />
                </div>

                {/* Select Tier (Glass dropdown) */}
                <div className="flex flex-col gap-2 relative">
                  <span className="text-[9px] uppercase tracking-wider text-secondary-text font-bold">
                    Select Target Membership Tier
                  </span>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    className="w-full bg-[#141414] border border-white/10 text-white rounded-xl py-3 px-4 outline-none text-xs uppercase tracking-widest font-bold focus:border-accent-green transition-all"
                    data-cursor="hover"
                  >
                    <option value="Club Pass">Club Pass - $180/mo</option>
                    <option value="Elite Club">Elite Club - $290/mo</option>
                    <option value="Black Tier">Black Tier - $550/mo</option>
                  </select>
                </div>

                {/* Message field */}
                <div className="relative border-b border-white/10 pb-2">
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-none text-white text-sm md:text-base outline-none pt-6 pb-1 focus:ring-0 resize-none"
                  />
                  <label
                    className={`absolute left-0 bottom-2 transition-all duration-300 pointer-events-none uppercase tracking-wider
                      ${
                        focusedField === "message" || formData.message
                          ? "bottom-24 text-[9px] text-accent-green font-bold"
                          : "text-xs md:text-sm text-secondary-text"
                      }
                    `}
                  >
                    Custom Performance Notes
                  </label>
                  <div
                    className={`h-[1px] bg-accent-green absolute bottom-0 left-0 transition-all duration-500
                      ${focusedField === "message" ? "w-full" : "w-0"}
                    `}
                  />
                </div>

                {/* Submit button */}
                <div className="pt-6">
                  <MagneticButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white hover:bg-white/95 text-black font-semibold text-xs uppercase tracking-widest py-4.5 rounded-2xl flex items-center justify-center gap-2 border border-transparent transition-all shadow-lg active:scale-98"
                    data-cursor="hover"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Submit Request</span>
                        <Send size={12} className="ml-1" />
                      </>
                    )}
                  </MagneticButton>
                </div>

              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
