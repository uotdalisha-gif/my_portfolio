import React from 'react';
import { GraduationCap, Briefcase } from 'lucide-react';
import { EDUCATION_DATA, EXPERIENCE_DATA } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { TimelineCanvas } from './TimelineCanvas';

export const Timeline: React.FC = () => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      id="timeline"
      ref={ref}
      className="relative py-28 sm:py-36 bg-[#0a0a0a] border-t border-white/[0.08] overflow-hidden"
    >
      {/* Interactive Milestone Matrix Canvas */}
      <TimelineCanvas />

      <div className="container mx-auto px-6 max-w-6xl relative z-10 pointer-events-auto">
        {/* Section Heading */}
        <div
          className={`flex flex-col items-center mb-16 text-center reveal-base ${
            isVisible ? 'reveal-active' : ''
          }`}
          style={{ transitionDelay: '0.1s' }}
        >
          <span className="text-sm font-mono uppercase tracking-widest text-[#60a5fa] font-bold mb-2">
            Academic &amp; Professional Path
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Education &amp; Experience
          </h2>
          <div className="w-16 h-1 bg-[#60a5fa] rounded-full mt-3 opacity-80" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Education */}
          <div
            className={`space-y-6 reveal-base ${isVisible ? 'reveal-active' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="flex items-center gap-3 pb-3.5 border-b border-white/[0.08]">
              <div className="p-3 rounded-xl bg-[#60a5fa]/10 border border-[#60a5fa]/20 text-[#60a5fa]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-display">Education</h3>
                <p className="text-sm font-mono text-slate-400">Academic Foundations</p>
              </div>
            </div>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
              {EDUCATION_DATA.map((edu, idx) => (
                <div key={edu.id} className="relative group">
                  <div
                    className={`absolute -left-[27px] top-2 w-3.5 h-3.5 rounded-full border-2 border-[#0a0a0a] transition-transform ${
                      idx === 0 ? 'bg-[#60a5fa] scale-110' : 'bg-slate-600 group-hover:bg-[#60a5fa]'
                    }`}
                  />
                  <div className="bg-[#141519] p-6 sm:p-7 rounded-2xl border border-white/[0.08] hover:border-white/25 transition-all duration-300 shadow-lg">
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#60a5fa]/15 text-[#60a5fa] mb-2.5">
                      {edu.period}
                    </span>
                    <h4 className="text-xl font-bold text-white font-display leading-snug">
                      {edu.institution}
                    </h4>
                    <p className="text-base font-semibold text-[#60a5fa] mt-1">
                      {edu.degree}
                    </p>
                    <p className="text-sm text-slate-300 font-sans mt-2.5 leading-relaxed">
                      {edu.details}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-3.5 flex items-center gap-1.5">
                      <span>📍</span> {edu.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Experience */}
          <div
            className={`space-y-6 reveal-base ${isVisible ? 'reveal-active' : ''}`}
            style={{ transitionDelay: '0.3s' }}
          >
            <div className="flex items-center gap-3 pb-3.5 border-b border-white/[0.08]">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-display">Experience &amp; Labs</h3>
                <p className="text-sm font-mono text-slate-400">Practical &amp; Instructional Roles</p>
              </div>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
              {EXPERIENCE_DATA.map((exp) => (
                <div key={exp.id} className="relative group">
                  <div className="absolute -left-[27px] top-2 w-3.5 h-3.5 rounded-full bg-[#60a5fa] border-2 border-[#0a0a0a] group-hover:scale-125 transition-transform" />
                  <div className="bg-[#141519] p-6 sm:p-7 rounded-2xl border border-white/[0.08] hover:border-white/25 transition-all duration-300 shadow-lg">
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#60a5fa]/15 text-[#60a5fa] mb-2.5">
                      {exp.period}
                    </span>
                    <h4 className="text-xl font-bold text-white font-display leading-snug">
                      {exp.role}
                    </h4>
                    <p className="text-base font-semibold text-[#60a5fa] mt-1">
                      {exp.organization}
                    </p>
                    <p className="text-sm text-slate-300 font-sans mt-2.5 leading-relaxed">
                      {exp.description}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-3.5 flex items-center gap-1.5">
                      <span>📍</span> {exp.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
