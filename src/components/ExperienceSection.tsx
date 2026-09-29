import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, Sparkles, Shield, ArrowUpRight } from 'lucide-react';

interface ExperienceSectionProps {
  onOpenReserve: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenReserve }) => {
  const pillars = [
    {
      index: '01',
      title: 'Precision Metropolitan Delivery',
      desc: 'No counters. No sterile airport car lots. Your vehicle arrives directly at your private jet ramp, hotel forecourt, or townhouse doorstep within 60 minutes.',
      icon: Navigation,
    },
    {
      index: '02',
      title: 'Detailed to Hospital Standards',
      desc: 'Each cabin undergoes an 80-point inspection, complete upholstery steam restoration, and bespoke cedar-smoke treatment before every single handover.',
      icon: Sparkles,
    },
    {
      index: '03',
      title: 'Private Chauffeur on Request',
      desc: 'Choose between pure driver-oriented autonomy or a seasoned executive chauffeur in bespoke dark suit, trained in defensive driving and discreet protocol.',
      icon: Shield,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="bg-neutral-950 text-white py-24 sm:py-32 px-6 sm:px-12 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with entrance animations */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16"
        >
          <div className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
            The Standard
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-2 tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Engineered for those who value minutes over paperwork.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-4 font-light leading-relaxed">
            Standard car rentals demand queues, insurance upsells, and generic fleets. We operate as your private subterranean garage — available on demand, anywhere you touch down.
          </p>
        </motion.div>

        {/* Pillars Grid with Staggered Framer-Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.index}
                variants={cardVariants}
                className="p-8 rounded-3xl bg-neutral-900/60 border border-white/5 hover:border-white/20 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-neutral-400 mb-6">
                    <span className="font-mono text-xs text-neutral-400">{pillar.index}</span>
                    <Icon size={20} className="text-neutral-300 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <h3
                    className="text-xl font-bold text-white mb-3 tracking-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
                  <span>Guaranteed protocol</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Banner with framer-motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-16 p-8 rounded-3xl bg-neutral-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4
              className="text-xl font-bold text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Need a vehicle in the next 60 minutes?
            </h4>
            <p className="text-xs text-neutral-400">
              Our Manhattan, Mayfair, and Dubai rapid dispatch teams are on standby 24/7.
            </p>
          </div>

          <button
            onClick={onOpenReserve}
            className="px-6 py-3 rounded-full text-xs font-semibold bg-white text-black hover:bg-neutral-200 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>Initiate Dispatch</span>
            <ArrowUpRight size={14} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
