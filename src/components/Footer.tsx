import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-neutral-400 py-16 px-6 sm:px-12 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div
            className="text-2xl font-bold tracking-tighter text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            brand
          </div>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm">
            Private vehicle reserves for discerning clients across New York, London, Paris, and Dubai.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-xs">
          <a href="#overview" className="hover:text-white transition-colors">
            Overview
          </a>
          <a href="#fleet" className="hover:text-white transition-colors">
            Fleet
          </a>
          <a href="#experience" className="hover:text-white transition-colors">
            Experience
          </a>
          <a href="#stories" className="hover:text-white transition-colors">
            Stories
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
          <span className="text-neutral-700">|</span>
          <span className="text-neutral-500">
            © {new Date().getFullYear()} brand. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
