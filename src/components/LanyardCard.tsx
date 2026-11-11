import React from 'react';
import { useLanyardPhysics } from '../hooks/useLanyardPhysics';
import { PROFILE_DATA } from '../data/portfolioData';

interface LanyardCardProps {
  onCursorEnter?: (text: string, variant?: 'hover' | 'drag') => void;
  onCursorLeave?: () => void;
}

export const LanyardCard: React.FC<LanyardCardProps> = ({
  onCursorEnter,
  onCursorLeave
}) => {
  const {
    position,
    rotation,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp
  } = useLanyardPhysics();

  return (
    <div className="relative flex flex-col items-center select-none pt-10">
      {/* Dynamic SVG Lanyard Ribbon */}
      <svg
        className="overflow-visible pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 z-0"
        width="240"
        height="180"
        aria-hidden="true"
      >
        <circle cx="120" cy="0" r="4" fill="#222" />
        <path
          d={`M 120 0 Q ${120 + position.x * 0.45} ${80 + position.y * 0.3} ${120 + position.x} ${120 + position.y}`}
          fill="none"
          stroke="#111115"
          strokeWidth="10"
          strokeLinecap="round"
          className="drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
        />
        <path
          d={`M 120 0 Q ${120 + position.x * 0.45} ${80 + position.y * 0.3} ${120 + position.x} ${120 + position.y}`}
          fill="none"
          stroke="#444"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.7"
        />
      </svg>

      {/* Metal / Matte Dark Badge Clip */}
      <div
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) rotate(${rotation}deg)`,
          transformOrigin: 'top center'
        }}
        className="relative z-10 -mb-3 transition-none"
      >
        <div className="w-8 h-5 bg-gradient-to-b from-slate-700 to-slate-900 rounded-sm border border-slate-600 shadow-md flex items-center justify-center">
          <div className="w-4 h-1 bg-black rounded-full" />
        </div>
      </div>

      {/* Interactive Draggable ID Card (Clean White Border, Dark Portrait Slot) */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => onCursorEnter?.('DRAG', 'drag')}
        onMouseLeave={() => onCursorLeave?.()}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) rotate(${rotation}deg)`,
          transformOrigin: 'top center',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        className="relative z-10 w-64 sm:w-72 bg-[#ebecef] text-slate-900 rounded-3xl p-3 sm:p-3.5 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9)] border-[5px] border-white transition-none group touch-none"
      >
        {/* Lanyard punch hole */}
        <div className="w-10 h-2 bg-slate-400/80 rounded-full mx-auto mb-2.5 shadow-inner" />

        {/* Card Photo / Placeholder Slot */}
        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#0c0d12] border border-black/40 flex items-center justify-center shadow-inner pointer-events-none select-none">
          {PROFILE_DATA.avatarUrl ? (
            <img
              src={PROFILE_DATA.avatarUrl}
              alt="Portrait of Uot Dalisha"
              draggable={false}
              className="w-full h-full object-cover grayscale contrast-110 pointer-events-none select-none"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-500 space-y-2 p-4 text-center pointer-events-none select-none">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center">
                <span className="text-xs font-mono text-slate-400">PHOTO</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Photo slot ready</span>
            </div>
          )}

          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          {/* Subtle bottom tag */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-white/80 pointer-events-none select-none">
            <span className="tracking-widest uppercase font-bold text-white drop-shadow">DALISHA</span>
            <span className="bg-black/60 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm">ID: BBU-2026</span>
          </div>
        </div>

        <div className="text-center mt-2">
          <span className="text-[10px] font-mono text-slate-500">⚡ Drag or toss badge</span>
        </div>
      </div>
    </div>
  );
};

