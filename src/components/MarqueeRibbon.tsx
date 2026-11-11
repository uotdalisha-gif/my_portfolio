import React from 'react';
import { MARQUEE_TECH_ITEMS } from '../data/portfolioData';

export const MarqueeRibbon: React.FC = () => {
  return (
    <div
      aria-label="Technology Stack Ticker"
      className="py-5 bg-[#101115] text-slate-300 font-mono text-sm sm:text-base uppercase tracking-widest overflow-hidden border-y border-white/[0.08] select-none relative z-20"
    >
      <div className="flex whitespace-nowrap animate-marquee motion-reduce:animate-none">
        {[0, 1].map((loopIdx) => (
          <div key={loopIdx} className="flex items-center shrink-0">
            {MARQUEE_TECH_ITEMS.map((tech, i) => (
              <span key={i} className="flex items-center mx-8">
                <span className="text-white font-bold">{tech}</span>
                <span className="ml-8 text-[#60a5fa] font-black" aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
