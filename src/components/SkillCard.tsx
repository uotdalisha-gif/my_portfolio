import React from 'react';
import { SkillItem } from '../types/portfolio';

interface SkillCardProps {
  skill: SkillItem;
  onCursorEnter?: (text: string, variant?: 'hover') => void;
  onCursorLeave?: () => void;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  onCursorEnter,
  onCursorLeave
}) => {
  const Icon = skill.icon;

  return (
    <div
      onMouseEnter={() => onCursorEnter?.('SKILL', 'hover')}
      onMouseLeave={onCursorLeave}
      className="bg-[#161616] border border-white/[0.08] hover:border-white/25 p-4 sm:p-5 rounded-2xl shadow-md hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-default group flex flex-col justify-between select-none"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 border border-white/10 rounded-xl bg-white/5 group-hover:bg-[#60a5fa] group-hover:border-[#60a5fa] transition-colors">
            <Icon className="w-4 h-4 text-slate-300 group-hover:text-black transition-colors" />
          </div>
          <span className="text-[10px] font-mono font-medium uppercase px-2 py-0.5 border border-white/10 bg-white/5 text-slate-400 rounded-md">
            {skill.category}
          </span>
        </div>

        <h3 className="font-display font-bold text-base sm:text-lg text-white tracking-tight">
          {skill.name}
        </h3>
        <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
          {skill.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-dashed border-white/[0.08] flex items-center justify-between text-[11px] font-mono">
        <span className="text-slate-500">Proficiency</span>
        <span className="font-medium text-[#60a5fa]">{skill.proficiency}</span>
      </div>
    </div>
  );
};
