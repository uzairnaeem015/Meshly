import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onShowAllSections?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onShowAllSections }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = () => {
    if (onShowAllSections) onShowAllSections();
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B1114]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8 px-6 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={handleNavClick}
          className="font-display text-xl font-bold tracking-tight text-[#F1F5F6] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00C48C]"
        >
          Meshly
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7 text-sm font-medium text-[#94A3A8]">
          <a
            href="#features"
            onClick={handleNavClick}
            className="hover:text-[#F1F5F6] hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Features
          </a>
          <a
            href="#screenshots"
            onClick={handleNavClick}
            className="hover:text-[#F1F5F6] hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Screenshots
          </a>
          <a
            href="#play-console"
            onClick={handleNavClick}
            className="hover:text-[#F1F5F6] hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Play Listing
          </a>
          <a
            href="#changelog"
            onClick={handleNavClick}
            className="hover:text-[#F1F5F6] hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Changelog
          </a>
          <a
            href="#privacy"
            onClick={handleNavClick}
            className="hover:text-[#F1F5F6] hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Privacy Policy
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#play-console"
            onClick={handleNavClick}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-[#042319] bg-[#00C48C] hover:bg-[#1AD49E] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00C48C]"
          >
            Play Store Kit
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#F1F5F6] hover:bg-white/[0.06] transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-white/[0.08] bg-[#10181C] px-6 py-4 flex flex-col gap-3 text-sm font-medium text-[#CBD5D9]"
        >
          <a href="#features" onClick={handleNavClick} className="py-2 hover:text-white">
            Features
          </a>
          <a href="#screenshots" onClick={handleNavClick} className="py-2 hover:text-white">
            Screenshots
          </a>
          <a href="#play-console" onClick={handleNavClick} className="py-2 hover:text-white">
            Play Listing
          </a>
          <a href="#changelog" onClick={handleNavClick} className="py-2 hover:text-white">
            Changelog
          </a>
          <a href="#privacy" onClick={handleNavClick} className="py-2 hover:text-white">
            Privacy Policy
          </a>
        </nav>
      )}
    </header>
  );
};
