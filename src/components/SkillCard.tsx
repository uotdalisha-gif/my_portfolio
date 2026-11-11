import React, { useState } from 'react';
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
  const [isHovered, setIsHovered] = useState(false);
  const Icon = skill.icon;
  const brandColor =
    skill.brandColor ||
    (skill.simpleIcon?.hex ? `#${skill.simpleIcon.hex}` : '#60a5fa');

  const handleMouseEnter = () => {
    setIsHovered(true);
    onCursorEnter?.('SKILL', 'hover');
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onCursorLeave?.();
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl border border-white/[0.08] bg-[#111214] p-4 sm:p-5 transition-all duration-300 ease-out hover:-translate-y-1.5 cursor-default flex flex-col justify-between select-none overflow-hidden h-full"
      style={{
        boxShadow: isHovered
          ? `0 12px 28px -6px ${brandColor}25, 0 8px 12px -6px rgba(0, 0, 0, 0.6)`
          : undefined,
        borderColor: isHovered ? `${brandColor}40` : undefined
      }}
    >
      {/* Subtle background ambient glow on hover */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl transition-opacity duration-500 ease-out"
        style={{
          backgroundColor: brandColor,
          opacity: isHovered ? 0.15 : 0
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          {/* Technology Logo Container */}
          <div
            className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#1a1b1e] transition-all duration-300 group-hover:scale-105"
            style={{
              borderColor: isHovered ? `${brandColor}50` : undefined,
              boxShadow: isHovered ? `0 0 16px ${brandColor}30` : undefined
            }}
          >
            {skill.simpleIcon ? (
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 sm:h-7 sm:w-7 transition-all duration-300"
                style={{
                  fill: isHovered ? brandColor : '#94a3b8',
                  filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
                  opacity: isHovered ? 1 : 0.65,
                  transform: isHovered ? 'scale(1.08)' : 'scale(1)'
                }}
              >
                <path d={skill.simpleIcon.path} />
              </svg>
            ) : Icon ? (
              <Icon
                className="h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300"
                style={{
                  color: isHovered ? brandColor : '#94a3b8',
                  opacity: isHovered ? 1 : 0.65,
                  transform: isHovered ? 'scale(1.08)' : 'scale(1)'
                }}
              />
            ) : null}
          </div>

          {/* Category Tag */}
          <span className="text-[10px] font-mono font-medium uppercase px-2.5 py-1 border border-white/10 bg-white/5 text-slate-400 rounded-md tracking-wider">
            {skill.category}
          </span>
        </div>

        <h3 className="font-display font-bold text-base sm:text-lg text-white tracking-tight transition-colors">
          {skill.name}
        </h3>
        <p className="text-xs text-slate-400 font-sans mt-1.5 leading-relaxed">
          {skill.description}
        </p>
      </div>

      {/* Footer Proficiency Indicator */}
      <div className="relative z-10 mt-5 pt-3.5 border-t border-dashed border-white/[0.08] flex items-center justify-between text-[11px] font-mono">
        <span className="text-slate-500">Proficiency</span>
        <div className="flex items-center gap-1.5 font-medium transition-colors">
          <span
            className="h-1.5 w-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: isHovered ? brandColor : '#60a5fa',
              boxShadow: isHovered ? `0 0 8px ${brandColor}` : undefined
            }}
          />
          <span
            className="transition-colors duration-300"
            style={{ color: isHovered ? brandColor : '#94a3b8' }}
          >
            {skill.proficiency}
          </span>
        </div>
      </div>
    </article>
  );
};
