import React from 'react';
import { TechIcon } from './TechIcon';
import { useScrollReveal } from '../hooks/useScrollReveal';

const TECH_ITEMS = [
  { name: 'HTML5', key: 'html5', label: 'HTML5' },
  { name: 'CSS3', key: 'css3', label: 'CSS3' },
  { name: 'JavaScript', key: 'javascript', label: 'JavaScript' },
  { name: 'React', key: 'react', label: 'React.js' },
  { name: 'Python', key: 'python', label: 'Python' },
  { name: 'PHP', key: 'php', label: 'PHP & MySQL' },
  { name: 'Tailwind', key: 'tailwind', label: 'Tailwind CSS' },
  { name: 'Figma', key: 'figma', label: 'Figma Design' },
  { name: 'Active Directory', key: 'active directory', label: 'Active Directory' },
  { name: 'Git', key: 'git', label: 'Git & GitHub' },
  { name: 'Notion', key: 'notion', label: 'Notion Workflow' },
  { name: 'Google', key: 'google', label: 'AI & Cloud' },
];

interface SkillsSectionProps {
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  onCursorEnter,
  onCursorLeave,
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 sm:py-32 bg-[#0a0a0a] text-slate-100 border-t border-white/[0.08] relative overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading and Narrative (Clean minimalist matching screenshot) */}
          <div
            className={`md:col-span-6 space-y-5 reveal-base ${
              isVisible ? 'reveal-active' : ''
            }`}
            style={{ transitionDelay: '0.1s' }}
          >
            <div className="flex items-center gap-2">
              <h2 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight">
                What I Can Do
              </h2>
              <span className="w-1 h-9 bg-white/80 rounded-full inline-block ml-1 animate-pulse" />
            </div>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-normal max-w-md">
              I combine technical, problem-solving, and digital skills to build reliable systems, test systems, manage data, and support efficient digital workflows.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-slate-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
              <span>Continuously expanding modern stack &amp; architectures</span>
            </div>
          </div>

          {/* Right Column: Sleek 4-column App Icon Grid matching screenshot */}
          <div
            className={`md:col-span-6 flex justify-center md:justify-end reveal-base ${
              isVisible ? 'reveal-active' : ''
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="grid grid-cols-4 gap-3.5 sm:gap-4 p-4 sm:p-6 bg-[#111114]/80 rounded-3xl border border-white/[0.06] backdrop-blur-md shadow-2xl">
              {TECH_ITEMS.map((item) => (
                <div
                  key={item.key}
                  onMouseEnter={() => onCursorEnter?.(item.label, 'hover')}
                  onMouseLeave={onCursorLeave}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#1e2025] hover:bg-[#282b32] border border-white/5 hover:border-white/20 flex flex-col items-center justify-center p-2.5 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-md cursor-pointer group relative"
                  title={item.label}
                >
                  <TechIcon name={item.key} className="w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:scale-105" />
                  
                  {/* Tooltip on hover */}
                  <span className="absolute -bottom-8 bg-[#0f1015] text-[10px] font-mono text-white px-2 py-0.5 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30 shadow-lg">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
