"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Facilities", href: "#facilities" },
  { name: "Classes", href: "#classes" },
  { name: "Trainers", href: "#trainers" },
  { name: "Memberships", href: "#memberships" },
  { name: "Transformations", href: "#transformations" },
  { name: "BMI", href: "#bmi" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 md:px-12 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border-custom"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="text-2xl font-display font-black tracking-widest text-white flex items-center gap-1 group"
            data-cursor="hover"
          >
            <span>KINET</span>
            <span className="text-accent-green transition-transform duration-500 group-hover:scale-110">IX</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 glass-panel px-6 py-2 rounded-full">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs uppercase tracking-widest text-secondary-text hover:text-white px-4 py-2 transition-colors relative group font-sans"
              >
                {link.name}
                <span className="absolute bottom-1 left-4 right-4 h-[1px] bg-accent-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <MagneticButton
              onClick={() => {
                const contact = document.querySelector("#contact");
                if (contact) contact.scrollIntoView({ behavior: "smooth" });
              }}
              className="hidden sm:inline-flex bg-accent-green hover:bg-accent-green/90 text-black font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-full border border-transparent transition-all duration-300 shadow-lg shadow-accent-green/10"
              data-cursor="hover"
            >
              Join Now
            </MagneticButton>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-accent-green lg:hidden focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col justify-center px-8 md:px-16"
          >
            {/* Tech grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            <div className="flex flex-col gap-6 md:gap-8 max-w-lg">
              <span className="text-[10px] uppercase tracking-[0.4em] text-accent-green font-bold">
                Navigation
              </span>
              <div className="flex flex-col gap-3">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 + 0.2, duration: 0.5 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white hover:text-accent-green uppercase tracking-wide transition-colors block py-1"
                    >
                      {link.name}
                    </a>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 border-t border-border-custom pt-6 flex flex-col gap-4"
              >
                <div className="text-xs text-secondary-text">
                  <p>KINETIX Elite Fitness Club</p>
                  <p className="opacity-60">100 Luxury Avenue, Suite 500</p>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    const contact = document.querySelector("#contact");
                    if (contact) contact.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-accent-green text-black font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full w-full max-w-xs self-start mt-2"
                >
                  Join the Club
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
