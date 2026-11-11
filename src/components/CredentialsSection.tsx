import React from 'react';
import { Award, CheckCircle2, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS_DATA, AWARDS_DATA } from '../data/portfolioData';
import { CertificationItem } from '../types/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface CredentialsSectionProps {
  onSelectCert: (cert: CertificationItem) => void;
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

const STATS = [
  { value: '06+', label: 'Verified Certificates', note: 'Academic & Practical' },
  { value: '01', label: 'Live Production App', note: 'Vercel Deployment' },
  { value: '03+', label: 'Years CS Studies', note: 'BBU Faculty of Tech' },
  { value: '100%', label: 'Hands-On Verified', note: 'Labs & Real Work' }
];

export const CredentialsSection: React.FC<CredentialsSectionProps> = ({
  onSelectCert,
  onCursorEnter,
  onCursorLeave
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="credentials"
      ref={ref}
      className="py-28 sm:py-32 bg-[#0d0e11] text-slate-100 border-t border-white/[0.08] relative"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 border-b border-white/[0.08] pb-6 reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#60a5fa] block mb-1">
              // VERIFIED HONORS &amp; QUALIFICATIONS
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-white">
              CREDENTIALS <span className="text-[#60a5fa]">//</span> CERTIFICATES
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-xs sm:text-right">
            Official certifications, academic diplomas, and distinguished program capstones.
          </p>
        </div>

        {/* Statistics Row */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.15s' }}
        >
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#141519] border border-white/[0.08] p-5 rounded-2xl relative overflow-hidden group hover:border-[#60a5fa]/40 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight group-hover:text-[#60a5fa] transition-colors">
                {stat.value}
              </div>
              <div className="text-xs font-mono font-bold text-slate-300 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] font-sans text-slate-500 mt-0.5">
                {stat.note}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Visible Certificates Grid */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="w-5 h-5 text-[#60a5fa]" />
            <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
              Official Certificates
            </h3>
            <span className="text-xs font-mono text-slate-500 ml-2">
              (Click any certificate to inspect full resolution)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS_DATA.map((cert, idx) => (
              <article
                key={cert.id}
                onClick={() => onSelectCert(cert)}
                onMouseEnter={() => onCursorEnter?.('INSPECT', 'hover')}
                onMouseLeave={onCursorLeave}
                className={`group bg-[#141519] border border-white/[0.08] hover:border-[#60a5fa]/40 rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between reveal-base ${
                  isVisible ? 'reveal-active' : ''
                }`}
                style={{ transitionDelay: `${0.08 * (idx + 1)}s` }}
              >
                <div>
                  {/* Certificate Image Thumbnail */}
                  <div className="relative aspect-[16/10] bg-[#1a1b20] overflow-hidden border-b border-white/[0.06]">
                    {cert.imageUrl ? (
                      <img
                        src={cert.imageUrl}
                        alt={cert.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Award className="w-12 h-12 text-slate-600" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md text-[#60a5fa] border border-[#60a5fa]/30 px-2 py-0.5 rounded-md">
                        {cert.year}
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                        {cert.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 text-[10px] font-mono font-bold text-white/70 bg-black/60 px-2 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Inspect ↗
                    </div>
                  </div>

                  {/* Information Body */}
                  <div className="p-5">
                    <h4 className="font-display font-bold text-base text-white tracking-tight group-hover:text-[#60a5fa] transition-colors leading-snug">
                      {cert.title}
                    </h4>
                    <p className="text-xs font-mono text-[#60a5fa] font-semibold mt-1">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-slate-400 font-sans mt-2 line-clamp-2 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-dashed border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-white transition-colors">
                  <span>View Verified Document</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#60a5fa]" />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Academic & Distinguished Awards */}
        <div
          className={`pt-10 border-t border-white/[0.08] reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.3s' }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
              Academic Honors &amp; Awards
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AWARDS_DATA.map((award, idx) => (
              <div
                key={award.id}
                className="bg-[#141519] border border-white/[0.08] hover:border-amber-400/40 p-6 rounded-2xl shadow-lg space-y-3 hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${0.1 * (idx + 1)}s` }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/20 px-2.5 py-0.5 rounded">
                    {award.date}
                  </span>
                  <Award className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="text-base font-bold text-white font-display leading-snug">
                  {award.title}
                </h4>
                <p className="text-xs font-mono text-slate-400 font-bold">
                  {award.event}
                </p>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

