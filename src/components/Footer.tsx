"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-background border-t border-white/5 pt-20 pb-8 px-6 md:px-16 lg:px-24 overflow-hidden">
      
      {/* Background glowing rings */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-accent-green/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/5">
          
          {/* Brand Info & Newsletter */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-display font-black tracking-widest text-white uppercase select-none">
                KINET<span className="text-accent-green">IX</span>
              </h3>
              <p className="text-secondary-text text-xs font-light max-w-sm leading-relaxed">
                The apex of physical and biological optimization. We sculpt human performance inside modern architectural sanctuaries.
              </p>
            </div>

            {/* Newsletter input */}
            <form onSubmit={handleSubscribe} className="space-y-3 max-w-sm">
              <span className="text-[9px] uppercase tracking-widest text-secondary-text font-bold block">
                Subscribe to elite bulletins
              </span>
              <div className="relative flex items-center border-b border-white/10 focus-within:border-accent-green transition-all pb-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-white text-xs outline-none border-none placeholder:text-white/20 focus:ring-0"
                />
                <button
                  type="submit"
                  className="text-white hover:text-accent-green p-1 cursor-pointer focus:outline-none transition-colors"
                  aria-label="Subscribe"
                  data-cursor="hover"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
              {subscribed && (
                <span className="text-[9px] text-accent-green font-bold block uppercase tracking-wide animate-pulse">
                  Subscribed successfully ✓
                </span>
              )}
            </form>
          </div>

          {/* Links columns */}
          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            {/* Sitemap */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest text-white font-bold font-mono">
                Sitemap
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#about" onClick={(e) => scrollToSection(e, "#about")} className="text-xs text-secondary-text hover:text-white transition-colors">
                    About Club
                  </a>
                </li>
                <li>
                  <a href="#facilities" onClick={(e) => scrollToSection(e, "#facilities")} className="text-xs text-secondary-text hover:text-white transition-colors">
                    Environments
                  </a>
                </li>
                <li>
                  <a href="#classes" onClick={(e) => scrollToSection(e, "#classes")} className="text-xs text-secondary-text hover:text-white transition-colors">
                    Workout Classes
                  </a>
                </li>
                <li>
                  <a href="#trainers" onClick={(e) => scrollToSection(e, "#trainers")} className="text-xs text-secondary-text hover:text-white transition-colors">
                    Coaching Staff
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal / Hours */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-widest text-white font-bold font-mono">
                Access & Info
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#memberships" onClick={(e) => scrollToSection(e, "#memberships")} className="text-xs text-secondary-text hover:text-white transition-colors">
                    Membership Tiers
                  </a>
                </li>
                <li>
                  <a href="#bmi" onClick={(e) => scrollToSection(e, "#bmi")} className="text-xs text-secondary-text hover:text-white transition-colors">
                    BMI Diagnostics
                  </a>
                </li>
                <li>
                  <a href="#faq" onClick={(e) => scrollToSection(e, "#faq")} className="text-xs text-secondary-text hover:text-white transition-colors">
                    Policies FAQ
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")} className="text-xs text-secondary-text hover:text-white transition-colors">
                    Contact admissions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Location details */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] uppercase tracking-widest text-white font-bold font-mono">
              Inquiries & Desk
            </h4>
            <div className="text-xs text-secondary-text space-y-2 font-light">
              <p>Admissions Office Open Daily</p>
              <p className="text-white font-semibold">9:00 AM - 9:00 PM EST</p>
              <p className="opacity-60 pt-2">100 Luxury Avenue, Suite 500, New York</p>
              <p className="opacity-60">+1 (212) 555-8000</p>
            </div>
            
            {/* Social handles grid */}
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-secondary-text hover:bg-white hover:text-black hover:border-transparent transition-all" data-cursor="hover" aria-label="Instagram">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-secondary-text hover:bg-white hover:text-black hover:border-transparent transition-all" data-cursor="hover" aria-label="Twitter">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-secondary-text hover:bg-white hover:text-black hover:border-transparent transition-all" data-cursor="hover" aria-label="Youtube">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-secondary-text hover:bg-white hover:text-black hover:border-transparent transition-all" data-cursor="hover" aria-label="LinkedIn">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Footer bottom details */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-secondary-text text-[10px] uppercase tracking-wider font-mono">
          <p>© {new Date().getFullYear()} KINETIX Luxury Fitness Club. All Rights Reserved.</p>
          <div className="flex gap-6 opacity-60">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Admittance</a>
          </div>
        </div>

        {/* Huge Centered Brand Typography Watermark */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 text-[14vw] font-display font-black text-white/[0.015] tracking-[0.2em] pointer-events-none select-none uppercase z-[-1] leading-none">
          KINETIX
        </div>

      </div>
    </footer>
  );
}
