import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, ShieldCheck, Star, MapPin, Sparkles } from 'lucide-react';
import portraitOne from '../assets/images/client_portrait_one_1790707615604.jpg';
import portraitTwo from '../assets/images/client_portrait_two_1790707630172.jpg';

interface ClientStory {
  id: string;
  quote: string;
  author: string;
  role: string;
  vehicle: string;
  location: string;
  verifiedTag: string;
  portrait: string;
  rating: number;
}

const STORIES: ClientStory[] = [
  {
    id: 'story-1',
    quote:
      'Stepping off a private charter at Teterboro and walking straight into a pre-warmed, immaculately detailed S-Class with zero paperwork is how mobility should always feel. The keys were handed to me curbside before the jet engines even finished cooling down.',
    author: 'Alexander von Berg',
    role: 'Managing Partner, Alpine Horizon Capital',
    vehicle: 'Mercedes-Benz S 580 4MATIC',
    location: 'New York · Teterboro FBO to SoHo',
    verifiedTag: 'Verified Executive Lease · 14 Days',
    portrait: portraitOne,
    rating: 5,
  },
  {
    id: 'story-2',
    quote:
      'For London Design Week, our studio needed a grand tourer with understated British poise. The Continental GT in British Racing Green was waiting at our Mayfair townhouse at precisely 8:00 AM. Flawless acoustic serenity, zero friction.',
    author: 'Elena Rostova',
    role: 'Founder & Principal, Studio Rostova',
    vehicle: 'Bentley Continental GT V8 Azure',
    location: 'London · Mayfair to Cotswolds',
    verifiedTag: 'Verified Private Client · 7 Days',
    portrait: portraitTwo,
    rating: 5,
  },
  {
    id: 'story-3',
    quote:
      'Our delegation needed seamless intercity transport between DIFC and Abu Dhabi. The Rolls-Royce Ghost was an impenetrable sanctuary of quiet. The chauffeur’s discretion and road knowledge were of diplomatic caliber.',
    author: 'Tariq Al-Mansoor',
    role: 'Principal, Sovereign Infrastructure Partners',
    vehicle: 'Rolls-Royce Ghost Extended',
    location: 'Dubai · DIFC to Emirates Palace',
    verifiedTag: 'Verified Chauffeur Lease · 5 Days',
    portrait: portraitOne,
    rating: 5,
  },
  {
    id: 'story-4',
    quote:
      'Spur-of-the-moment weekend escape to Palm Beach. The Guards Red 911 Carrera 4S was delivered to the Faena Hotel lobby in 38 minutes flat. Pure analog thrill on the coastal highway with zero rental counter bureaucracy.',
    author: 'Marcus Vance',
    role: 'Tech Founder & Automotive Collector',
    vehicle: 'Porsche 911 Carrera 4S',
    location: 'Miami · Brickell to Palm Beach',
    verifiedTag: 'Verified Self-Drive · Weekend Escape',
    portrait: portraitTwo,
    rating: 5,
  },
];

export const ClientStoriesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isPaused, setIsPaused] = useState(false);

  const activeStory = STORIES[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % STORIES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + STORIES.length) % STORIES.length);
  };

  const handleSelectStory = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto transition every 9 seconds unless paused on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 9000);
    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      filter: 'blur(6px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      filter: 'blur(6px)',
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      id="stories"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="bg-neutral-950 text-white py-24 sm:py-32 px-6 sm:px-12 border-t border-neutral-900 select-none overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header with framer-motion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-neutral-300 text-xs font-mono mb-3">
              <Sparkles size={12} className="text-white" />
              <span>Client Dispatches</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Stories from the Driver's Seat
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 font-light max-w-xl">
              From tarmac jet handovers to weekend coastal escapes — trusted by leaders, founders, and private offices worldwide.
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer shadow-sm"
              aria-label="Previous story"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white active:scale-95 transition-all cursor-pointer shadow-sm"
              aria-label="Next story"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Carousel Showcase Card with Sliding Framer-Motion Transitions */}
        <div className="relative min-h-[380px] sm:min-h-[340px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeStory.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="p-8 sm:p-12 rounded-3xl bg-neutral-900/80 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-md"
            >
              {/* Subtle background quote watermark */}
              <div className="absolute right-8 bottom-6 text-white/[0.03] pointer-events-none">
                <Quote size={180} />
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left: Client Portrait & Details */}
                <div className="lg:col-span-4 flex items-center gap-5 sm:flex-col sm:items-start">
                  <div className="relative">
                    <img
                      src={activeStory.portrait}
                      alt={activeStory.author}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-white/20 shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-neutral-950 border border-white/20 text-emerald-400">
                      <ShieldCheck size={14} />
                    </div>
                  </div>

                  <div>
                    <h3
                      className="text-lg sm:text-xl font-bold text-white tracking-tight"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {activeStory.author}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">{activeStory.role}</p>

                    <div className="mt-3 flex items-center gap-1.5 text-xs text-neutral-300 font-mono">
                      <MapPin size={12} className="text-neutral-400 shrink-0" />
                      <span>{activeStory.location}</span>
                    </div>

                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-emerald-400 font-mono">
                      <span>{activeStory.verifiedTag}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Narrative Quote and Vehicle Details */}
                <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(activeStory.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                    <span className="text-xs text-neutral-400 ml-2 font-mono">5.0 Concierge Rating</span>
                  </div>

                  {/* High-Impact Editorial Quote */}
                  <blockquote className="text-lg sm:text-2xl text-neutral-100 font-light leading-relaxed tracking-tight">
                    "{activeStory.quote}"
                  </blockquote>

                  {/* Reserved Vehicle Pill */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="text-xs text-neutral-400">
                      Dispatched Fleet Reserve:
                      <span className="text-white font-medium ml-2">{activeStory.vehicle}</span>
                    </div>

                    <span className="text-xs font-mono text-neutral-400">
                      0{currentIndex + 1} / 0{STORIES.length}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Thumbnail Tabs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {STORIES.map((story, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={story.id}
                onClick={() => handleSelectStory(idx)}
                className={`relative px-4 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-white text-neutral-950 font-semibold shadow-md'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isSelected ? '#000' : '#888' }} />
                <span>{story.author.split(' ')[0]}</span>
                <span className="opacity-60 text-[10px]">({story.vehicle.split(' ')[0]})</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
