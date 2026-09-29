import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Check, Clock, Car } from 'lucide-react';
import { CITIES } from '../data/fleetData';

interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity: string;
  onSelectCity: (cityName: string) => void;
}

export const CitySelectorModal: React.FC<CitySelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-neutral-100 z-10"
        >
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div>
              <h3
                className="text-xl font-bold text-neutral-900"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Select Delivery City
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Our private fleet is stationed with active chauffeurs ready for dispatch.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
            {CITIES.map((city) => {
              const isSelected = selectedCity === city.name;
              return (
                <button
                  key={city.id}
                  onClick={() => {
                    onSelectCity(city.name);
                    onClose();
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-neutral-900 bg-neutral-50 shadow-sm'
                      : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`p-2.5 rounded-xl ${
                        isSelected ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900 text-sm flex items-center gap-2">
                        <span>{city.name}</span>
                        <span className="text-xs font-normal text-neutral-500">· {city.country}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Car size={12} className="opacity-70" />
                          <span>{city.activeCount} vehicles active</span>
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="opacity-70" />
                          <span>{city.deliveryEstimate}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                      <Check size={14} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100 text-center">
            <span className="text-xs text-neutral-400">
              Need custom aviation or yacht transfer? Contact our private desk.
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
