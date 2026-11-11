import React, { useEffect } from 'react';
import { X } from 'lucide-react';
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
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#0f1015] text-slate-100 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close certificate modal"
          className="absolute top-4 right-4 p-1.5 border border-slate-800 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#3b66f5]"
        >
          <X className="w-4 h-4" />
        </button>

        <span className="text-xs font-mono font-bold bg-[#3b66f5]/20 text-[#3b66f5] border border-[#3b66f5]/40 px-2.5 py-0.5 rounded">
          {cert.year} • {cert.issuer}
        </span>

        <h3 id="cert-modal-title" className="text-xl font-black font-mono mt-3 text-white">
          {cert.title}
        </h3>

        <p className="text-xs font-mono text-[#3b66f5] font-bold mt-1">
          Badge: {cert.badge}
        </p>

        <p className="text-sm text-slate-300 mt-4 leading-relaxed">
          {cert.description}
        </p>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold rounded shadow-md focus-visible:ring-2 focus-visible:ring-black"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

