import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenReserve: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReserve, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setScrolled(scrollPos > 40);

      // Check whether we are currently over light sections (Philosophy & Fleet are light)
      const philosophyEl = document.getElementById('experience');
      const contactEl = document.getElementById('contact');
      
      if (philosophyEl) {
        const philTop = philosophyEl.offsetTop - 80;
        const contactTop = contactEl ? contactEl.offsetTop - 80 : 999999;
        
        if (scrollPos >= philTop && scrollPos < contactTop) {
          setIsLightSection(true);
        } else {
          setIsLightSection(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? isLightSection
            ? 'bg-white/80 backdrop-blur-md border-b border-black/5 py-4 text-black'
            : 'bg-black/75 backdrop-blur-md border-b border-white/10 py-4 text-white'
          : 'bg-transparent py-6 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <a
          href="#overview"
          className={`text-xl font-bold tracking-tighter transition-colors select-none ${
            isLightSection ? 'text-black' : 'text-white'
          }`}
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          brand
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.name.toLowerCase();
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  isLightSection
                    ? isActive
                      ? 'text-black font-semibold'
                      : 'text-neutral-500 hover:text-black'
                    : isActive
                    ? 'text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Reserve CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenReserve}
            className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 active:scale-95 shadow-sm ${
              isLightSection
                ? 'bg-black text-white hover:bg-neutral-800'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            Reserve
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-1.5 rounded-lg transition-colors ${
              isLightSection ? 'text-black hover:bg-black/5' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden px-6 py-6 border-b transition-all ${
            isLightSection
              ? 'bg-white text-black border-black/10'
              : 'bg-neutral-950 text-white border-white/10'
          }`}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium py-1.5 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowUpRight size={16} className="opacity-40" />
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReserve();
              }}
              className="mt-3 w-full py-3 rounded-full text-center text-sm font-semibold bg-white text-black hover:bg-neutral-200 active:scale-95 transition-all"
            >
              Reserve Vehicle
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
