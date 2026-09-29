import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, User, CheckCircle2, ShieldCheck, Sparkles, Phone, Mail, Palette } from 'lucide-react';
import { Car, CarColor } from '../types/fleet';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar: Car | null;
  selectedCity: string;
  selectedColor?: CarColor | null;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  selectedCar,
  selectedCity,
  selectedColor,
}) => {
  const [days, setDays] = useState(3);
  const [serviceTier, setServiceTier] = useState<'self-drive' | 'chauffeur'>('self-drive');
  const [deliveryType, setDeliveryType] = useState<'hotel' | 'residence' | 'airport'>('hotel');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen || !selectedCar) return null;

  const activeColor = selectedColor || selectedCar.availableColors[0];
  const carImage = activeColor.image || selectedCar.imageSide;

  const basePrice = selectedCar.dailyRate * days;
  const chauffeurFee = serviceTier === 'chauffeur' ? 180 * days : 0;
  const conciergeDeliveryFee = 0; // Complimentary white glove
  const totalPrice = basePrice + chauffeurFee + conciergeDeliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `BRD-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(generatedRef);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white text-neutral-900 rounded-3xl overflow-hidden shadow-2xl z-10 my-8"
        >
          {submitted ? (
            /* Confirmation Screen */
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Reservation Dispatched
                </span>
                <h3
                  className="text-3xl font-extrabold text-neutral-950 mt-1"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Your {selectedCar.name} is Prepared
                </h3>
                <p className="text-sm text-neutral-600 mt-2 max-w-md mx-auto">
                  A private concierge will reach out to <strong className="text-neutral-900">{phone || email}</strong> within 15 minutes to coordinate exact key handover in {selectedCity}.
                </p>
              </div>

              {/* Reference Card */}
              <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 text-left space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
                  <span className="text-xs text-neutral-500 font-mono">Reference Code</span>
                  <span className="text-sm font-bold font-mono text-neutral-900">{bookingRef}</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-600">
                  <span>Vehicle:</span>
                  <span className="font-semibold text-neutral-900">{selectedCar.model}</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-600">
                  <span>Bespoke Exterior:</span>
                  <span className="font-semibold text-neutral-900 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full inline-block border border-black/20" style={{ backgroundColor: activeColor.hex }} />
                    {activeColor.name} ({activeColor.finish})
                  </span>
                </div>
                <div className="flex justify-between text-xs text-neutral-600">
                  <span>Delivery Location:</span>
                  <span className="font-semibold text-neutral-900">
                    {deliveryAddress || `${deliveryType.toUpperCase()} in ${selectedCity}`}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-neutral-600">
                  <span>Duration:</span>
                  <span className="font-semibold text-neutral-900">{days} Days ({serviceTier})</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-600 pt-2 border-t border-neutral-200">
                  <span className="font-medium text-neutral-900">Authorized Total:</span>
                  <span className="font-bold text-neutral-900 font-mono text-sm">${totalPrice}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-full text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
                >
                  Return to Fleet
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit}>
              {/* Header */}
              <div className="p-6 sm:p-8 bg-neutral-950 text-white flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                    <MapPin size={12} className="text-neutral-300" />
                    <span>Stationed in {selectedCity}</span>
                  </div>
                  <h3
                    className="text-2xl font-bold tracking-tight text-white mt-1"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Reserve {selectedCar.name}
                  </h3>
                  <div className="text-xs text-neutral-400 mt-0.5">{selectedCar.model}</div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Vehicle Thumbnail Bar with Chosen Color */}
                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <img
                    src={carImage}
                    alt={selectedCar.name}
                    style={activeColor.filterStyle || {}}
                    className="w-24 h-12 object-contain"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-neutral-900 truncate">
                      {selectedCar.name}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-600 mt-0.5">
                      <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: activeColor.hex }} />
                      <span className="font-medium text-neutral-800">{activeColor.name}</span>
                      <span className="text-neutral-400">·</span>
                      <span className="font-mono text-neutral-500">${selectedCar.dailyRate}/day</span>
                    </div>
                  </div>
                </div>

                {/* Service Tier Switcher */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-2">
                    Service Experience
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setServiceTier('self-drive')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        serviceTier === 'self-drive'
                          ? 'border-neutral-950 bg-neutral-950 text-white shadow-sm'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300'
                      }`}
                    >
                      <div className="text-xs font-bold">Self-Drive</div>
                      <div className={`text-[11px] mt-0.5 ${serviceTier === 'self-drive' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        Direct key handover, no restrictions
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setServiceTier('chauffeur')}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        serviceTier === 'chauffeur'
                          ? 'border-neutral-950 bg-neutral-950 text-white shadow-sm'
                          : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300'
                      }`}
                    >
                      <div className="text-xs font-bold flex items-center justify-between">
                        <span>Chauffeur Service</span>
                        <span className="text-[10px] font-mono opacity-80">+$180/day</span>
                      </div>
                      <div className={`text-[11px] mt-0.5 ${serviceTier === 'chauffeur' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        Professional executive driver in attire
                      </div>
                    </button>
                  </div>
                </div>

                {/* Duration Slider / Counter */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
                      Duration
                    </label>
                    <span className="text-xs font-mono font-bold text-neutral-900">
                      {days} {days === 1 ? 'Day' : 'Days'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 5, 7, 14].map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => setDays(d)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                          days === d
                            ? 'border-neutral-950 bg-neutral-950 text-white'
                            : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
                        }`}
                      >
                        {d}d
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery Location Type */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-2">
                    Delivery Destination in {selectedCity}
                  </label>
                  <div className="grid grid-cols-3 gap-2.5 mb-2.5">
                    {[
                      { id: 'hotel', label: 'Hotel Lobby' },
                      { id: 'airport', label: 'Private FBO / Airport' },
                      { id: 'residence', label: 'Residence' },
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setDeliveryType(type.id as any)}
                        className={`py-2 px-3 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                          deliveryType === type.id
                            ? 'border-neutral-950 bg-neutral-100 font-semibold text-neutral-950'
                            : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      required
                      placeholder={`Enter specific ${deliveryType} address or airport code...`}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-3">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600">
                    Primary Passenger / Driver
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        type="tel"
                        required
                        placeholder="Mobile (for driver WhatsApp/SMS)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="email"
                      required
                      placeholder="Email Address for Digital Pass"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>{days} days × ${selectedCar.dailyRate}</span>
                    <span className="font-mono text-neutral-900">${basePrice}</span>
                  </div>
                  {chauffeurFee > 0 && (
                    <div className="flex justify-between text-neutral-600">
                      <span>Executive Chauffeur ({days} days)</span>
                      <span className="font-mono text-neutral-900">+${chauffeurFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-600">
                    <span>Direct Doorstep Delivery</span>
                    <span className="font-mono text-emerald-600 font-medium">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Comprehensive Collision Waiver</span>
                    <span className="font-mono text-emerald-600 font-medium">Included ($0 Ded.)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-neutral-200 text-sm font-bold text-neutral-950">
                    <span>Total Investment</span>
                    <span className="font-mono">${totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-neutral-500">Pay on Handover / Card Hold</div>
                  <div className="text-xl font-bold font-mono text-neutral-950">${totalPrice}</div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 text-xs font-medium text-neutral-600 hover:text-neutral-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-7 py-3 rounded-full text-xs font-semibold bg-neutral-950 text-white hover:bg-neutral-800 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    Confirm & Dispatch
                  </button>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
