import React from 'react';
import { Languages, Globe2, MessageSquare, CheckCircle2 } from 'lucide-react';
import { LANGUAGES_DATA } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface LanguagesSectionProps {
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  onCursorEnter,
  onCursorLeave
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="languages"
      ref={ref}
      className="py-24 sm:py-28 bg-[#0a0a0c] text-slate-100 border-t border-white/[0.08] relative"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 border-b border-white/[0.08] pb-6 reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#60a5fa] block mb-1">
              // GLOBAL COLLABORATION &amp; PROFICIENCY
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white flex items-center gap-3">
              <Languages className="w-8 h-8 text-[#60a5fa] shrink-0" />
              <span>COMMUNICATION <span className="text-[#60a5fa]">//</span> LANGUAGES</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-xs sm:text-right">
            Verbal fluency, technical writing, and multilingual collaboration capabilities.
          </p>
        </div>

        {/* Language Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {LANGUAGES_DATA.map((lang, idx) => (
            <div
              key={lang.language}
              onMouseEnter={() => onCursorEnter?.(lang.language.toUpperCase(), 'hover')}
              onMouseLeave={onCursorLeave}
              className={`p-6 sm:p-8 rounded-2xl bg-[#141519] border border-white/[0.08] hover:border-[#60a5fa]/40 transition-all duration-300 shadow-xl flex flex-col justify-between group hover:-translate-y-1.5 reveal-base ${
                isVisible ? 'reveal-active' : ''
              }`}
              style={{ transitionDelay: `${0.15 * (idx + 1)}s` }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-[#60a5fa]/10 text-[#60a5fa] border border-[#60a5fa]/20 group-hover:scale-105 transition-transform">
                      <Globe2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                        {lang.language}
                      </h3>
                      <span className="text-xs font-mono text-[#60a5fa] font-semibold">
                        {lang.nativeName}
                      </span>
                    </div>
                  </div>

                  <span className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#60a5fa]/15 text-[#60a5fa] border border-[#60a5fa]/30 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {lang.level}
                  </span>
                </div>

                <div className="pt-2">
                  <div className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-1">
                    Proficiency
                  </div>
                  <div className="text-sm font-semibold text-slate-200">
                    {lang.proficiency}
                  </div>
                  <p className="text-xs text-slate-400 font-sans mt-3 leading-relaxed">
                    {lang.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-dashed border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Status</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Daily &amp; Professional Use
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Collaboration Banner */}
        <div
          className={`p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.35s' }}
        >
          <div className="flex items-center gap-2.5 text-slate-300">
            <MessageSquare className="w-4 h-4 text-[#60a5fa]" />
            <span>Comfortable communicating with local Cambodian engineering teams and global remote environments.</span>
          </div>
          <span className="text-[#60a5fa] font-bold shrink-0">
            Khmer (Native) + English (C1)
          </span>
        </div>
      </div>
    </section>
  );
};
