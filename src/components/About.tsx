import React from 'react';
import { FileText, ArrowRight, Code2, Server, Palette, MapPin, GraduationCap, CheckCircle2 } from 'lucide-react';
import { ScrambleText } from './ScrambleText';
import { TopographicCanvas } from './TopographicCanvas';
import { PROFILE_DATA } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface AboutProps {
  onNavigate: (id: string) => void;
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

const CORE_PILLARS = [
  {
    icon: Code2,
    title: 'Full-Stack Software Engineering',
    tag: 'DEVELOPMENT',
    description:
      'Engineering modern component architectures with React 18, TypeScript, and Next.js. Designing robust relational databases (PostgreSQL, MySQL) and deploying scalable cloud applications with production reliability.'
  },
  {
    icon: Server,
    title: 'Systems & Enterprise Infrastructure',
    tag: 'SYSTEMS / NETWORKING',
    description:
      'Configuring multi-server enterprise environments: Active Directory Domain Services (AD DS), Group Policy Objects (GPO), DFS Namespaces with automated replication, and virtualization topologies in VMware labs.'
  },
  {
    icon: Palette,
    title: 'User-Centric UI/UX & Design Systems',
    tag: 'DESIGN & ACCESSIBILITY',
    description:
      'Bridging technical logic with aesthetic craftsmanship. Building responsive interfaces with utility-first Tailwind CSS, custom design systems, and wireframing user journeys with clean brutalist principles.'
  }
];

export const About: React.FC<AboutProps> = ({
  onNavigate,
  onCursorEnter,
  onCursorLeave
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 sm:py-36 bg-[#0c0c0e] overflow-hidden border-t border-white/[0.08]"
    >
      {/* Interactive Topographic Lines */}
      <TopographicCanvas />

      <div className="container mx-auto px-6 max-w-6xl relative z-10 pointer-events-auto">
        {/* Section Heading */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4 border-b border-white/[0.08] pb-6 reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#60a5fa] font-bold block mb-1">
              <ScrambleText text="// GET TO KNOW ME" speed={25} />
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              ABOUT ME <span className="text-[#60a5fa]">//</span> BACKGROUND
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-sm sm:text-right">
            Computer Science student &amp; IT practitioner building resilient software and enterprise infrastructure.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Academic & Personal Identity Anchor (5 cols) */}
          <div
            className={`lg:col-span-5 bg-[#141519] p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-2xl space-y-6 reveal-base ${
              isVisible ? 'reveal-active' : ''
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            {/* Avatar & Status Header */}
            <div className="flex items-center gap-5 pb-6 border-b border-white/[0.08]">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/20 bg-black shrink-0 shadow-lg">
                <img
                  src={PROFILE_DATA.avatarUrl || '/avatar.jpg'}
                  alt={PROFILE_DATA.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top contrast-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#141519]" />
              </div>

              <div>
                <span className="text-xs font-mono text-[#60a5fa] font-bold uppercase tracking-wider block">
                  IT Specialist &amp; Developer
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-0.5 leading-tight">
                  {PROFILE_DATA.name}
                </h3>
                <span className="text-xs font-mono text-slate-400 block mt-0.5">
                  {PROFILE_DATA.nativeName}
                </span>
              </div>
            </div>

            {/* Academic & Location Info */}
            <div className="space-y-3 font-mono text-xs text-slate-300">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <GraduationCap className="w-4 h-4 text-[#60a5fa] mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-white text-sm">
                    {PROFILE_DATA.university}
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">
                    Bachelor of Computer Science (2022 - 2026)
                  </div>
                  <div className="text-[#60a5fa] text-[11px] mt-0.5">
                    {PROFILE_DATA.faculty}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <MapPin className="w-4 h-4 text-[#60a5fa] shrink-0" />
                <span className="text-slate-300">{PROFILE_DATA.location}</span>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-emerald-300 font-bold">
                  Open for Internship &amp; Full-Time Roles
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                onMouseEnter={() => onCursorEnter?.('CONTACT', 'hover')}
                onMouseLeave={onCursorLeave}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#60a5fa] hover:bg-[#3b82f6] text-black font-bold font-mono text-xs transition-all shadow-md focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Get in Touch / CV</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                onMouseEnter={() => onCursorEnter?.('PROJECTS', 'hover')}
                onMouseLeave={onCursorLeave}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#60a5fa]" />
              </button>
            </div>
          </div>

          {/* Right Column: In-Depth Narrative & Core Pillars (7 cols) */}
          <div
            className={`lg:col-span-7 space-y-8 reveal-base ${
              isVisible ? 'reveal-active' : ''
            }`}
            style={{ transitionDelay: '0.3s' }}
          >
            {/* The Story & Vision */}
            <div className="bg-[#141519] p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-2xl space-y-4">
              <span className="text-xs font-mono font-bold text-[#60a5fa] uppercase tracking-wider block">
                // ENGINEERING PHILOSOPHY
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                Crafting Scalable Code &amp; Reliable Infrastructure
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
                {PROFILE_DATA.bio}
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans pt-1">
                {PROFILE_DATA.secondaryBio}
              </p>
            </div>

            {/* Core Pillars */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  // CORE FOCUS AREAS
                </span>
                <span className="text-xs font-mono text-[#60a5fa]">03 Disciplines</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {CORE_PILLARS.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 rounded-2xl bg-[#141519] border border-white/[0.08] hover:border-[#60a5fa]/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#60a5fa] group-hover:bg-[#60a5fa] group-hover:text-black transition-colors shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-display font-bold text-white text-base sm:text-lg group-hover:text-[#60a5fa] transition-colors">
                              {pillar.title}
                            </h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 shrink-0">
                              {pillar.tag}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
