import React, { useState, useMemo } from 'react';
import { Award, ChevronRight } from 'lucide-react';
import { SkillCard } from './SkillCard';
import { SKILLS_DATA, CERTIFICATIONS_DATA } from '../data/portfolioData';
import { SkillCategory, CertificationItem } from '../types/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface SkillsSectionProps {
  onSelectCert: (cert: CertificationItem) => void;
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

const CATEGORIES: SkillCategory[] = ['ALL', 'DEVELOPMENT', 'NETWORKING', 'DESIGN', 'TOOLS'];

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  onSelectCert,
  onCursorEnter,
  onCursorLeave
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('ALL');
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const filteredSkills = useMemo(() => {
    return selectedCategory === 'ALL'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="skills"
      ref={ref}
      className="py-28 sm:py-32 bg-[#0c0c0e] text-slate-100 border-t border-white/[0.08] relative"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Heading & Category Filter */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 border-b border-white/[0.08] pb-6 reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              // TECHNICAL INVENTORY
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
              WHAT I CAN DO <span className="text-[#60a5fa]">//</span> SKILLS
            </h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                onMouseEnter={() => onCursorEnter?.(category, 'hover')}
                onMouseLeave={onCursorLeave}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#60a5fa] ${
                  selectedCategory === category
                    ? 'bg-[#60a5fa] text-black font-bold shadow-sm'
                    : 'bg-[#161616] text-slate-400 hover:text-white border border-white/[0.06] hover:border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Cards Grid with Staggered Delays */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {filteredSkills.map((skill, idx) => (
            <div
              key={skill.id}
              className={`reveal-base ${isVisible ? 'reveal-active' : ''}`}
              style={{ transitionDelay: `${0.06 * (idx + 1)}s` }}
            >
              <SkillCard
                skill={skill}
                onCursorEnter={onCursorEnter}
                onCursorLeave={onCursorLeave}
              />
            </div>
          ))}
        </div>

        {/* Certifications Block */}
        <div
          className={`mt-16 pt-10 border-t border-white/[0.08] reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.3s' }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-[#60a5fa]" />
            <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
              VERIFIED CERTIFICATIONS
            </h3>
          </div>

          {CERTIFICATIONS_DATA.length === 0 ? (
            <div className="border border-dashed border-white/10 rounded-2xl p-10 text-center bg-[#111111] flex flex-col items-center justify-center space-y-3">
              <Award className="w-10 h-10 text-slate-600 mb-1" />
              <h4 className="text-base font-display font-bold text-slate-300">No Certificates Added Yet</h4>
              <p className="text-xs font-sans text-slate-400 max-w-sm">
                Certificates and verified honors will appear here once you add them to your portfolio data.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CERTIFICATIONS_DATA.map((cert) => (
                <button
                  key={cert.id}
                  type="button"
                  onClick={() => onSelectCert(cert)}
                  onMouseEnter={() => onCursorEnter?.('CERT', 'hover')}
                  onMouseLeave={onCursorLeave}
                  className="text-left bg-[#161616] border border-white/[0.08] hover:border-white/25 p-5 rounded-2xl shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-[#60a5fa]/10 text-[#60a5fa] rounded border border-[#60a5fa]/20">
                        {cert.year}
                      </span>
                      <span className="text-xs font-mono text-slate-400 font-medium">VERIFIED</span>
                    </div>
                    <h4 className="font-bold text-sm text-white font-display tracking-tight leading-snug mt-2">
                      {cert.title}
                    </h4>
                    <p className="text-xs font-mono text-[#60a5fa] font-semibold mt-1">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-slate-300 mt-2 line-clamp-2">
                      {cert.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono font-bold text-slate-300 w-full">
                    <span>Inspect Credential</span>
                    <ChevronRight className="w-4 h-4 text-[#60a5fa]" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
