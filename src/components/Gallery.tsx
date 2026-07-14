"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  tag: string;
  image: string;
  size: "small" | "medium" | "large";
}

const galleryData: GalleryItem[] = [
  {
    id: 1,
    title: "Structural Free-Weight Suite",
    tag: "Zones",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
    size: "medium",
  },
  {
    id: 2,
    title: "Hydrotherapy Recovery Pool",
    tag: "Recovery",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800",
    size: "large",
  },
  {
    id: 3,
    title: "Oxygen-Enriched Run Lab",
    tag: "Zones",
    image: "https://images.unsplash.com/photo-1578762560072-46cf152c907d?q=80&w=800",
    size: "small",
  },
  {
    id: 4,
    title: "Cedarwood Climatized Yoga Studio",
    tag: "Mindfulness",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800",
    size: "medium",
  },
  {
    id: 5,
    title: "Infrared Sauna & Cryotherapy",
    tag: "Recovery",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800",
    size: "large",
  },
  {
    id: 6,
    title: "Concrete CrossFit Arena",
    tag: "High Intensity",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800",
    size: "small",
  },
];

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Escape key closes lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImg(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative min-h-screen bg-secondary-bg py-24 md:py-32 px-6 md:px-16 lg:px-24 border-b border-border-custom"
    >
      <div className="max-w-7xl mx-auto w-full z-10 relative">
        
        {/* Editorial Heading */}
        <div className="flex flex-col mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : {}}
            className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-accent-green uppercase mb-4"
          >
            Visual Showcase
          </motion.span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-fluid-section uppercase text-white font-extrabold tracking-tight"
            >
              The <span className="text-stroke-white">Gallery</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.7 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xs md:text-sm text-secondary-text max-w-sm font-light"
            >
              Step inside our physical space. Click any frame to enlarge the architectural perspective.
            </motion.p>
          </div>
        </div>

        {/* Pinterest-Style Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: item.id * 0.1 }}
              onClick={() => setSelectedImg(item)}
              className="relative rounded-2xl overflow-hidden cursor-none group bg-[#111] border border-white/5 break-inside-avoid shadow-lg shadow-black/30"
              data-cursor="hover"
              data-cursor-text="ZOOM"
            >
              {/* Image element with variable aspect ratios matching small/medium/large sizes */}
              <div
                className={`relative w-full ${
                  item.size === "small"
                    ? "aspect-[4/3]"
                    : item.size === "medium"
                    ? "aspect-[1/1]"
                    : "aspect-[3/4]"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:blur-[2px] filter brightness-90 grayscale-[10%]"
                />
                
                {/* Dark Hover Mask */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1.1, opacity: 1 }}
                    className="w-12 h-12 rounded-full bg-accent-green text-black flex items-center justify-center shadow-lg shadow-accent-green/20"
                  >
                    <ZoomIn size={18} />
                  </motion.div>
                </div>

                {/* Tag and Title Indicator */}
                <div className="absolute bottom-6 left-6 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-accent-green mb-1 block">
                    {item.tag}
                  </span>
                  <p className="text-white text-sm font-display uppercase font-bold tracking-wide">
                    {item.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setSelectedImg(null)}
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-8 right-8 text-white hover:text-accent-green p-2 z-50 focus:outline-none"
              onClick={() => setSelectedImg(null)}
            >
              <X size={30} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 150 }}
              className="relative max-w-5xl max-h-[85vh] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImg.image}
                alt={selectedImg.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
                priority
              />
              
              {/* Floating metadata overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-green mb-1">
                  {selectedImg.tag}
                </span>
                <h3 className="text-2xl font-display font-black uppercase text-white tracking-wide">
                  {selectedImg.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
