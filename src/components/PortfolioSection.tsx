import React from 'react';
import { ProjectCard } from './ProjectCard';
import { PROJECTS_DATA } from '../data/portfolioData';
import { ProjectItem } from '../types/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface PortfolioSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onSelectProject,
  onCursorEnter,
  onCursorLeave
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-28 sm:py-32 bg-[#0a0a0a] text-slate-100 border-t border-white/[0.08]"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 border-b border-white/[0.08] pb-6 reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
              // PRODUCTION WORKS &amp; CASE STUDIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
              PORTFOLIO <span className="text-[#60a5fa]">//</span> PROJECTS
            </h2>
          </div>
          <span className="text-xs font-mono text-[#60a5fa] font-bold px-3 py-1 bg-[#60a5fa]/10 rounded-lg border border-[#60a5fa]/20">
            01 Live Production Project
          </span>
        </div>

        {/* Project Card Display */}
        <div
          className={
            PROJECTS_DATA.length === 1
              ? 'max-w-3xl mx-auto'
              : 'grid grid-cols-1 md:grid-cols-2 gap-8'
          }
        >
          {PROJECTS_DATA.map((project, idx) => (
            <div
              key={project.id}
              className={`reveal-base ${isVisible ? 'reveal-active' : ''}`}
              style={{ transitionDelay: `${0.15 * (idx + 1)}s` }}
            >
              <ProjectCard
                project={project}
                onSelect={onSelectProject}
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
