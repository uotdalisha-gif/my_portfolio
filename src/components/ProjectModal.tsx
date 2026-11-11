import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onViewFullPage?: (project: ProjectItem) => void;
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onViewFullPage,
  onCursorEnter,
  onCursorLeave
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#0f1015] border-2 border-slate-800 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          onMouseEnter={() => onCursorEnter?.('CLOSE', 'hover')}
          onMouseLeave={onCursorLeave}
          aria-label="Close project modal"
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-[#3b66f5]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <span className="text-xs font-mono text-[#3b66f5] uppercase font-bold">
            {project.category}
          </span>
          <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {project.title}
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            {project.tagline}
          </p>
        </div>

        {/* Architecture Details */}
        <div className="space-y-4 my-6">
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase mb-1">
              Architecture &amp; Overview
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-[#3b66f5] font-bold block mb-1">
              Verified Metric / Outcome:
            </span>
            <span className="text-xs text-slate-300 font-mono">
              {project.metrics}
            </span>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase mb-2">
              Key Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono bg-slate-800 text-slate-200 rounded-md border border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
          {onViewFullPage && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onViewFullPage(project);
              }}
              className="flex-1 py-2.5 rounded-xl bg-[#3b66f5] hover:bg-[#2d56e0] text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-500/20 focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Dedicated Project Page</span>
            </button>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-colors focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Repository</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-mono text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
