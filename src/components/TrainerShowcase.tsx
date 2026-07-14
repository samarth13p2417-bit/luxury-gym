"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Mail } from "lucide-react";
import MagneticButton from "./MagneticButton";

interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialization: string;
  bio: string;
  image: string;
  instagram: string;
  twitter: string;
}

const trainersData: Trainer[] = [
  {
    id: "marcus",
    name: "Marcus Vane",
    role: "Head of Conditioning",
    experience: "12+ Years / Ex-Olympic Decathlete",
    specialization: "Explosive Power, Olympic Lifting, VO2 Max Conditioning",
    bio: "Marcus applies elite Olympic methodology to conditioning, helping members break through limits and build functional athletic reserves.",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=600",
    instagram: "#",
    twitter: "#",
  },
  {
    id: "elena",
    name: "Elena Rostova",
    role: "Director of Kinematics",
    experience: "9+ Years / PhD Sports Science",
    specialization: "Bio-Mechanical Analysis, Injury Prevention, Mobility",
    bio: "Elena specializes in muscle recruitment dynamics. She utilizes sensor boards to optimize posture, range of motion, and joint health.",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=600",
    instagram: "#",
    twitter: "#",
  },
  {
    id: "victor",
    name: "Victor Sterling",
    role: "Master Strength Coach",
    experience: "15+ Years / Elite Powerlifter",
    specialization: "Structural Hypertrophy, Absolute Strength, Neuromuscular Drive",
    bio: "Victor designs absolute strength progression systems. He has trained competitive athletes and luxury executives seeking peak physical output.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600",
    instagram: "#",
    twitter: "#",
  },
];

function TrainerCard({ trainer, index }: { trainer: Trainer; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalizing coords from -1 to 1
    const x = (e.clientX - rect.left - width / 2) / (width / 2);
    const y = (e.clientY - rect.top - height / 2) / (height / 2);

    setRotate({
      x: -y * 5, // max 5 deg rotation
      y: x * 5,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[3/4] md:aspect-[2/3] lg:aspect-[3/4.2] rounded-2xl overflow-hidden cursor-none group border border-white/5 bg-[#111]"
      style={{
        transform: hovered
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.01, 1.01, 1.01)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: hovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      data-cursor="hover"
      data-cursor-text="COACH"
    >
      {/* Trainer Image */}
      <Image
        src={trainer.image}
        alt={trainer.name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
        className="object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-90 grayscale-[15%]"
      />

      {/* Shadows Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />

      {/* Floating social links bar on card */}
      <div className="absolute top-6 right-6 z-15 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
        <a href={trainer.instagram} className="w-9 h-9 rounded-full glass-panel flex items-center justify-center hover:bg-accent-green hover:text-black text-white transition-colors duration-300" aria-label="Instagram">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        <a href={trainer.twitter} className="w-9 h-9 rounded-full glass-panel flex items-center justify-center hover:bg-accent-green hover:text-black text-white transition-colors duration-300" aria-label="Twitter">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
          </svg>
        </a>
        <a href={`mailto:${trainer.id}@kinetix.com`} className="w-9 h-9 rounded-full glass-panel flex items-center justify-center hover:bg-accent-green hover:text-black text-white transition-colors duration-300" aria-label="Mail">
          <Mail size={15} />
        </a>
      </div>

      {/* Content panel */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end h-full z-10 select-none">
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-accent-green mb-1">
          {trainer.role}
        </span>
        <h3 className="text-2xl font-display font-extrabold uppercase text-white tracking-tight">
          {trainer.name}
        </h3>
        <p className="text-[10px] font-mono text-secondary-text tracking-wide mt-1">
          {trainer.experience}
        </p>

        {/* Expandable bio & specialization */}
        <div className="mt-4 overflow-hidden max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border-t border-white/10 pt-4">
          <p className="text-secondary-text text-xs font-light leading-relaxed mb-3">
            {trainer.bio}
          </p>
          <div className="text-[9px] uppercase tracking-wider text-accent-green font-semibold">
            <span className="text-white opacity-50">Focus: </span>
            {trainer.specialization}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TrainerShowcase() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const isShowcaseInView = useInView(showcaseRef, { once: true });

  return (
    <section
      id="trainers"
      ref={showcaseRef}
      className="relative min-h-screen bg-background py-24 md:py-32 px-6 md:px-16 lg:px-24 border-b border-border-custom"
    >
      {/* Editorial horizontal lines */}
      <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-white/5 pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 right-0 h-[1px] bg-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 relative">
        {/* Title container */}
        <div className="flex flex-col mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={isShowcaseInView ? { opacity: 0.5, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-accent-green uppercase mb-4"
          >
            Elite Masters
          </motion.span>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isShowcaseInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-fluid-section uppercase text-white font-extrabold tracking-tight"
            >
              Elite <span className="text-stroke-white">Coaches</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isShowcaseInView ? { opacity: 0.7, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs md:text-sm text-secondary-text max-w-sm font-light leading-relaxed"
            >
              Coached by international sports scientists, Olympic athletes, and expert bio-mechanical specialists.
            </motion.p>
          </div>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainersData.map((trainer, index) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              index={index}
            />
          ))}
        </div>

        {/* Global CTA button at bottom of section */}
        <div className="flex justify-center mt-16 md:mt-20">
          <MagneticButton
            onClick={() => {
              const element = document.querySelector("#contact");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-transparent border border-white/20 hover:border-white text-white font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300"
            data-cursor="hover"
          >
            Request Private Consultation
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
