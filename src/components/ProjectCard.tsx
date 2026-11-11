import React from 'react';
import { ChevronRight, Github, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  onCursorEnter,
  onCursorLeave
}) => {
  return (
    <div
      onMouseEnter={() => {
        onCursorEnter?.('VIEW', 'hover');
      }}
      onMouseLeave={() => {
        onCursorLeave?.();
      }}
      className="group bg-[#141519] border border-white/[0.08] hover:border-[#60a5fa]/40 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_12px_36px_rgba(59,130,246,0.15)] hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between relative"
    >
      <div>
        {/* Simulated Browser Bar Mockup */}
        <div className="bg-[#101114] text-white px-4 py-3 border-b border-white/[0.06] flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70 inline-block" />
            <span className="ml-2 text-slate-400 text-[11px] truncate max-w-[140px] sm:max-w-xs">
              https://school-management-sys.vercel.app
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold text-[#60a5fa] bg-[#60a5fa]/10 px-2.5 py-0.5 rounded border border-[#60a5fa]/20 tracking-wider">
            {project.category}
          </span>
        </div>

        {/* Project Graphic / Visual Banner */}
        <div className="h-44 sm:h-52 bg-gradient-to-br from-[#1a1b22] via-[#121318] to-[#0c0d10] p-6 sm:p-7 flex flex-col justify-between border-b border-white/[0.06] text-white relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-[#60a5fa]/10 rounded-full blur-3xl group-hover:bg-[#60a5fa]/25 transition-all duration-500" />
          <div>
            <span className="text-[11px] font-mono text-[#60a5fa] font-bold uppercase tracking-widest">
              FEATURED WORK
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-1 text-white font-display">
              {project.title}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              {project.tagline}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 z-10">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2.5 py-0.5 bg-black/60 backdrop-blur-md rounded border border-white/10 text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7">
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-5 font-normal">
            {project.description}
          </p>

          <div className="p-3.5 bg-black/40 border border-white/[0.06] rounded-xl text-xs font-mono text-slate-300">
            <span className="font-bold text-[#60a5fa]">Impact:</span> {project.metrics}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 sm:p-7 pt-0 flex items-center justify-between border-t border-white/[0.06] mt-4">
        <button
          type="button"
          onClick={() => onSelect(project)}
          className="px-4 py-2.5 bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-semibold text-xs font-mono rounded-xl transition-all flex items-center gap-1.5 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
        >
          <span>Architecture &amp; Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code on GitHub`}
              className="p-2.5 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demonstration of ${project.title}`}
              className="p-2.5 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
