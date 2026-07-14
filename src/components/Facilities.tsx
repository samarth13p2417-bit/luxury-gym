"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

interface Facility {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  accent: "green" | "orange";
}

const facilitiesData: Facility[] = [
  {
    id: "strength",
    title: "Strength Conditioning",
    category: "Lifting Suite",
    description: "Matte-black structural rigs, custom metal plates, and diagnostic pressure plates to measure force vectors.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
    accent: "green",
  },
  {
    id: "recovery",
    title: "Bio-Recovery Suite",
    category: "Therapy & Spa",
    description: "Sub-zero cryo chambers, infrared saunas, hyperbaric oxygen chambers, and magnesium cold-plunge pools.",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800",
    accent: "orange",
  },
  {
    id: "crossfit",
    title: "CrossFit Arena",
    category: "High Intensity",
    description: "Double-height concrete arenas equipped for heavy lifting, rope climbs, and customized cardiovascular pacing.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800",
    accent: "green",
  },
  {
    id: "swimming",
    title: "Swimming Sanctuary",
    category: "Aesthetics & Cardio",
    description: "Black-tile heated lap pools with underwater acoustic sound systems and architectural shadow-casting lighting.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800",
    accent: "orange",
  },
  {
    id: "yoga",
    title: "Yoga & Mindfulness",
    category: "Mind & Body",
    description: "Climatized cedar-wood studios with sound insulation, aromatherapy ventilation, and ambient organic lighting.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800",
    accent: "green",
  },
  {
    id: "cardio",
    title: "Cardio Optimization",
    category: "Endurance Suite",
    description: "Curved manual run systems, interactive cycling hubs, and individual oxygen-enrichment training hoods.",
    image: "https://images.unsplash.com/photo-1578762560072-46cf152c907d?q=80&w=800",
    accent: "orange",
  },
];

function TiltCard({ facility, delay }: { facility: Facility; delay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative mouse coordinate from center of card
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Divide by half-width to get ranges from -1 to 1
    const rotX = -(mouseY / (height / 2)) * 6; // Max 6 degree rotation
    const rotY = (mouseX / (width / 2)) * 6;

    setTilt({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  const isGreen = facility.accent === "green";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[16/10] md:aspect-[4/3] lg:aspect-[1.1] rounded-2xl overflow-hidden cursor-none group bg-[#111] border border-white/5"
      style={{
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: hovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      data-cursor={isGreen ? "play" : "hover"}
      data-cursor-text={isGreen ? "ENTER" : "VIEW"}
    >
      {/* Background Image */}
      <Image
        src={facility.image}
        alt={facility.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        className="object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-[0.7] grayscale-[10%]"
      />

      {/* Glow highlight */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
          isGreen
            ? "bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(0,230,118,0.15)_0%,transparent_60%)]"
            : "bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,107,0,0.15)_0%,transparent_60%)]"
        }`}
        style={{
          // Update mouse position locally if needed, or static fallback
          background: isGreen
            ? "radial-gradient(circle, rgba(0,230,118,0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)"
        }}
      />

      {/* Borders on hover */}
      <div
        className={`absolute inset-0 border-2 rounded-2xl pointer-events-none transition-all duration-500 ${
          hovered
            ? isGreen
              ? "border-accent-green/40 shadow-[0_0_30px_rgba(0,230,118,0.15)]"
              : "border-accent-orange/40 shadow-[0_0_30px_rgba(255,107,0,0.15)]"
            : "border-transparent"
        }`}
      />

      {/* Content overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85" />

      {/* Panel Info details */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end h-full z-10 select-none">
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-accent-green mb-2">
          {facility.category}
        </span>
        <h3 className="text-xl md:text-2xl font-display font-extrabold uppercase text-white tracking-tight">
          {facility.title}
        </h3>
        
        {/* Animated collapse details */}
        <p className="text-secondary-text text-xs md:text-sm mt-3 opacity-0 max-h-0 group-hover:opacity-90 group-hover:max-h-20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] font-light leading-relaxed">
          {facility.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Facilities() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });

  return (
    <section
      id="facilities"
      className="relative min-h-screen bg-secondary-bg py-24 md:py-32 px-6 md:px-16 lg:px-24 border-b border-border-custom"
    >
      {/* Decorative grids */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        {/* Title container */}
        <div ref={titleRef} className="flex flex-col mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isTitleInView ? { opacity: 0.5, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-accent-green uppercase mb-4"
          >
            Club Environments
          </motion.span>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-fluid-section uppercase text-white font-extrabold tracking-tight"
            >
              Elite <span className="text-stroke-white">Sanctuaries</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 0.7, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs md:text-sm text-secondary-text max-w-sm font-light leading-relaxed"
            >
              Move through six spaces meticulously designed for focus, force generation, and cellular recovery. Hover to inspect structural specifications.
            </motion.p>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {facilitiesData.map((facility, index) => (
            <TiltCard
              key={facility.id}
              facility={facility}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
