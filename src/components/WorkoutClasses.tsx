"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Clock, Award, User } from "lucide-react";

interface WorkoutClass {
  id: number;
  title: string;
  category: string;
  duration: string;
  difficulty: "Easy" | "Intermediate" | "Hard" | "Expert";
  instructor: string;
  video: string;
}

const classesData: WorkoutClass[] = [
  {
    id: 1,
    title: "Cardio MetCon",
    category: "Metabolic Conditioning",
    duration: "45 Mins",
    difficulty: "Hard",
    instructor: "Marcus Vane",
    video: "https://player.vimeo.com/external/494252666.hd.mp4?s=d00e84b659c0a6b7e6d2b38fb9a8385ad3d0e90c&profile_id=174&oauth2_token_id=57447761",
  },
  {
    id: 2,
    title: "Olympic Barbell",
    category: "Pure Strength",
    duration: "60 Mins",
    difficulty: "Expert",
    instructor: "Marcus Vane",
    video: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054f4d82b3ab446e10db5122f8d333b&profile_id=139&oauth2_token_id=57447761",
  },
  {
    id: 3,
    title: "Power Hypertrophy",
    category: "Muscle Density",
    duration: "50 Mins",
    difficulty: "Intermediate",
    instructor: "Victor Sterling",
    video: "https://player.vimeo.com/external/435674703.sd.mp4?s=7f551b9e075cd6a4574971c261e479a9557a151b&profile_id=165&oauth2_token_id=57447761",
  },
  {
    id: 4,
    title: "Kinematic Mobility",
    category: "Fascial Release",
    duration: "45 Mins",
    difficulty: "Easy",
    instructor: "Elena Rostova",
    video: "https://player.vimeo.com/external/494252666.hd.mp4?s=d00e84b659c0a6b7e6d2b38fb9a8385ad3d0e90c&profile_id=174&oauth2_token_id=57447761",
  },
];

export default function WorkoutClasses() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Register ScrollTrigger inside GSAP react hook
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    // Calculate maximum horizontal scroll translation
    const totalWidth = container.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollAmount = totalWidth - viewportWidth;

    if (scrollAmount <= 0) return;

    // GSAP ScrollTrigger timeline to pin and slide
    const scrollTween = gsap.to(container, {
      x: -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => `+=${scrollAmount}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    return () => {
      if (scrollTween.scrollTrigger) {
        scrollTween.scrollTrigger.kill();
      }
      scrollTween.kill();
    };
  }, { scope: triggerRef });

  return (
    <div ref={triggerRef} className="relative bg-background overflow-hidden">
      {/* 200vh height triggers vertical scroll distance to transform to horizontal */}
      <div className="h-screen w-full flex flex-col justify-center">
        
        {/* Sticky Background Title */}
        <div className="absolute top-16 md:top-24 left-6 md:left-16 lg:left-24 z-10">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-accent-green uppercase mb-3 block">
            Curated Programs
          </span>
          <h2 className="text-fluid-h3 uppercase text-white font-extrabold tracking-tight">
            Workout <span className="text-stroke-white">Classes</span>
          </h2>
        </div>

        {/* Scroll helper instruction */}
        <div className="absolute top-16 md:top-24 right-6 md:right-16 lg:right-24 z-10 flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-widest text-secondary-text animate-pulse">
            Keep Scrolling
          </span>
          <div className="w-6 h-[1px] bg-white/25" />
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={containerRef}
          className="flex gap-8 items-center flex-nowrap px-6 md:px-16 lg:px-24 w-max h-[65vh] select-none"
        >
          {classesData.map((item) => (
            <div
              key={item.id}
              className="relative w-[85vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] xl:w-[25vw] h-full rounded-3xl overflow-hidden border border-white/5 bg-[#111] cursor-none group flex-shrink-0"
              data-cursor="play"
              data-cursor-text="WATCH"
            >
              {/* Loop Video on Hover */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity duration-700"
                src={item.video}
              />

              {/* Grid Tech Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4rem] pointer-events-none" />

              {/* Borders glow */}
              <div className="absolute inset-0 border border-white/10 group-hover:border-accent-green/30 rounded-3xl transition-colors duration-500" />

              {/* Content Panel */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 bg-gradient-to-t from-black via-black/20 to-transparent">
                
                {/* Card Top: Category & Difficulty */}
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-accent-green">
                    {item.category}
                  </span>
                  
                  <span className={`text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border
                    ${
                      item.difficulty === "Expert"
                        ? "border-accent-orange text-accent-orange"
                        : item.difficulty === "Hard"
                        ? "border-red-500 text-red-500"
                        : item.difficulty === "Intermediate"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-green-500 text-green-500"
                    }
                  `}>
                    {item.difficulty}
                  </span>
                </div>

                {/* Card Bottom: Titles & Metrics */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-extrabold uppercase text-white tracking-tight leading-none">
                    {item.title}
                  </h3>

                  {/* Metrics icons */}
                  <div className="flex flex-wrap items-center gap-4 text-secondary-text text-[10px] uppercase font-mono tracking-wide pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} className="text-accent-green" />
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User size={12} className="text-accent-green" />
                      <span>{item.instructor}</span>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
