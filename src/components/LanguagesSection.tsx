import React from 'react';
import { Languages, CheckCircle2, MessageSquare } from 'lucide-react';
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

  const getLanguagePills = (langName: string) => {
    if (langName === 'Khmer') {
      return ['Native Fluency', 'Academic Writing', 'Daily Team Sync'];
    }
    return ['Technical Docs', 'Client Correspondence', 'Presentations'];
  };

  return (
    <section
      id="languages"
      ref={ref}
      className="py-14 sm:py-18 bg-[#0a0a0c] text-slate-100 border-t border-white/[0.08] relative"
    >
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Compact Section Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3 border-b border-white/[0.08] pb-4 reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              // COMMUNICATION &amp; FLUENCY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-display text-white flex items-center gap-2.5">
              <Languages className="w-5 h-5 sm:w-6 sm:h-6 text-[#60a5fa] shrink-0" />
              <span>Languages <span className="text-[#60a5fa]">//</span> Proficiency</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 sm:text-right max-w-xs">
            Bilingual fluency for local engineering and international collaboration.
          </p>
        </div>

        {/* Compact Language Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LANGUAGES_DATA.map((lang, idx) => {
            const isKhmer = lang.language === 'Khmer';
            const pills = getLanguagePills(lang.language);

            return (
              <div
                key={lang.language}
                onMouseEnter={() => onCursorEnter?.(lang.language.toUpperCase(), 'hover')}
                onMouseLeave={onCursorLeave}
                className={`p-5 rounded-2xl bg-[#121316] border border-white/[0.08] hover:border-[#60a5fa]/40 transition-all duration-300 shadow-md flex flex-col justify-between group hover:-translate-y-1 reveal-base ${
                  isVisible ? 'reveal-active' : ''
                }`}
                style={{ transitionDelay: `${0.12 * (idx + 1)}s` }}
              >
                <div>
                  {/* Card Header: Language, Native Script, Level Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-tight">
                        {lang.language}
                      </h3>
                      <span className="text-xs font-mono text-[#60a5fa]">
                        {lang.nativeName}
                      </span>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold flex items-center gap-1.5 border shadow-sm ${
                        isKhmer
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-[#60a5fa]/10 text-[#60a5fa] border-[#60a5fa]/20'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {lang.level}
                    </span>
                  </div>

                  {/* Proficiency summary & description */}
                  <div className="text-xs font-mono font-semibold text-slate-300 mb-1.5">
                    {lang.proficiency}
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {lang.description}
                  </p>
                </div>

                {/* Subtle Pills */}
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                  {pills.map((pill) => (
                    <span
                      key={pill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-slate-400"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimal Footnote Note */}
        <div
          className={`mt-4 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center gap-2 text-xs font-mono text-slate-400 text-center reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.25s' }}
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#60a5fa] shrink-0" />
          <span>Comfortable collaborating with local Cambodian teams and global remote environments.</span>
        </div>
      </div>
    </section>
  );
};
