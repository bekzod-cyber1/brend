import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gauge, Zap, Cog, Shield, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { Car } from '../types/fleet';

interface SpecificationsModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onReserve: (car: Car) => void;
}

export const SpecificationsModal: React.FC<SpecificationsModalProps> = ({
  car,
  isOpen,
  onClose,
  onReserve,
}) => {
  if (!isOpen || !car) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-neutral-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10 my-8"
        >
          {/* Header Bar */}
          <div className="relative px-6 sm:px-8 pt-8 pb-6 border-b border-white/10 flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                {car.brand} · {car.category}
              </div>
              <h3
                className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {car.model}
              </h3>
              <p className="text-sm text-neutral-400 mt-1 max-w-lg">
                {car.tagline}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
              aria-label="Close specifications"
            >
              <X size={20} />
            </button>
          </div>

          {/* Car Image Preview */}
          <div className="relative bg-neutral-950/60 p-6 flex items-center justify-center border-b border-white/5">
            <img
              src={car.imageSide}
              alt={car.name}
              className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
                  <Zap size={14} />
                  <span>0 - 100 km/h</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white mt-1 font-mono">
                  {car.specs.acceleration0to100}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
                  <Gauge size={14} />
                  <span>Horsepower</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white mt-1 font-mono">
                  {car.specs.horsepower} <span className="text-xs text-neutral-400 font-normal">HP</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
                  <Compass size={14} />
                  <span>Top Speed</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white mt-1 font-mono">
                  {car.specs.topSpeed.split(' ')[0]}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
                  <Cog size={14} />
                  <span>Drivetrain</span>
                </div>
                <div className="text-sm font-semibold text-white mt-1.5 truncate">
                  {car.specs.driveType.split(' ')[0]} AWD
                </div>
              </div>
            </div>

            {/* Engineering & Powertrain Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Engineering Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between py-2 px-3 rounded-xl bg-white/[0.03]">
                  <span className="text-neutral-400">Engine</span>
                  <span className="text-white font-medium">{car.specs.engine}</span>
                </div>
                <div className="flex justify-between py-2 px-3 rounded-xl bg-white/[0.03]">
                  <span className="text-neutral-400">Transmission</span>
                  <span className="text-white font-medium">{car.specs.transmission}</span>
                </div>
                <div className="flex justify-between py-2 px-3 rounded-xl bg-white/[0.03]">
                  <span className="text-neutral-400">Luggage</span>
                  <span className="text-white font-medium">{car.specs.luggageCapacity}</span>
                </div>
                <div className="flex justify-between py-2 px-3 rounded-xl bg-white/[0.03]">
                  <span className="text-neutral-400">Fuel Grade</span>
                  <span className="text-white font-medium">{car.specs.fuelType}</span>
                </div>
              </div>
            </div>

            {/* Exclusive Amenities */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-neutral-300" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Curated Interior & Technology Equipment
                </h4>
              </div>
              <div className="space-y-2">
                {car.specs.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] text-sm text-neutral-300"
                  >
                    <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Protection statement */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-white/5 flex items-center gap-3">
              <Shield size={20} className="text-white shrink-0" />
              <div className="text-xs text-neutral-300 leading-relaxed">
                <strong className="text-white">Included with every booking:</strong> $0 deductible comprehensive policy, 24/7 dedicated telephone concierge, and guaranteed sanitized delivery.
              </div>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="px-6 sm:px-8 py-5 border-t border-white/10 bg-neutral-950/80 flex items-center justify-between">
            <div>
              <div className="text-xs text-neutral-400">Daily rate</div>
              <div className="text-2xl font-bold text-white font-mono">
                ${car.dailyRate}
                <span className="text-xs font-normal text-neutral-400"> / 24 hrs</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onReserve(car);
                }}
                className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-neutral-200 active:scale-95 transition-all shadow-md"
              >
                Reserve This Car
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
