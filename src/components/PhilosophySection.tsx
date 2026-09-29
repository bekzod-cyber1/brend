import React from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../data/fleetData';
import { ShieldCheck, Zap, KeyRound, Sparkles } from 'lucide-react';

interface PhilosophySectionProps {
  onOpenReserve: () => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ onOpenReserve }) => {
  // Stagger variants for smooth viewport entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="experience"
      className="relative bg-white text-neutral-900 py-24 md:py-36 px-6 md:px-12 overflow-hidden border-t border-neutral-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Taillight Detail Image (Smooth entrance when scrolled into viewport) */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.94 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-neutral-950 aspect-[4/3] group">
              <motion.img
                initial={{ scale: 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                src={ASSETS.taillightDetail}
                alt="Precision automotive engineering detail"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute bottom-6 left-6 text-white text-xs font-mono tracking-wider uppercase opacity-85 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>Acoustic & Thermal Precision</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: High-Impact Editorial Copy with framer-motion stagger */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-8"
          >
            <div className="space-y-4 max-w-xl">
              <motion.div variants={itemVariants} className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                The Philosophy
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-neutral-950 leading-[1.1] tracking-tight"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                It’s not about getting there.
                <br />
                It’s about how you arrive.
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-2xl text-neutral-600 font-light leading-relaxed pt-2"
              >
                Your car meets you at the door —{' '}
                <span className="text-neutral-950 font-normal">
                  fuelled, detailed, silent.
                </span>
              </motion.p>
            </div>

            {/* Quick Guarantees Stagger */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-neutral-100"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-neutral-100 text-neutral-900 shrink-0">
                  <Zap size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900">Under 60 Mins</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Delivered anywhere within city limits.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-neutral-100 text-neutral-900 shrink-0">
                  <KeyRound size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900">Zero Paperwork</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Digital ID pass. Direct key handover.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-neutral-100 text-neutral-900 shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900">Fully Insured</h4>
                  <p className="text-xs text-neutral-500 mt-0.5">Zero-deductible policy on every vehicle.</p>
                </div>
              </div>
            </motion.div>

            {/* Action button */}
            <motion.div variants={itemVariants} className="pt-2">
              <button
                onClick={onOpenReserve}
                className="px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-neutral-950 hover:bg-neutral-800 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Reserve</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
