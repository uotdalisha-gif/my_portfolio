import React from 'react';
import { PROFILE_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-14 bg-[#08080a] border-t border-white/[0.08] text-xs font-mono text-slate-500">
      <div className="container mx-auto px-6 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white font-display">dalisha.dev</span>
          <span>— Clean code &amp; minimal modern engineering</span>
        </div>
        <div>
          <span>© {currentYear} {PROFILE_DATA.name}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
