import React from 'react';
import { CursorVariant } from '../types/portfolio';

interface CustomCursorProps {
  position: { x: number; y: number };
  cursorText: string;
  cursorVariant: CursorVariant;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  position,
  cursorVariant
}) => {
  const isHovering = cursorVariant === 'hover' || cursorVariant === 'drag';

  return (
    <>
      {/* Subtle ambient spotlight with smooth lag trail */}
      <div
        className="pointer-events-none fixed z-30 rounded-full opacity-20 mix-blend-screen"
        style={{
          width: '500px',
          height: '500px',
          top: '-250px',
          left: '-250px',
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: 'transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, rgba(96, 165, 250, 0.03) 40%, transparent 70%)'
        }}
      />

      {/* Custom cursor dot → ring with mix-blend-mode: difference */}
      <div
        className="hidden md:block pointer-events-none fixed z-50 rounded-full"
        style={{
          top: 0,
          left: 0,
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          transition: 'transform 80ms ease-out, width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
          width: isHovering ? '40px' : '8px',
          height: isHovering ? '40px' : '8px',
          backgroundColor: isHovering ? 'transparent' : 'white',
          border: isHovering ? '1.5px solid white' : 'none',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
};
