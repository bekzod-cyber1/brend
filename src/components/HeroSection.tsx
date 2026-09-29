import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowDown, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data/fleetData';

interface HeroSectionProps {
  currentCity: string;
  onOpenCitySelector: () => void;
  onOpenReserve: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentCity,
  onOpenCitySelector,
  onOpenReserve,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const activeSlide = HERO_SLIDES[slideIndex];

  // Auto transition hero showcase every 8 seconds, or user can toggle manually
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="overview"
      className="relative min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background radial gradient to give depth to the luxury photography */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(35,35,40,0.45)_0%,rgba(0,0,0,0.95)_75%)] pointer-events-none" />

      {/* Main Hero Visual Area */}
      <div className="relative w-full flex-1 flex items-center justify-center pt-24 pb-8 px-4 sm:px-6">
        {/* The Dynamic Luxury Showcase (Mercedes S-Class / Bentley Continental) */}
        <div className="relative max-w-5xl w-full mx-auto flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.02, filter: 'blur(6px)' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full flex items-center justify-center"
            >
              <img
                src={activeSlide.image}
                alt={`${activeSlide.title} with Private Chauffeur`}
                className="w-full h-auto object-cover rounded-3xl shadow-2xl opacity-90 hover:opacity-100 transition-opacity duration-700"
              />

              {/* Slide Switcher Indicator on bottom edge of car photo */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 z-20 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <span className="text-[11px] text-neutral-400 font-mono">Collection:</span>
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setSlideIndex(idx)}
                    className={`h-2 transition-all rounded-full ${
                      idx === slideIndex ? 'w-6 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Show ${slide.title}`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Floating Location Tag (matching video: "📍 New York") */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="absolute top-4 left-4 sm:top-10 sm:left-10 z-20"
          >
            <button
              onClick={onOpenCitySelector}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-xs font-medium text-neutral-200 hover:text-white hover:border-white/40 transition-all cursor-pointer shadow-lg group"
              title="Change Delivery Location"
            >
              <MapPin size={13} className="text-neutral-400 group-hover:text-white transition-colors" />
              <span>{currentCity}</span>
              <span className="text-[10px] text-neutral-400 font-mono pl-1 group-hover:text-neutral-200">Switch</span>
            </button>
          </motion.div>
        </div>

        {/* Left Side Floating Narrative Copy (exact match to video, enhanced with motion reveal) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2 max-w-xs md:max-w-sm z-20 pointer-events-auto hidden sm:block"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-1.5 text-sm md:text-base font-light text-neutral-300 leading-snug tracking-tight"
          >
            <p className="text-white font-medium">The car you want, at your door —</p>
            <p className="text-neutral-400">
              No counters, no paperwork — <span className="text-white">just the keys.</span>
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mt-3 text-xs text-neutral-400 font-mono"
            >
              Now spotlighting: <span className="text-neutral-200 font-semibold">{activeSlide.brandTag}</span>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-4"
          >
            <button
              onClick={onOpenReserve}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white group transition-colors cursor-pointer"
            >
              <span className="w-6 h-[1px] bg-neutral-600 group-hover:w-8 group-hover:bg-white transition-all" />
              <span>Explore Fleet in {currentCity}</span>
              <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Architectural Typography & Scroll Indicator */}
      <div className="relative z-20 w-full px-6 md:px-12 pb-8 pt-4 flex flex-col md:flex-row items-end justify-between border-t border-white/10">
        {/* Bottom Left: Scroll Indicator */}
        <motion.a
          href="#experience"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors pb-2 cursor-pointer group"
        >
          <span>Scroll</span>
          <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
        </motion.a>

        {/* Center / Right: Big Bold Architectural Titles matching video ("Premium" and "Car Rental") */}
        <div className="w-full md:w-auto flex items-baseline justify-between md:justify-end gap-8 sm:gap-12 mt-4 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-300"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Premium
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-right leading-none"
          >
            <div
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Car
            </div>
            <div
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white -mt-1 md:-mt-2"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Rental
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
