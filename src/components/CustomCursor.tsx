import React from 'react';

interface CustomCursorProps {
  position: { x: number; y: number };
  cursorText?: string;
  cursorVariant?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ position }) => {
  // If mouse is off-screen, don't render ambient glow
  if (position.x < 0 || position.y < 0) return null;

  return (
    /* Gentle ambient spotlight illumination following the mouse - no fake cursor dots or color inversion */
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-30 rounded-full opacity-20 mix-blend-screen hidden md:block"
      style={{
        width: '550px',
        height: '550px',
        top: '-275px',
        left: '-275px',
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: 'transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        background:
          'radial-gradient(circle, rgba(96, 165, 250, 0.08) 0%, rgba(59, 130, 246, 0.02) 45%, transparent 70%)'
      }}
    />
  );
};
