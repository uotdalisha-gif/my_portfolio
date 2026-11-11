import React, { useEffect } from 'react';
import { X, Award, ExternalLink, CheckCircle2 } from 'lucide-react';
import { CertificationItem } from '../types/portfolio';

interface CertificateModalProps {
  cert: CertificationItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ cert, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (cert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [cert, onClose]);

  if (!cert) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#0f1015] text-slate-100 border border-white/10 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close certificate modal"
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#60a5fa] z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Certificate Image Preview */}
        {cert.imageUrl && (
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/50 border border-white/10 mb-5 shadow-lg group">
            <img
              src={cert.imageUrl}
              alt={cert.title}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Credential</span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-mono font-bold bg-[#60a5fa]/15 text-[#60a5fa] border border-[#60a5fa]/30 px-2.5 py-0.5 rounded-md">
            {cert.year}
          </span>
          <span className="text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-md flex items-center gap-1">
            <Award className="w-3 h-3" />
            {cert.badge}
          </span>
        </div>

        <h3 id="cert-modal-title" className="text-xl sm:text-2xl font-bold font-display text-white mt-2">
          {cert.title}
        </h3>

        <p className="text-sm font-mono text-[#60a5fa] font-semibold mt-1">
          {cert.issuer}
        </p>

        <p className="text-sm text-slate-300 mt-4 leading-relaxed font-sans">
          {cert.description}
        </p>

        <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
          {cert.imageUrl ? (
            <a
              href={cert.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open Full Image</span>
            </a>
          ) : <div />}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-bold rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#60a5fa]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
