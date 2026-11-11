import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { ScrambleText } from './ScrambleText';
import { LanyardCard } from './LanyardCard';
import { PROFILE_DATA, FEATURED_TECH } from '../data/portfolioData';

interface HeroProps {
  onNavigate: (id: string) => void;
  onCursorEnter?: (text: string, variant?: 'hover' | 'drag') => void;
  onCursorLeave?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  onCursorEnter,
  onCursorLeave
}) => {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Soft ambient radial glows — large, slow-drifting, 5–8% opacity */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/5 rounded-full bg-[#60a5fa] blur-[160px] animate-blob"
          style={{ width: '60vw', height: '60vh', opacity: 0.06 }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 rounded-full bg-[#818cf8] blur-[180px] animate-blob-delayed"
          style={{ width: '45vw', height: '45vh', opacity: 0.05 }}
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text with Staggered Entrance Delays */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Status Pill - Instant fade-in */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161616] border border-white/10 shadow-sm transition-all duration-700 ease-out"
              style={{ transitionDelay: '0.1s' }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" aria-hidden="true" />
              <span className="text-xs font-mono font-medium tracking-wide text-slate-300">
                AVAILABLE FOR OPPORTUNITIES
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#60a5fa]/20 text-[#60a5fa] uppercase font-bold">
                BBU
              </span>
            </div>

            {/* Large Bold Heading: font size clamp(2.5rem, 6vw, 5rem) */}
            <div
              className="space-y-1 transition-all duration-700 ease-out"
              style={{ transitionDelay: '0.1s' }}
            >
              <h1 className="text-white font-bold tracking-tight font-display leading-[1.05] text-[clamp(3rem,7vw,6rem)]" style={{ letterSpacing: '-0.02em' }}>
                <ScrambleText text={PROFILE_DATA.name} className="text-white" speed={30} />
              </h1>
              <h2 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-bold text-slate-400 tracking-tight font-display">
                IT Specialist <span className="text-[#60a5fa]">&amp;</span> Developer
              </h2>
            </div>

            {/* Subtitle text fades in with 0.3s delay */}
            <div
              className="space-y-3 transition-all duration-700 ease-out"
              style={{ transitionDelay: '0.3s' }}
            >
              <p className="font-mono text-xs sm:text-sm text-[#60a5fa] font-medium tracking-wide">
                &lt;<ScrambleText text={PROFILE_DATA.subheadline} speed={15} /> /&gt;
              </p>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
                {PROFILE_DATA.bio}
              </p>
            </div>

            {/* Tech Stack Badges */}
            <div
              className="flex flex-wrap items-center gap-2 pt-1 transition-all duration-700 ease-out"
              style={{ transitionDelay: '0.4s' }}
            >
              {FEATURED_TECH.map((tech) => (
                <span
                  key={tech}
                  onMouseEnter={() => onCursorEnter?.(tech, 'hover')}
                  onMouseLeave={onCursorLeave}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-[#161616] border border-white/10 text-slate-300 hover:border-[#60a5fa] hover:text-white transition-all cursor-default"
                >
                  #{tech}
                </span>
              ))}
            </div>

            {/* CTA Buttons fade in last (0.5s delay) */}
            <div
              className="flex flex-wrap items-center gap-4 pt-4 transition-all duration-700 ease-out"
              style={{ transitionDelay: '0.5s' }}
            >
              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                onMouseEnter={() => onCursorEnter?.('PROJECTS', 'hover')}
                onMouseLeave={onCursorLeave}
                className="px-7 py-3 rounded-xl bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>View Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                onMouseEnter={() => onCursorEnter?.('CONTACT', 'hover')}
                onMouseLeave={onCursorLeave}
                className="px-6 py-3 rounded-xl bg-[#161616] hover:bg-[#202020] text-white font-medium text-sm flex items-center gap-2 border border-white/10 hover:border-white/30 transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span>Get in Touch</span>
              </button>
            </div>

          </div>

          {/* Right Column: Lanyard Card physics */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <LanyardCard
              onCursorEnter={onCursorEnter}
              onCursorLeave={onCursorLeave}
            />
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="mt-16 sm:mt-20 flex justify-between items-center text-xs font-mono text-slate-400 border-t border-white/10 pt-6">
          <button
            onClick={() => onNavigate('about')}
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#60a5fa] group-hover:translate-y-0.5 transition-transform" />
            <span>explore portfolio &amp; background</span>
          </button>
          <span>based in Battambang, Cambodia</span>
        </div>
      </div>
    </section>
  );
};
