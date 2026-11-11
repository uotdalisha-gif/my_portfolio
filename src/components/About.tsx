import React from 'react';
import { FileText, ArrowRight, Languages } from 'lucide-react';
import { ScrambleText } from './ScrambleText';
import { TopographicCanvas } from './TopographicCanvas';
import { PROFILE_DATA, LANGUAGES_DATA } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface AboutProps {
  onNavigate: (id: string) => void;
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

export const About: React.FC<AboutProps> = ({
  onNavigate,
  onCursorEnter,
  onCursorLeave
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 sm:py-32 bg-[#0c0c0e] overflow-hidden border-t border-white/[0.08]"
    >
      {/* Interactive Topographic Lines */}
      <TopographicCanvas />

      <div className="container mx-auto px-6 max-w-6xl relative z-10 pointer-events-auto">
        
        {/* Section Heading */}
        <div
          className={`flex flex-col items-center mb-16 text-center reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.1s' }}
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#60a5fa] font-semibold mb-2">
            <ScrambleText text="GET TO KNOW ME" speed={25} />
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            About Me
          </h2>
          <div className="w-12 h-1 bg-[#60a5fa] rounded-full mt-3 opacity-80" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Greeting & Summary (staggered delay 0.2s) */}
          <div
            className={`md:col-span-4 bg-[#161616] p-6 sm:p-8 rounded-2xl border border-white/[0.08] shadow-xl space-y-4 reveal-base ${
              isVisible ? 'reveal-active' : ''
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <span className="text-xl sm:text-2xl font-bold text-[#60a5fa] font-mono">
              Hi, I'm
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-display">
              {PROFILE_DATA.name}
            </h3>
            <p className="text-xs font-mono text-slate-400">
              {PROFILE_DATA.headline} • UI/UX Enthusiast
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                onMouseEnter={() => onCursorEnter?.('CONTACT', 'hover')}
                onMouseLeave={onCursorLeave}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs sm:text-sm border border-white/10 hover:border-[#60a5fa] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]"
              >
                <FileText className="w-4 h-4 text-[#60a5fa]" />
                <span>Get in Touch / CV</span>
              </button>
            </div>
          </div>

          {/* Center Column: Cutout Academic Identity Card (staggered delay 0.3s) */}
          <div
            className={`md:col-span-4 flex justify-center reveal-base ${
              isVisible ? 'reveal-active' : ''
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            <div className="relative w-56 h-64 sm:w-64 sm:h-72 rounded-2xl bg-[#161616] border border-white/[0.08] p-2 flex items-center justify-center shadow-2xl">
              <div className="w-full h-full rounded-xl bg-[#0e0e11] border border-white/[0.06] flex flex-col items-center justify-center p-4 text-center overflow-hidden relative">
                <div className="w-24 h-24 rounded-full border border-white/20 p-0.5 mb-3 bg-black flex items-center justify-center overflow-hidden">
                  <img
                    src={PROFILE_DATA.avatarUrl || '/avatar.jpg'}
                    alt="Profile avatar slot"
                    loading="lazy"
                    className="w-full h-full object-cover object-top rounded-full grayscale contrast-110"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <h4 className="font-bold text-white text-sm font-display">{PROFILE_DATA.university}</h4>
                <p className="text-xs text-[#60a5fa] font-mono mt-0.5">{PROFILE_DATA.faculty}</p>
                <div className="mt-3 flex items-center gap-2 text-[10px] font-mono bg-white/5 px-3 py-1 rounded-full border border-white/10 text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {PROFILE_DATA.location}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Statement & Projects CTA (staggered delay 0.4s) */}
          <div
            className={`md:col-span-4 bg-[#161616] p-6 sm:p-8 rounded-2xl border border-white/[0.08] shadow-xl space-y-5 reveal-base ${
              isVisible ? 'reveal-active' : ''
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {PROFILE_DATA.secondaryBio}
            </p>
            <div>
              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                onMouseEnter={() => onCursorEnter?.('EXPLORE', 'hover')}
                onMouseLeave={onCursorLeave}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#60a5fa] hover:text-white transition-colors group"
              >
                <span>EXPLORE WORK DELIVERABLES</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>

        {/* Communication & Languages Card */}
        <div
          className={`mt-10 p-6 sm:p-7 rounded-2xl bg-[#141519] border border-white/[0.08] shadow-xl reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.45s' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <Languages className="w-5 h-5 text-[#60a5fa]" />
              <h3 className="font-display font-bold text-white text-base sm:text-lg tracking-tight">
                Communication &amp; Languages
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              // COLLABORATION &amp; PROFICIENCY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LANGUAGES_DATA.map((lang) => (
              <div
                key={lang.language}
                className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start justify-between gap-4 group hover:border-[#60a5fa]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-white text-base">
                      {lang.language}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      ({lang.nativeName})
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans mt-1.5 leading-relaxed">
                    {lang.description}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#60a5fa]/10 text-[#60a5fa] border border-[#60a5fa]/20 whitespace-nowrap shrink-0">
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
