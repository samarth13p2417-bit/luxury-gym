"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What are the physical operating hours for KINETIX?",
    answer: "KINETIX offers 24/7 keyless biometric access for all Elite Club and Black Tier members. Standard Club Pass members have access between 5:00 AM and 11:00 PM daily.",
  },
  {
    question: "Can I bring guests or training partners?",
    answer: "Elite members receive 2 guest passes per month. Black Tier members enjoy unlimited guest access (limited to one guest per visit) with advanced registration via the member app.",
  },
  {
    question: "What exactly is included in the Bio-Recovery Suite?",
    answer: "The Bio-Recovery Suite is a premium therapeutic facility featuring sub-zero cryotherapy chambers, medical-grade hyperbaric oxygen chambers, high-intensity infrared saunas, and custom chilled magnesium cold-plunges (maintained at 4°C).",
  },
  {
    question: "How do the biomechanical diagnostics and hormone tracking work?",
    answer: "During your initial consultation, we conduct a 3D joint range-of-motion scan on our diagnostic force plates and provide optional metabolic blood panels. This data establishes your neural and muscular baselines, which your assigned coach uses to build your optimization plan.",
  },
  {
    question: "Is secure parking available at the club?",
    answer: "Yes. All members receive access to our secure heated underground parking garage. Elite and Black Tier members receive complimentary valet parking services.",
  },
];

function FAQAccordionItem({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <div className={`glass-panel rounded-2xl overflow-hidden border transition-all duration-300 ${isOpen ? "border-accent-green/30 bg-[#141414]/50 shadow-[0_0_20px_rgba(0,230,118,0.02)]" : "border-white/5"}`}>
      <button
        onClick={onClick}
        className="w-full text-left px-6 py-5 md:py-6 flex justify-between items-center text-white font-display font-extrabold uppercase text-xs md:text-sm tracking-widest focus:outline-none"
        data-cursor="hover"
      >
        <span className="max-w-[85%]">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-white/10 ${isOpen ? "bg-accent-green text-black" : "text-white"}`}
        >
          <ChevronDown size={14} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-6 text-xs md:text-sm text-secondary-text font-light leading-relaxed border-t border-white/5 pt-4">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const toggleItem = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      ref={containerRef}
      className="relative min-h-screen bg-background py-24 md:py-32 px-6 md:px-16 lg:px-24 flex items-center overflow-hidden border-b border-border-custom"
    >
      {/* Dynamic tech backgrounds */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:5rem_100%] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full z-10 relative">
        {/* Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : {}}
            className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-accent-green uppercase mb-4"
          >
            Club Policies
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-fluid-section uppercase text-white font-extrabold tracking-tight"
          >
            Common <span className="text-stroke-white">Inquiries</span>
          </motion.h2>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4">
          {faqData.map((item, idx) => (
            <FAQAccordionItem
              key={idx}
              item={item}
              isOpen={openIdx === idx}
              onClick={() => toggleItem(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
