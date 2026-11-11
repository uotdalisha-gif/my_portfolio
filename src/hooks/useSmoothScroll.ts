import { useState, useCallback } from 'react';

export function useSmoothScroll(initialSection = 'home') {
  const [activeSection, setActiveSection] = useState<string>(initialSection);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const scrollToSection = useCallback((id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);

    const targetElement = document.getElementById(id);
    if (!targetElement) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      targetElement.scrollIntoView({ behavior: 'auto', block: 'start' });
      return;
    }

    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return {
    activeSection,
    isMobileMenuOpen,
    scrollToSection,
    toggleMobileMenu,
    closeMobileMenu
  };
}
