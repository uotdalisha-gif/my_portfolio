import React, { useState } from 'react';
import { Award, Sparkles } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
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
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-28 sm:py-32 bg-[#0a0a0a] text-slate-100 border-t border-white/[0.08]"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        
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

        {/* Tab 1: Projects Grid with Staggered Delays */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
