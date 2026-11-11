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
      targetElement.scrollIntoView({ behavior: 'auto' });
      return;
    }

    const startPosition = window.pageYOffset;
    const targetOffset = targetElement.getBoundingClientRect().top;
    const distance = targetOffset;
    const duration = 650;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number): number =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateScroll = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

      if (elapsedTime < duration) {
        window.requestAnimationFrame(animateScroll);
      }
    };

    window.requestAnimationFrame(animateScroll);
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

