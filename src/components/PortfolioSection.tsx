import React, { useState, useEffect, useRef } from 'react';
import { Award, Sparkles, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { PROJECTS_DATA, CERTIFICATIONS_DATA, AWARDS_DATA } from '../data/portfolioData';
import { PortfolioTab, ProjectItem, CertificationItem } from '../types/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface PortfolioSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onSelectCert: (cert: CertificationItem) => void;
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

const TABS: { id: PortfolioTab; label: string }[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'awards', label: 'Awards' }
];

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onSelectProject,
  onSelectCert,
  onCursorEnter,
  onCursorLeave
}) => {
  const [activeTab, setActiveTab] = useState<PortfolioTab>('projects');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);
  const touchStartX = useRef<number>(0);
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const total = PROJECTS_DATA.length;

  // Auto rotation every 3500ms
  useEffect(() => {
    if (activeTab !== 'projects') return;
    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prev) => (prev + 1) % total);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, total, activeTab]);

  // Brief fade on info change
  useEffect(() => {
    setInfoVisible(false);
    const timer = setTimeout(() => {
      setInfoVisible(true);
    }, 150);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    if (deltaX > 50) {
      setActiveIndex((prev) => (prev + 1) % total);
    } else if (deltaX < -50) {
      setActiveIndex((prev) => (prev - 1 + total) % total);
    }
  };

  const activeProject = PROJECTS_DATA[activeIndex];

  // Helper to get offset relative to active card (-2, -1, 0, 1, 2)
  const getOffset = (idx: number) => {
    let diff = (idx - activeIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-28 sm:py-32 bg-[#0a0a0a] text-slate-100 border-t border-white/[0.08] relative overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Header & Tabs */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-white/[0.08] pb-6 reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              // SHOWCASE &amp; DELIVERABLES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
              Portfolio
            </h2>
          </div>

          <div className="inline-flex p-1 bg-[#161616] border border-white/[0.08] rounded-xl shadow-inner">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                onMouseEnter={() => onCursorEnter?.(tab.label, 'hover')}
                onMouseLeave={onCursorLeave}
                className={`px-4 py-2 text-xs sm:text-sm font-sans font-semibold rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] ${
                  activeTab === tab.id
                    ? 'bg-[#60a5fa] text-black shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: 3D Rotating Carousel */}
        {activeTab === 'projects' && (
          <div
            className="w-full select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* 3D Carousel Stage */}
            <div
              className="relative h-[280px] md:h-[420px] w-full flex items-center justify-center my-4 overflow-visible"
              style={{ perspective: '1200px' }}
            >
              {PROJECTS_DATA.map((project, idx) => {
                const offset = getOffset(idx);
                const isCenter = offset === 0;
                const isLeft1 = offset === -1;
                const isRight1 = offset === 1;
                const isLeft2 = offset === -2;
                const isRight2 = offset === 2;

                // Hidden cards beyond 5
                if (Math.abs(offset) > 2) return null;

                let transform = '';
                let opacity = 0;
                let zIndex = 10;
                let hiddenOnMobile = false;

                if (isCenter) {
                  transform = 'scale(1) translateZ(0px) translateX(0px) rotateY(0deg)';
                  opacity = 1;
                  zIndex = 30;
                } else if (isLeft1) {
                  transform = 'scale(0.78) translateZ(-80px) translateX(-38%) rotateY(22deg)';
                  opacity = 0.65;
                  zIndex = 20;
                } else if (isRight1) {
                  transform = 'scale(0.78) translateZ(-80px) translateX(38%) rotateY(-22deg)';
                  opacity = 0.65;
                  zIndex = 20;
                } else if (isLeft2) {
                  transform = 'scale(0.58) translateZ(-160px) translateX(-65%) rotateY(38deg)';
                  opacity = 0.35;
                  zIndex = 10;
                  hiddenOnMobile = true;
                } else if (isRight2) {
                  transform = 'scale(0.58) translateZ(-160px) translateX(65%) rotateY(-38deg)';
                  opacity = 0.35;
                  zIndex = 10;
                  hiddenOnMobile = true;
                }

                return (
                  <div
                    key={project.id}
                    onClick={() => {
                      if (!isCenter) {
                        setActiveIndex(idx);
                      } else {
                        onSelectProject(project);
                      }
                    }}
                    className={`absolute w-[280px] sm:w-[380px] md:w-[460px] h-[190px] sm:h-[240px] md:h-[280px] rounded-2xl cursor-pointer ${
                      hiddenOnMobile ? 'hidden md:block' : 'block'
                    } ${isCenter ? 'shadow-2xl shadow-blue-500/15' : 'hover:opacity-90'}`}
                    style={{
                      transform,
                      opacity,
                      zIndex,
                      position: 'absolute',
                      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      transformStyle: 'preserve-3d',
                      willChange: 'transform, opacity',
                    }}
                  >
                    {/* Card Body */}
                    <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1c1d24] via-[#14151b] to-[#0c0d12] flex flex-col justify-between p-5 sm:p-6 relative shadow-xl">
                      {/* Dark overlay on side cards */}
                      {!isCenter && (
                        <div className="absolute inset-0 bg-black/45 z-20 pointer-events-none rounded-2xl" />
                      )}

                      {/* Mockup Browser Window Header */}
                      <div className="flex items-center justify-between z-10 font-mono text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                          <span className="ml-2 text-slate-400 text-[11px] truncate max-w-[120px] sm:max-w-[160px]">
                            {project.id}.local
                          </span>
                        </div>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#60a5fa]/15 text-[#60a5fa] font-bold border border-[#60a5fa]/25">
                          {project.category.split('&')[0]}
                        </span>
                      </div>

                      {/* Center Card Title Showcase */}
                      <div className="my-auto z-10 text-center space-y-1.5 px-2">
                        <span className="text-[10px] sm:text-[11px] font-mono text-[#60a5fa] font-bold uppercase tracking-wider block">
                          FEATURED WORK
                        </span>
                        <h3 className="text-base sm:text-xl md:text-2xl font-bold font-display text-white tracking-tight line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono line-clamp-1">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Tags & Action Footer */}
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 z-10 border-t border-white/[0.06] pt-2.5">
                        <div className="flex items-center gap-1 overflow-hidden">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-black/50 border border-white/10 text-slate-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-[#60a5fa] font-semibold text-[11px] flex items-center gap-1">
                          Details →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Project Details Below Carousel */}
            <div
              className={`text-center mt-8 transition-opacity duration-300 ease-out ${
                infoVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <h3 className="text-2xl font-bold text-white text-center font-display tracking-tight">
                {activeProject.title}
              </h3>
              <p className="text-slate-400 text-sm text-center max-w-2xl mx-auto mt-2 leading-relaxed">
                {activeProject.description}
              </p>
              <div className="mt-4 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => onSelectProject(activeProject)}
                  onMouseEnter={() => onCursorEnter?.('DETAILS', 'hover')}
                  onMouseLeave={onCursorLeave}
                  className="text-white hover:text-[#60a5fa] underline underline-offset-8 text-sm font-semibold tracking-wider transition-colors inline-flex items-center gap-1.5"
                >
                  <span>View Project →</span>
                </button>

                {activeProject.demoUrl && (
                  <a
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => onCursorEnter?.('LIVE', 'hover')}
                    onMouseLeave={onCursorLeave}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                    title="Open Live Deployment"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Controls: Prev / Dots / Next */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={() => setActiveIndex((prev) => (prev - 1 + total) % total)}
                aria-label="Previous Project"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {PROJECTS_DATA.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      i === activeIndex
                        ? 'w-6 h-1.5 bg-[#60a5fa]'
                        : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setActiveIndex((prev) => (prev + 1) % total)}
                aria-label="Next Project"
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Certificates Grid */}
        {activeTab === 'certificates' && (
          <div>
            {CERTIFICATIONS_DATA.length === 0 ? (
              <div className="border border-dashed border-white/10 rounded-2xl p-12 text-center bg-[#111111] flex flex-col items-center justify-center space-y-3">
                <Award className="w-12 h-12 text-slate-500 mb-2" />
                <h3 className="text-lg font-display font-bold text-slate-200">No Certificates Added Yet</h3>
                <p className="text-sm font-sans text-slate-400 max-w-md">
                  Your certificate repository is empty and ready for your verified credentials.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CERTIFICATIONS_DATA.map((cert, idx) => (
                  <div
                    key={cert.id}
                    onClick={() => onSelectCert(cert)}
                    className={`bg-[#161616] border border-white/[0.08] hover:border-white/25 p-6 rounded-2xl shadow-lg space-y-4 cursor-pointer hover:-translate-y-1.5 transition-all duration-300 reveal-base ${
                      isVisible ? 'reveal-active' : ''
                    }`}
                    style={{ transitionDelay: `${0.1 * (idx + 1)}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold bg-[#60a5fa]/10 text-[#60a5fa] border border-[#60a5fa]/20 px-2.5 py-0.5 rounded">
                        {cert.year}
                      </span>
                      <Award className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white font-display">{cert.title}</h3>
                    <p className="text-xs font-mono text-[#60a5fa] font-semibold">{cert.issuer}</p>
                    <p className="text-sm text-slate-300 font-normal">{cert.description}</p>
                    <div className="pt-3 border-t border-white/[0.06]">
                      <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">
                        Badge: {cert.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Awards Grid */}
        {activeTab === 'awards' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AWARDS_DATA.map((award, idx) => (
              <div
                key={award.id}
                className={`bg-[#161616] border border-white/[0.08] p-6 rounded-2xl shadow-lg space-y-3 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 reveal-base ${
                  isVisible ? 'reveal-active' : ''
                }`}
                style={{ transitionDelay: `${0.1 * (idx + 1)}s` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/20 px-2.5 py-0.5 rounded">
                    {award.date}
                  </span>
                  <Sparkles className="w-5 h-5 text-[#60a5fa]" />
                </div>
                <h3 className="text-lg font-bold text-white font-display leading-snug">{award.title}</h3>
                <p className="text-xs font-mono text-slate-400 font-bold">{award.event}</p>
                <p className="text-sm text-slate-300 font-normal">{award.description}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
