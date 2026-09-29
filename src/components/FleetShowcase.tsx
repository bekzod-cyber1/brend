import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  Search,
  X,
  Palette,
  Check,
  RotateCcw,
} from 'lucide-react';
import { FLEET_CARS } from '../data/fleetData';
import { Car, CarColor } from '../types/fleet';

interface FleetShowcaseProps {
  currentCity: string;
  onOpenCitySelector: () => void;
  onOpenSpecs: (car: Car) => void;
  onOpenReserve: (car: Car, selectedColor?: CarColor) => void;
}

export const FleetShowcase: React.FC<FleetShowcaseProps> = ({
  currentCity,
  onOpenCitySelector,
  onOpenSpecs,
  onOpenReserve,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<CarColor | null>(null);

  const categories = ['All', 'Executive Sedan', 'Grand Tourer', 'Sports Coupe', 'Ultra Luxury'];

  // Combined search and category filtering
  const filteredCars = useMemo(() => {
    return FLEET_CARS.filter((car) => {
      // Category match
      const matchesCategory = selectedCategory === 'All' || car.category === selectedCategory;

      // Search match
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesSearch =
        car.name.toLowerCase().includes(q) ||
        car.brand.toLowerCase().includes(q) ||
        car.model.toLowerCase().includes(q) ||
        car.category.toLowerCase().includes(q) ||
        car.specs.engine.toLowerCase().includes(q) ||
        car.tagline.toLowerCase().includes(q) ||
        car.availableColors.some((c) => c.name.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Make sure currentIndex is valid
  const safeIndex = currentIndex >= filteredCars.length ? 0 : currentIndex;
  const activeCar = filteredCars[safeIndex];

  // Active color resolution
  const currentColor = activeCar
    ? selectedColor || activeCar.availableColors[0]
    : FLEET_CARS[0].availableColors[0];

  const activeCarImage = activeCar
    ? currentColor.image || activeCar.imageSide
    : FLEET_CARS[0].imageSide;

  const handlePrev = () => {
    if (filteredCars.length <= 1) return;
    setSelectedColor(null);
    setCurrentIndex((prev) => (prev === 0 ? filteredCars.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (filteredCars.length <= 1) return;
    setSelectedColor(null);
    setCurrentIndex((prev) => (prev === filteredCars.length - 1 ? 0 : prev + 1));
  };

  const handleSelectCar = (index: number) => {
    setSelectedColor(null);
    setCurrentIndex(index);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setCurrentIndex(0);
    setSelectedColor(null);
  };

  return (
    <section
      id="fleet"
      className="relative bg-white text-neutral-900 pt-20 pb-28 px-4 sm:px-8 overflow-hidden select-none border-t border-neutral-100"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-neutral-100/70 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Editorial Headline with framer-motion entrance */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center max-w-3xl mb-8 sm:mb-10 px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-mono mb-4"
          >
            <Sparkles size={12} className="text-neutral-900" />
            <span>Multi-Brand Flagship Reserve</span>
          </motion.div>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-normal text-neutral-900 leading-snug tracking-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            A private collection, not a car park: S-Class to Continental GT, each car detailed, insured and at your door within the hour, anywhere in{' '}
            <button
              onClick={onOpenCitySelector}
              className="inline-flex items-baseline font-semibold text-neutral-950 underline decoration-neutral-300 hover:decoration-neutral-950 underline-offset-4 cursor-pointer transition-colors"
            >
              {currentCity}.
            </button>
          </h2>
        </motion.div>

        {/* Searchable Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="w-full max-w-3xl mb-6 px-4"
        >
          <div className="relative flex items-center w-full bg-neutral-50/90 rounded-2xl border border-neutral-200/90 shadow-sm focus-within:border-neutral-950 focus-within:bg-white focus-within:shadow-md transition-all">
            <div className="pl-4 pr-2 text-neutral-400">
              <Search size={16} />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentIndex(0);
                setSelectedColor(null);
              }}
              placeholder="Search by model, brand, or powertrain (e.g. S-Class, Porsche, V8, Ferrari)..."
              className="w-full py-3.5 pr-10 text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 bg-transparent focus:outline-none"
            />

            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCurrentIndex(0);
                }}
                className="p-1.5 mr-3 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                title="Clear search"
              >
                <X size={15} />
              </button>
            )}

            <div className="hidden sm:flex items-center gap-1.5 pr-4 text-[11px] font-mono text-neutral-400 shrink-0 border-l border-neutral-200/70 pl-3">
              <span>{filteredCars.length} of {FLEET_CARS.length} ready</span>
            </div>
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-neutral-100/90 rounded-2xl mb-8 max-w-full overflow-x-auto"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentIndex(0);
                  setSelectedColor(null);
                }}
                className={`relative px-4 py-2 text-xs font-medium rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-neutral-950 font-semibold shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="category-active-pill"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{cat === 'All' ? 'All Flagships' : cat}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Main Content: Showcase vs. No Results */}
        {filteredCars.length === 0 ? (
          /* Empty Search State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl py-16 px-6 text-center rounded-3xl bg-neutral-50 border border-dashed border-neutral-300 my-4"
          >
            <div className="w-12 h-12 rounded-full bg-neutral-200/60 text-neutral-500 mx-auto flex items-center justify-center mb-3">
              <Search size={20} />
            </div>
            <h3
              className="text-lg font-bold text-neutral-900"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              No vehicles found matching "{searchQuery}"
            </h3>
            <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
              Try searching for brands like "Mercedes", "Bentley", "Ferrari", "Porsche", or resetting your category filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-neutral-950 text-white hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Reset Search & Filters</span>
            </button>
          </motion.div>
        ) : (
          <>
            {/* Centerpiece Car Presentation Stage with Framer-Motion Layout Transitions */}
            <motion.div
              layout
              transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }}
              className="relative w-full min-h-[320px] sm:min-h-[420px] md:min-h-[480px] flex items-center justify-center my-2"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCar.id + currentColor.name}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 12, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.04, y: -12, filter: 'blur(6px)' }}
                  transition={{
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
                  }}
                  className="relative w-full max-w-4xl flex flex-col items-center justify-center px-4"
                >
                  {/* Brand and Active Color Badge with Layout Animation */}
                  <motion.div
                    layout
                    className="absolute -top-6 sm:top-0 left-6 flex items-center gap-2"
                  >
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                      {activeCar.brand}
                    </span>
                    <span className="text-neutral-300">·</span>
                    <span className="text-xs font-mono text-neutral-900 font-semibold flex items-center gap-1.5">
                      <motion.span
                        layout
                        className="w-2.5 h-2.5 rounded-full border border-black/20 inline-block shadow-sm"
                        style={{ backgroundColor: currentColor.hex }}
                      />
                      <span>{currentColor.name}</span>
                      <span className="text-neutral-400 font-normal text-[11px]">({currentColor.finish})</span>
                    </span>
                  </motion.div>

                  {/* High-Resolution Side Profile Image with Dynamic Color/Filter */}
                  <motion.div
                    layout
                    className="relative w-full flex items-center justify-center group cursor-pointer"
                    onClick={() => onOpenSpecs(activeCar)}
                  >
                    <motion.img
                      layout
                      key={activeCarImage + currentColor.name}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                      src={activeCarImage}
                      alt={`${activeCar.name} - ${currentColor.name}`}
                      style={currentColor.filterStyle || {}}
                      className="w-full max-w-3xl h-auto object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </motion.div>

                  {/* Realistic Floor Shadow */}
                  <motion.div
                    layout
                    className="w-3/4 h-5 bg-gradient-to-r from-transparent via-neutral-400/40 to-transparent blur-md -mt-2 rounded-full"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Interactive Exterior Color Palette Switcher with Smooth Layout Morphing */}
            <motion.div
              layout
              transition={{ layout: { type: 'spring', damping: 25, stiffness: 220 } }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-3 my-4 px-5 py-2.5 rounded-full bg-neutral-50 border border-neutral-200/80 shadow-sm"
            >
              <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-600">
                <Palette size={13} className="text-neutral-900" />
                <span>Bespoke Exterior:</span>
              </div>

              <motion.div layout className="flex flex-wrap items-center gap-2">
                {activeCar.availableColors.map((color) => {
                  const isColorActive = currentColor.name === color.name;
                  return (
                    <motion.button
                      layout
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                        isColorActive
                          ? 'text-white'
                          : 'bg-white text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 border border-neutral-200'
                      }`}
                      title={`${color.name} (${color.finish})`}
                    >
                      {/* Active indicator with Framer-Motion layoutId */}
                      {isColorActive && (
                        <motion.div
                          layoutId="active-color-pill"
                          className="absolute inset-0 bg-neutral-950 rounded-full shadow-md -z-0"
                          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                        />
                      )}
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-inner shrink-0 relative z-10"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="font-medium whitespace-nowrap relative z-10">{color.name}</span>
                      {isColorActive && <Check size={12} className="text-white relative z-10" />}
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Floating Bottom Control Card with Layout Morphing */}
            <motion.div
              layout
              transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full max-w-4xl mt-3 px-4"
            >
              <div className="glass-light rounded-3xl p-4 sm:p-6 shadow-xl border border-neutral-200/80 flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Left Zone: Prev Button, Car Name & Subtitle */}
                <div className="flex items-center gap-4 sm:gap-6 w-full lg:w-auto">
                  {/* Prev Button */}
                  <button
                    onClick={handlePrev}
                    disabled={filteredCars.length <= 1}
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-200 bg-white flex items-center justify-center transition-all active:scale-95 shrink-0 shadow-sm ${
                      filteredCars.length <= 1
                        ? 'opacity-30 cursor-not-allowed text-neutral-400'
                        : 'text-neutral-700 hover:text-black hover:bg-neutral-100 cursor-pointer'
                    }`}
                    aria-label="Previous car"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {/* Car Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3
                        className="text-xl sm:text-2xl font-bold text-neutral-950 truncate"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {activeCar.name}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-500 font-light mt-0.5 line-clamp-1">
                      {activeCar.tagline}
                    </p>
                  </div>

                  {/* Specifications button */}
                  <button
                    onClick={() => onOpenSpecs(activeCar)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 active:scale-95 transition-all shrink-0 cursor-pointer"
                  >
                    Specifications
                  </button>
                </div>

                {/* Right Zone: Location tag, Daily Rate & Reserve CTA */}
                <div className="flex items-center justify-between sm:justify-end gap-5 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-neutral-100">
                  {/* City Pill with +3 counter */}
                  <button
                    onClick={onOpenCitySelector}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-xs text-neutral-700 transition-colors cursor-pointer group"
                    title="Change dispatch city"
                  >
                    <MapPin size={12} className="text-neutral-500 group-hover:text-black transition-colors" />
                    <span className="font-medium">{currentCity}</span>
                    <span className="bg-neutral-200 px-1.5 py-0.2 rounded-full text-[10px] text-neutral-600 font-mono">
                      +3
                    </span>
                  </button>

                  {/* Price Indicator */}
                  <div className="text-right shrink-0">
                    <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                      Per day
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-neutral-950 leading-none mt-0.5">
                      ${activeCar.dailyRate}
                    </div>
                  </div>

                  {/* Reserve Button with Selected Color */}
                  <button
                    onClick={() => onOpenReserve(activeCar, currentColor)}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold bg-neutral-950 text-white hover:bg-neutral-800 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    Reserve
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    disabled={filteredCars.length <= 1}
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-200 bg-white flex items-center justify-center transition-all active:scale-95 shrink-0 shadow-sm ${
                      filteredCars.length <= 1
                        ? 'opacity-30 cursor-not-allowed text-neutral-400'
                        : 'text-neutral-700 hover:text-black hover:bg-neutral-100 cursor-pointer'
                    }`}
                    aria-label="Next car"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Horizontal Fleet Carousel Strip with Spring-based Layout Transitions */}
            <motion.div
              layout
              transition={{ layout: { type: 'spring', damping: 25, stiffness: 200 } }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="w-full mt-14 sm:mt-20 pt-8 border-t border-neutral-100"
            >
              <div className="flex items-center justify-between px-2 mb-4">
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">
                  Available Portfolio (0{safeIndex + 1} / 0{filteredCars.length})
                </span>
                <span className="text-xs text-neutral-500 font-mono">
                  {filteredCars.length} models match current criteria
                </span>
              </div>

              {/* Grid with layout animation on all cards */}
              <motion.div
                layout
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4"
              >
                <AnimatePresence>
                  {filteredCars.map((car, idx) => {
                    const isSelected = idx === safeIndex;
                    return (
                      <motion.button
                        layout
                        key={car.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{
                          layout: { type: 'spring', damping: 24, stiffness: 220 },
                          duration: 0.3,
                        }}
                        onClick={() => handleSelectCar(idx)}
                        className={`group relative p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-neutral-900 bg-neutral-50/90 shadow-md ring-1 ring-neutral-900/10'
                            : 'border-neutral-200 hover:border-neutral-400 bg-white hover:bg-neutral-50/50 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <div className="w-full h-14 sm:h-16 flex items-center justify-center overflow-hidden">
                          <img
                            src={car.thumbnail}
                            alt={car.name}
                            className={`w-full h-full object-contain transition-transform duration-300 ${
                              isSelected ? 'scale-105' : 'group-hover:scale-105'
                            }`}
                          />
                        </div>

                        <div className="mt-2 flex flex-col border-t border-neutral-100 pt-2">
                          <div className="text-[11px] font-bold text-neutral-950 truncate">
                            {car.name}
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-neutral-500 mt-0.5 font-mono">
                            <span>{car.specs.horsepower} HP</span>
                            <span className="font-bold text-neutral-900">${car.dailyRate}/d</span>
                          </div>
                        </div>

                        {isSelected && (
                          <motion.div
                            layoutId="fleet-active-bar"
                            className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-neutral-950 rounded-full"
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};
