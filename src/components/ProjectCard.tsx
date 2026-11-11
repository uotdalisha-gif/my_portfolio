import React, { useState } from 'react';
import { ChevronRight, Github, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

/**
 * Generates a deterministic gradient preview based on project id.
 * This gives each card a unique visual identity for the hover preview.
 */
const getProjectGradient = (id: string): string => {
  const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue1 = hash % 360;
  const hue2 = (hash * 7) % 360;
  return `linear-gradient(135deg, hsl(${hue1}, 40%, 15%) 0%, hsl(${hue2}, 50%, 10%) 100%)`;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  onCursorEnter,
  onCursorLeave
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        onCursorEnter?.('VIEW', 'hover');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onCursorLeave?.();
      }}
      className="group bg-[#161616] border border-white/[0.08] hover:border-white/25 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between relative"
    >
      {/* Hover floating preview image */}
      <div
        className="absolute -right-2 -top-4 w-44 h-28 rounded-xl overflow-hidden shadow-2xl shadow-black/60 z-20 pointer-events-none transition-all duration-300 ease-out border border-white/10"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered
            ? 'scale(1) rotate(0deg) translateY(0px)'
            : 'scale(0.92) rotate(-3deg) translateY(8px)',
          background: getProjectGradient(project.id),
        }}
        aria-hidden="true"
      >
        {/* Abstract project preview — gradient with project title overlay */}
        <div className="w-full h-full flex items-center justify-center p-3 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          <span className="text-[10px] font-mono text-white/50 text-center leading-tight relative z-10 uppercase tracking-wider">
            {project.title}
          </span>
        </div>
      </div>

      <div>
        {/* Simulated Browser Bar Mockup */}
        <div className="bg-[#111111] text-white px-4 py-2.5 border-b border-white/[0.06] flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70 inline-block" />
            <span className="ml-2 text-slate-400 text-[11px] truncate max-w-[140px] sm:max-w-xs">
              https://{project.id}.local
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold text-[#60a5fa] bg-[#60a5fa]/10 px-2 py-0.5 rounded border border-[#60a5fa]/20">
            {project.category.split('&')[0]}
          </span>
        </div>

        {/* Project Graphic / Visual Banner */}
        <div className="h-44 sm:h-52 bg-gradient-to-br from-[#1c1c1c] via-[#141414] to-[#0d0d0d] p-6 flex flex-col justify-between border-b border-white/[0.06] text-white relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#60a5fa]/10 rounded-full blur-2xl group-hover:bg-[#60a5fa]/20 transition-all duration-500" />
          <div>
            <span className="text-[11px] font-mono text-[#60a5fa] font-bold uppercase tracking-wider">
              FEATURED WORK
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-1 text-white font-display" style={{ letterSpacing: '-0.02em' }}>
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
                className="text-[10px] font-mono px-2 py-0.5 bg-black/50 backdrop-blur-md rounded border border-white/10 text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <p className="text-slate-300 text-sm leading-relaxed mb-4 font-normal">
            {project.description}
          </p>

          <div className="p-3 bg-black/30 border border-white/[0.06] rounded-xl text-xs font-mono text-slate-300 mb-2">
            <span className="font-bold text-[#60a5fa]">Impact:</span> {project.metrics}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 pt-0 flex items-center justify-between border-t border-white/[0.06]">
        <button
          type="button"
          onClick={() => onSelect(project)}
          className="px-4 py-2 bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
              className="p-2 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]"
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
              className="p-2 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
