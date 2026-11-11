import React, { useEffect } from 'react';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Layers } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { PROJECTS_DATA } from '../data/portfolioData';

interface ProjectDetailPageProps {
  project: ProjectItem;
  onBack: () => void;
  onSelectProject: (project: ProjectItem) => void;
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onSelectProject,
  onCursorEnter,
  onCursorLeave
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project]);

  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS_DATA[(currentIndex + 1) % PROJECTS_DATA.length];

  return (
    <article className="min-h-screen pt-28 pb-20 bg-[#05050a] text-slate-100 relative">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back navigation */}
        <button
          type="button"
          onClick={onBack}
          onMouseEnter={() => onCursorEnter?.('BACK', 'hover')}
          onMouseLeave={onCursorLeave}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0f1015] border border-slate-800 text-slate-400 hover:text-white transition-colors mb-8 focus-visible:ring-2 focus-visible:ring-[#3b66f5]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-mono">Back to Overview</span>
        </button>

        {/* Hero Banner */}
        <header className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0f1015] to-[#07080e] border border-slate-800 relative overflow-hidden shadow-2xl mb-12">
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: project.accentColor }}
          />

          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3b66f5] bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800/60 inline-block mb-4">
            {project.category}
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-400 font-mono">
            {project.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-slate-800">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3b66f5] hover:bg-[#2d56e0] text-white font-semibold text-xs font-mono shadow-lg shadow-blue-500/25 transition-all"
              >
                <span>Live Project Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f1015] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-mono text-xs transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </header>

        {/* Architecture & Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <section className="bg-[#0f1015] border border-slate-800/80 p-6 sm:p-8 rounded-2xl">
              <h2 className="text-lg font-bold text-white font-mono mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#3b66f5]" />
                <span>Architecture &amp; System Overview</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.fullDescription}
              </p>
            </section>

            <section className="bg-[#0f1015] border border-slate-800/80 p-6 sm:p-8 rounded-2xl">
              <h2 className="text-lg font-bold text-white font-mono mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Metrics &amp; Benchmarks</span>
              </h2>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-sm font-mono text-slate-300">
                {project.metrics}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-[#0f1015] border border-slate-800/80 p-6 rounded-2xl">
              <h3 className="text-xs font-mono font-bold uppercase text-slate-400 mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {nextProject && nextProject.id !== project.id && (
              <div className="bg-[#0f1015] border border-slate-800/80 p-6 rounded-2xl">
                <h3 className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                  Next Project
                </h3>
                <button
                  type="button"
                  onClick={() => onSelectProject(nextProject)}
                  className="w-full text-left p-3 rounded-xl bg-slate-900/60 hover:bg-[#3b66f5]/10 border border-slate-800 hover:border-[#3b66f5]/50 transition-all group"
                >
                  <span className="text-[10px] font-mono text-[#3b66f5] block">CONTINUE READING</span>
                  <span className="font-bold text-white text-sm group-hover:text-[#3b66f5] transition-colors">
                    {nextProject.title} →
                  </span>
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
};

