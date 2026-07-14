"use client";

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Facilities from "@/components/Facilities";
import TrainerShowcase from "@/components/TrainerShowcase";
import Membership from "@/components/Membership";
import Transformation from "@/components/Transformation";
import Gallery from "@/components/Gallery";
import WorkoutClasses from "@/components/WorkoutClasses";
import BMICalculator from "@/components/BMICalculator";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Preloader overlay screen */}
      <LoadingScreen onComplete={() => setLoading(false)} />
      
      {/* Main Page Layout Wrapper */}
      {/* We keep elements in the DOM immediately for SEO indexation, but fade them in smoothly on load */}
      <div 
        className={`flex flex-col min-h-screen transition-opacity duration-1000 ease-out bg-[#080808] ${
          loading ? "opacity-0 pointer-events-none max-h-screen overflow-hidden" : "opacity-100"
        }`}
      >
        <Hero />
        <About />
        <Facilities />
        <TrainerShowcase />
        <Membership />
        <Transformation />
        <Gallery />
        <WorkoutClasses />
        <BMICalculator />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
