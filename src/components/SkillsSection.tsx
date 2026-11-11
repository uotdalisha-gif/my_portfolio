import React, { useState, useMemo } from 'react';
import { SkillCard } from './SkillCard';
import { SKILLS_DATA } from '../data/portfolioData';
import { SkillCategory } from '../types/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface SkillsSectionProps {
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

const CATEGORIES: SkillCategory[] = ['ALL', 'DEVELOPMENT', 'NETWORKING', 'DESIGN', 'TOOLS'];

export const SkillsSection: React.FC<SkillsSectionProps> = ({
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
      </div>
    </section>
  );
};

