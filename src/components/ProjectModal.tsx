import React, { useEffect, useState } from 'react';
import { X, ExternalLink, RotateCw, Monitor, Code2, Github, CheckCircle2 } from 'lucide-react';
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
  onCursorEnter,
  onCursorLeave
}) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'details'>('demo');
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoadingIframe, setIsLoadingIframe] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setActiveTab('demo');
      setIsLoadingIframe(true);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleReload = () => {
    setIsLoadingIframe(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#111216] border border-white/10 rounded-3xl max-w-5xl w-full p-4 sm:p-7 shadow-2xl relative max-h-[95vh] overflow-y-auto text-slate-200 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08] mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-[#60a5fa] uppercase tracking-wider px-2 py-0.5 rounded bg-[#60a5fa]/10 border border-[#60a5fa]/20">
                {project.category}
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Vercel Production
              </span>
            </div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {project.title}
            </h2>
          </div>

          {/* Mode Switcher + Close */}
          <div className="flex items-center gap-2.5 self-start sm:self-center">
            <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('demo')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'demo'
                    ? 'bg-[#60a5fa] text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Live App Demo</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'details'
                    ? 'bg-[#60a5fa] text-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Specs &amp; Architecture</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              onMouseEnter={() => onCursorEnter?.('CLOSE', 'hover')}
              onMouseLeave={onCursorLeave}
              aria-label="Close project modal"
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-[#60a5fa] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: Live Interactive In-App Demo Frame */}
        {activeTab === 'demo' && (
          <div className="space-y-4">
            {/* Simulated Browser Bar */}
            <div className="bg-[#181920] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-[#101115] px-4 py-2.5 border-b border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/70 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/70 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/70 inline-block" />
                  </div>

                  <button
                    type="button"
                    onClick={handleReload}
                    title="Reload live app"
                    aria-label="Reload live application demo"
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5 transition-colors ml-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="px-3 py-1 rounded-lg bg-black/50 border border-white/10 text-slate-300 text-xs font-mono truncate max-w-xs sm:max-w-md">
                  {project.demoUrl || 'https://school-management-sys-inky.vercel.app/dashboard'}
                </div>

                <div className="flex items-center gap-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open in new window"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Embedded Live Interactive iFrame */}
              <div className="relative w-full h-[520px] sm:h-[620px] bg-[#0c0d11]">
                {isLoadingIframe && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0c0d11] text-slate-400 space-y-3 z-10">
                    <div className="w-8 h-8 rounded-full border-2 border-[#60a5fa] border-t-transparent animate-spin" />
                    <span className="text-xs font-mono">Connecting to live School Management System...</span>
                  </div>
                )}
                <iframe
                  key={iframeKey}
                  src={project.demoUrl || 'https://school-management-sys-inky.vercel.app/dashboard'}
                  title={project.title}
                  onLoad={() => setIsLoadingIframe(false)}
                  className="w-full h-full border-0 rounded-b-2xl"
                  allow="fullscreen; clipboard-read; clipboard-write"
                  loading="lazy"
                />
              </div>
            </div>

            <p className="text-xs font-mono text-slate-400 text-center">
              💡 You can click and interact with the live deployed application directly inside this frame without leaving your portfolio.
            </p>
          </div>
        )}

        {/* Tab 2: Architecture & Details */}
        {activeTab === 'details' && (
          <div className="space-y-6 py-2">
            <div>
              <h3 className="text-xs font-mono font-bold text-[#60a5fa] uppercase tracking-wider mb-2">
                Architecture &amp; Core Overview
              </h3>
              <p className="text-base text-slate-300 leading-relaxed font-sans">
                {project.fullDescription}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-mono text-[#60a5fa] font-bold block mb-0.5">
                  Verified Outcome / Production Metric:
                </span>
                <span className="text-sm text-white font-mono font-semibold">
                  {project.metrics}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
                Technologies &amp; Cloud Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-mono bg-[#181920] text-slate-200 rounded-xl border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-white/[0.08] mt-6">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all hover:border-[#60a5fa]/40"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <span>External Window</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-mono text-xs font-bold transition-all shadow-md focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
