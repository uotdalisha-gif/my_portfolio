import React from 'react';
import { Mail, Github, MessageSquare } from 'lucide-react';
import { ContactForm } from './ContactForm';
import { PROFILE_DATA } from '../data/portfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ContactSectionProps {
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onCursorEnter,
  onCursorLeave
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.15 });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-28 sm:py-36 bg-[#0c0c0e] border-t border-white/[0.08] text-white relative"
    >
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Details */}
          <div
            className={`lg:col-span-5 space-y-6 reveal-base ${
              isVisible ? 'reveal-active' : ''
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <span className="text-sm font-mono uppercase tracking-widest text-[#60a5fa] font-bold">
              // GET IN TOUCH
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-white leading-tight">
              Let's connect &amp; build resilient solutions.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              Whether you are looking for an IT specialist, a developer for modern full-stack web applications, or assistance with enterprise network infrastructure, feel free to reach out.
            </p>

            <div className="space-y-4 pt-4">
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                onMouseEnter={() => onCursorEnter?.('MAIL', 'hover')}
                onMouseLeave={onCursorLeave}
                className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#141519] border border-white/[0.08] hover:border-[#60a5fa]/40 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] shadow-lg"
              >
                <div className="p-3 rounded-xl bg-[#60a5fa]/10 text-[#60a5fa] group-hover:bg-[#60a5fa] group-hover:text-black transition-colors shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Direct Email</span>
                  <span className="text-base sm:text-lg font-bold text-white group-hover:text-[#60a5fa] transition-colors">{PROFILE_DATA.email}</span>
                </div>
              </a>

              <a
                href={PROFILE_DATA.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => onCursorEnter?.('CODE', 'hover')}
                onMouseLeave={onCursorLeave}
                className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#141519] border border-white/[0.08] hover:border-[#60a5fa]/40 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] shadow-lg"
              >
                <div className="p-3 rounded-xl bg-white/5 text-slate-300 group-hover:bg-[#60a5fa] group-hover:text-black transition-colors shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">GitHub Profile</span>
                  <span className="text-base sm:text-lg font-bold text-white group-hover:text-[#60a5fa] transition-colors">github.com/uotdalisha-gif</span>
                </div>
              </a>

              <a
                href={PROFILE_DATA.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => onCursorEnter?.('CHAT', 'hover')}
                onMouseLeave={onCursorLeave}
                className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#141519] border border-white/[0.08] hover:border-[#60a5fa]/40 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa] shadow-lg"
              >
                <div className="p-3 rounded-xl bg-[#60a5fa]/10 text-[#60a5fa] group-hover:bg-[#60a5fa] group-hover:text-black transition-colors shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Telegram Channel</span>
                  <span className="text-base sm:text-lg font-bold text-white group-hover:text-[#60a5fa] transition-colors">t.me/satelr</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div
            className={`lg:col-span-7 bg-[#141519] border border-white/[0.08] p-6 sm:p-10 rounded-3xl shadow-2xl reveal-base ${
              isVisible ? 'reveal-active' : ''
            }`}
            style={{ transitionDelay: '0.4s' }}
          >
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
};
