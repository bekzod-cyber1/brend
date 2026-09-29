/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PhilosophySection } from './components/PhilosophySection';
import { FleetShowcase } from './components/FleetShowcase';
import { ExperienceSection } from './components/ExperienceSection';
import { ClientStoriesSection } from './components/ClientStoriesSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SpecificationsModal } from './components/SpecificationsModal';
import { ReservationModal } from './components/ReservationModal';
import { CitySelectorModal } from './components/CitySelectorModal';
import { FLEET_CARS } from './data/fleetData';
import { Car, CarColor } from './types/fleet';

export default function App() {
  const [currentCity, setCurrentCity] = useState<string>('New York');
  const [activeSection, setActiveSection] = useState<string>('overview');

  // Modals state
  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);
  const [isSpecsModalOpen, setIsSpecsModalOpen] = useState<boolean>(false);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState<boolean>(false);

  const [selectedCarForSpecs, setSelectedCarForSpecs] = useState<Car | null>(FLEET_CARS[0]);
  const [selectedCarForReserve, setSelectedCarForReserve] = useState<Car | null>(FLEET_CARS[0]);
  const [selectedColorForReserve, setSelectedColorForReserve] = useState<CarColor | null>(null);

  // Section observer to update active nav link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'fleet', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenSpecs = (car: Car) => {
    setSelectedCarForSpecs(car);
    setIsSpecsModalOpen(true);
  };

  const handleOpenReserve = (car?: Car, color?: CarColor) => {
    const targetCar = car || selectedCarForReserve || FLEET_CARS[0];
    setSelectedCarForReserve(targetCar);
    setSelectedColorForReserve(color || targetCar.availableColors[0]);
    setIsReserveModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-900 selection:bg-neutral-800 selection:text-white relative">
      {/* Animated Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Dynamic Top Bar Navigation */}
      <Navbar
        onOpenReserve={() => handleOpenReserve()}
        activeSection={activeSection}
      />

      {/* Hero Section (Dark Luxury with dynamic flagship showcase & Bold Titles) */}
      <HeroSection
        currentCity={currentCity}
        onOpenCitySelector={() => setIsCityModalOpen(true)}
        onOpenReserve={() => handleOpenReserve(FLEET_CARS[0])}
      />

      {/* Philosophy Section (Crisp White with Taillight Detail & Viewport Animations) */}
      <PhilosophySection
        onOpenReserve={() => handleOpenReserve(FLEET_CARS[0])}
      />

      {/* Fleet Showcase (Interactive Horizon Carousel with real-time color switcher) */}
      <FleetShowcase
        currentCity={currentCity}
        onOpenCitySelector={() => setIsCityModalOpen(true)}
        onOpenSpecs={handleOpenSpecs}
        onOpenReserve={handleOpenReserve}
      />

      {/* Experience & Concierge Standards (Dark Minimalist Luxury) */}
      <ExperienceSection
        onOpenReserve={() => handleOpenReserve()}
      />

      {/* Client Stories & Testimonials Carousel */}
      <ClientStoriesSection />

      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Contact & Private Desk (Direct Line & Bespoke Booking Inquiries) */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Specifications Sheet Modal */}
      <SpecificationsModal
        car={selectedCarForSpecs}
        isOpen={isSpecsModalOpen}
        onClose={() => setIsSpecsModalOpen(false)}
        onReserve={(car) => handleOpenReserve(car)}
      />

      {/* City Switcher Modal */}
      <CitySelectorModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={currentCity}
        onSelectCity={(city) => setCurrentCity(city)}
      />

      {/* Instant Reservation Modal with Live Cost Breakdown & Chosen Color */}
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        selectedCar={selectedCarForReserve}
        selectedCity={currentCity}
        selectedColor={selectedColorForReserve}
      />
    </div>
  );
}
