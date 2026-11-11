import React, { useState, useMemo } from 'react';
import { X, Maximize2, Calendar, Image as ImageIcon } from 'lucide-react';
import { GALLERY_DATA } from '../data/portfolioData';
import { GalleryItem } from '../types/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { GalleryCanvas } from './GalleryCanvas';

interface GallerySectionProps {
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

type GalleryCategory = 'ALL' | 'WORKSHOPS' | 'ACADEMIC' | 'ACTIVITIES';

export const GallerySection: React.FC<GallerySectionProps> = ({
  onCursorEnter,
  onCursorLeave
}) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('ALL');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  const filteredItems = useMemo(() => {
    return activeCategory === 'ALL'
      ? GALLERY_DATA
      : GALLERY_DATA.filter((item) => (item.category as string) === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative py-28 sm:py-32 bg-[#0a0a0a] border-t border-white/[0.08] text-white overflow-hidden"
    >
      {/* Interactive Floating Luminous Light Bokeh Canvas */}
      <GalleryCanvas />

      <div className="container mx-auto px-6 max-w-6xl relative z-10 pointer-events-auto">
        {/* Header & Category Filters */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 border-b border-white/[0.08] pb-6 reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#60a5fa] font-semibold block mb-1">
              // CAMPUS LIFE &amp; WORKSHOPS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
              ACTIVITIES <span className="text-[#60a5fa]">//</span> GALLERY
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(['ALL', 'WORKSHOPS', 'ACADEMIC', 'ACTIVITIES'] as GalleryCategory[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                onMouseEnter={() => onCursorEnter?.(cat, 'hover')}
                onMouseLeave={onCursorLeave}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#60a5fa] ${
                  activeCategory === cat
                    ? 'bg-[#60a5fa] text-black font-bold shadow-sm'
                    : 'bg-[#161616] border border-white/[0.08] text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div
            className={`border border-dashed border-white/10 rounded-2xl p-12 text-center bg-[#111111] flex flex-col items-center justify-center space-y-3 reveal-base ${
              isVisible ? 'reveal-active' : ''
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <ImageIcon className="w-12 h-12 text-slate-600 mb-2" />
            <h3 className="text-lg font-display font-bold text-slate-200">No Activity Photos Added Yet</h3>
            <p className="text-sm font-sans text-slate-400 max-w-md">
              This gallery is ready for your uploaded workshop photos, team lab sessions, and university activities.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                onMouseEnter={() => onCursorEnter?.('ZOOM', 'hover')}
                onMouseLeave={onCursorLeave}
                className={`group cursor-pointer rounded-2xl overflow-hidden bg-[#161616] border border-white/[0.08] hover:border-white/25 transition-all duration-300 flex flex-col justify-between shadow-lg hover:-translate-y-1.5 reveal-base ${
                  isVisible ? 'reveal-active' : ''
                }`}
                style={{ transitionDelay: `${0.1 * (idx + 1)}s` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black flex items-center justify-center">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-600 space-y-2">
                      <ImageIcon className="w-10 h-10 stroke-[1.5]" />
                      <span className="text-[11px] font-mono">Photo slot</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <span className="absolute top-3 left-3 text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-slate-300">
                    {item.category}
                  </span>
                  <div className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#60a5fa]/20 backdrop-blur-md text-[#60a5fa] border border-[#60a5fa]/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-bold text-sm text-white group-hover:text-[#60a5fa] transition-colors leading-snug font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#161616] border border-white/10 rounded-2xl max-w-2xl w-full p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto text-slate-200"
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo preview"
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-xl overflow-hidden border border-white/10 mb-4 bg-black flex items-center justify-center max-h-[60vh]">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-[#60a5fa] font-semibold">
                {selectedPhoto.category} • {selectedPhoto.date}
              </span>
              <h3 className="text-lg font-bold text-white font-display">{selectedPhoto.title}</h3>
              <p className="text-sm text-slate-400">{selectedPhoto.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
