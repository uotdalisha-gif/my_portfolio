import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface CarouselItem {
  id: string;
  title: string;
  category: string;
  description: string;
  demoUrl?: string;
  githubUrl?: string;
  accentColor: string;
  badge: string;
  previewUrl: string;
}

const CAROUSEL_PROJECTS: CarouselItem[] = [
  {
    id: 'school-management-sys',
    title: 'School Management System (SchoolAdmin)',
    category: 'Full-Stack Web Application',
    description: 'Comprehensive academic administration dashboard with real-time student tracking, multi-role portals, attendance records, and grade reporting deployed live on Vercel.',
    demoUrl: 'https://school-management-sys-inky.vercel.app/dashboard',
    githubUrl: 'https://github.com/uotdalisha-gif/School-management-sys',
    accentColor: '#3b82f6',
    badge: 'LIVE ON VERCEL',
    previewUrl: 'https://school-management-sys-inky.vercel.app/dashboard'
  },
  {
    id: 'rfid-monitoring',
    title: 'RFID-Based Student Monitoring System',
    category: 'Hardware & Web Integration',
    description: 'Automated attendance and entry security tracking through RFID scanning, real-time photo capture, and instant email alert notifications for university administrators.',
    githubUrl: 'https://github.com/uotdalisha-gif',
    accentColor: '#10b981',
    badge: 'CAPSTONE AWARD',
    previewUrl: ''
  },
  {
    id: 'enterprise-ad-dfs',
    title: 'Enterprise AD & DFS Infrastructure',
    category: 'Systems & Network Engineering',
    description: 'Multi-server enterprise environment with Active Directory Tree Domain, fault-tolerant Domain Controllers, dynamic DHCP scopes, and automated DFS file replication.',
    githubUrl: 'https://github.com/uotdalisha-gif',
    accentColor: '#8b5cf6',
    badge: 'INFRASTRUCTURE LAB',
    previewUrl: ''
  },
  {
    id: 'retail-pos',
    title: 'Modern Retail POS & Inventory Platform',
    category: 'Web & Database Architecture',
    description: 'Point-of-sale platform featuring instant barcode scanning, inventory low-stock triggers, sales analytics dashboards, and thermal printable receipt generation.',
    githubUrl: 'https://github.com/uotdalisha-gif',
    accentColor: '#f59e0b',
    badge: 'FULL-STACK SQL',
    previewUrl: ''
  },
  {
    id: 'network-troubleshooter',
    title: 'Network & System Diagnostic Utility',
    category: 'Automation & System Tools',
    description: 'Automated Tier-1 network inspection suite that validates gateway routes, tests Domain Controller authentication, and generates diagnostic log benchmarks.',
    githubUrl: 'https://github.com/uotdalisha-gif',
    accentColor: '#ec4899',
    badge: 'PYTHON TOOLKIT',
    previewUrl: ''
  }
];

interface PortfolioSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onSelectCert?: (cert: any) => void;
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onSelectProject,
  onCursorEnter,
  onCursorLeave
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number>(0);
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const total = CAROUSEL_PROJECTS.length;

  // Auto-rotation every 3 seconds unless hovered/paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) handleNext();
    else if (diff < -40) handlePrev();
  };

  // Helper to determine position relative to active index (-2, -1, 0, 1, 2)
  const getOffset = (index: number) => {
    let diff = (index - activeIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const activeProject = CAROUSEL_PROJECTS[activeIndex];

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-24 sm:py-32 bg-[#0d0d0d] text-slate-100 border-t border-white/[0.08] relative overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Flowing Wave Lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 600">
          <path
            d="M0,160 C320,300 420,0 720,160 C1020,320 1200,80 1440,200"
            fill="none"
            stroke="white"
            strokeWidth="2"
            className="animate-[blobMove_12s_ease-in-out_infinite_alternate]"
          />
          <path
            d="M0,320 C240,180 500,420 800,260 C1100,100 1300,340 1440,240"
            fill="none"
            stroke="white"
            strokeWidth="2"
            className="animate-[blobMove_16s_ease-in-out_4s_infinite_alternate]"
          />
        </svg>
      </div>

      {/* Radial soft glow behind the center card */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#60a5fa] pointer-events-none blur-[120px]"
        style={{ width: '45vw', height: '45vw', maxWidth: '500px', maxHeight: '500px', opacity: 0.08 }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Header matching screenshot */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div>
            <span
              className="text-xs font-mono font-bold uppercase block text-slate-400 mb-2"
              style={{ letterSpacing: '0.3em' }}
            >
              SELECTED WORK
            </span>
            <div className="flex items-center gap-2">
              <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white leading-tight">
                Work Gallery
              </h2>
              <span className="text-[#60a5fa] font-mono text-3xl sm:text-5xl animate-pulse">|</span>
            </div>
            <p className="text-slate-400 text-sm sm:text-base font-normal mt-2 max-w-xl">
              A collection of systems, digital projects, and technical work I've built.
            </p>
          </div>

          <a
            href={activeProject.demoUrl || activeProject.githubUrl || 'https://github.com/uotdalisha-gif'}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => onCursorEnter?.('EXTERNAL', 'hover')}
            onMouseLeave={onCursorLeave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-slate-200 text-black font-semibold text-xs sm:text-sm shadow-md transition-all duration-300 hover:scale-105 active:scale-95 self-start md:self-auto"
          >
            <span>View More Projects</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* 3D Carousel Stage */}
        <div
          className="relative h-[280px] sm:h-[360px] md:h-[400px] w-full flex items-center justify-center my-6"
          style={{ perspective: '1200px' }}
        >
          {CAROUSEL_PROJECTS.map((item, idx) => {
            const offset = getOffset(idx);
            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isFarLeft = offset === -2 || offset < -2;
            const isFarRight = offset === 2 || offset > 2;

            // Only display 5 cards at a time
            if (Math.abs(offset) > 2) return null;

            let scale = 1;
            let rotateY = 0;
            let translateX = 0;
            let translateZ = 0;
            let opacity = 1;
            let zIndex = 30;

            if (isCenter) {
              scale = 1;
              rotateY = 0;
              translateX = 0;
              translateZ = 0;
              opacity = 1;
              zIndex = 30;
            } else if (isLeft) {
              scale = 0.76;
              rotateY = 24;
              translateX = -170;
              translateZ = -90;
              opacity = 0.65;
              zIndex = 20;
            } else if (isRight) {
              scale = 0.76;
              rotateY = -24;
              translateX = 170;
              translateZ = -90;
              opacity = 0.65;
              zIndex = 20;
            } else if (isFarLeft) {
              scale = 0.58;
              rotateY = 38;
              translateX = -300;
              translateZ = -170;
              opacity = 0.35;
              zIndex = 10;
            } else if (isFarRight) {
              scale = 0.58;
              rotateY = -38;
              translateX = 300;
              translateZ = -170;
              opacity = 0.35;
              zIndex = 10;
            }

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!isCenter) setActiveIndex(idx);
                  else {
                    onSelectProject({
                      id: item.id,
                      title: item.title,
                      tagline: item.category,
                      category: item.category,
                      description: item.description,
                      fullDescription: item.description,
                      tags: ['React', 'TypeScript', 'Tailwind', 'Vercel'],
                      metrics: item.badge,
                      accentColor: item.accentColor,
                      demoUrl: item.demoUrl,
                      githubUrl: item.githubUrl
                    });
                  }
                }}
                className={`absolute w-[280px] sm:w-[380px] md:w-[460px] h-[190px] sm:h-[250px] md:h-[280px] rounded-2xl cursor-pointer transition-all duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
                  isCenter ? 'shadow-2xl shadow-blue-500/10' : 'hover:opacity-90'
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                }}
              >
                {/* Card Container */}
                <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1b1c24] to-[#0c0d12] flex flex-col justify-between p-5 sm:p-7 relative shadow-lg">
                  {/* Subtle Dark Overlay on side cards */}
                  {!isCenter && <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none" />}

                  {/* Mock Window Top Bar */}
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white font-semibold">
                      {item.badge}
                    </span>
                  </div>

                  {/* Card Center Visual Mockup */}
                  <div className="my-auto z-10 text-center space-y-1">
                    <span className="text-[11px] font-mono text-[#60a5fa] font-bold uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-display text-white tracking-tight line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 z-10 border-t border-white/5 pt-2">
                    <span className="truncate max-w-[150px]">{item.id}.local</span>
                    <span className="text-[#60a5fa] font-bold">Inspect →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Project Information Below Carousel */}
        <div className="mt-8 text-center flex flex-col items-center justify-center space-y-3 min-h-[140px]">
          <div className="transition-all duration-300 ease-out" key={activeProject.id}>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
              {activeProject.title}
            </h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-2 font-normal">
              {activeProject.description}
            </p>
            <div className="mt-4">
              <a
                href={activeProject.demoUrl || activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => onCursorEnter?.('EXPLORE', 'hover')}
                onMouseLeave={onCursorLeave}
                className="text-white hover:text-[#60a5fa] underline underline-offset-8 text-sm font-semibold tracking-widest uppercase transition-colors"
              >
                View Project →
              </a>
            </div>
          </div>
        </div>

        {/* Carousel Arrow Controls & Dots */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Project"
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-all active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {CAROUSEL_PROJECTS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIndex
                    ? 'w-7 h-2 bg-white'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Project"
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-all active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
