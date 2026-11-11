import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  activeSection: string;
  isMobileMenuOpen: boolean;
  onNavigate: (id: string) => void;
  onToggleMobileMenu: () => void;
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  isMobileMenuOpen,
  onNavigate,
  onToggleMobileMenu,
  onCursorEnter,
  onCursorLeave
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none transition-all duration-300">
      <div className="relative pointer-events-auto w-full max-w-4xl">
        {/* Sticky Nav */}
        <nav
          aria-label="Main Navigation"
          className={`flex items-center justify-between px-3 sm:px-5 py-2.5 rounded-2xl transition-all duration-300 ${
            isScrolled
              ? 'bg-[#0f1015]/80 backdrop-blur-md border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
              : 'bg-transparent border border-white/5'
          }`}
        >
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('home')}
            onMouseEnter={() => onCursorEnter?.('DALISHA', 'hover')}
            onMouseLeave={onCursorLeave}
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-xl"
          >
            <div className="w-8 h-8 rounded-xl bg-white text-black font-serif italic text-base font-bold flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform select-none">
              D
            </div>
            <span className="text-xs sm:text-sm font-display font-bold tracking-widest uppercase text-white group-hover:text-[#60a5fa] transition-colors">
              DALISHA
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7 lg:gap-8 text-[11px] lg:text-xs font-medium tracking-wider uppercase">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                onMouseEnter={() => onCursorEnter?.(item.label, 'hover')}
                onMouseLeave={onCursorLeave}
                className={`nav-link-underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#60a5fa] py-1 ${
                  activeSection === item.id
                    ? 'text-white font-semibold active'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button with smooth rotation and icon switch */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onMouseEnter={() => onCursorEnter?.(theme === 'dark' ? 'LIGHT' : 'DARK', 'hover')}
              onMouseLeave={onCursorLeave}
              className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] overflow-hidden"
            >
              <div
                key={theme}
                className="transition-all duration-300 ease-out transform animate-[rotateTheme_0.35s_cubic-bezier(0.34,1.56,0.64,1)]"
              >
                {theme === 'dark' ? (
                  <Moon className="w-4 h-4 stroke-[2] text-slate-300 hover:text-[#60a5fa] transition-colors" />
                ) : (
                  <Sun className="w-4 h-4 stroke-[2] text-amber-500 hover:text-amber-600 transition-colors" />
                )}
              </div>
            </button>

            {/* Pill CTA: Hire Me */}
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              onMouseEnter={() => onCursorEnter?.('HIRE', 'hover')}
              onMouseLeave={onCursorLeave}
              className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-xl bg-transparent hover:bg-white/5 border border-white/20 hover:border-[#60a5fa] hover:text-[#60a5fa] text-white text-xs font-bold tracking-wide transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]"
            >
              Hire Me
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={onToggleMobileMenu}
              className="md:hidden p-1.5 text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 p-3 bg-[#0f1015]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col gap-1 text-xs font-bold tracking-wider uppercase z-50 animate-fadeIn">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2.5 text-left rounded-xl transition-all ${
                  activeSection === item.id
                    ? 'bg-white/10 text-[#60a5fa]'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
