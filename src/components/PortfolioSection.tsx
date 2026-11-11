import React from 'react';
import { Award, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { PROJECTS_DATA, CERTIFICATIONS_DATA } from '../data/portfolioData';
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

        {/* Verified Academic & Professional Certifications (Directly Under Project) */}
        <div
          className={`mt-20 pt-16 border-t border-white/[0.08] reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.25s' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#60a5fa] block mb-1">
                // VERIFIED HONORS &amp; QUALIFICATIONS
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-[#60a5fa]" />
                <span>Academic Certifications &amp; Credentials</span>
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              04 Verified Academic Milestones
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {CERTIFICATIONS_DATA.map((cert) => (
              <div
                key={cert.id}
                onMouseEnter={() => onCursorEnter?.('CERT', 'hover')}
                onMouseLeave={onCursorLeave}
                className="p-6 rounded-2xl bg-[#141519] border border-white/[0.08] hover:border-[#60a5fa]/40 transition-all duration-300 shadow-xl flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold bg-[#60a5fa]/10 text-[#60a5fa] border border-[#60a5fa]/20 px-2.5 py-0.5 rounded-md">
                      {cert.year}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {cert.badge}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#60a5fa] transition-colors leading-snug">
                    {cert.title}
                  </h4>

                  <p className="text-xs font-mono text-[#60a5fa] font-semibold mt-1">
                    {cert.issuer}
                  </p>

                  <p className="text-xs text-slate-300 font-sans mt-2.5 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-dashed border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Credential Status</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Milestone
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
