import React from 'react';

/**
 * Full-screen SVG noise/grain texture overlay.
 * Sits on top of everything at z-index 9999 but doesn't block clicks.
 * Gives the site a film-like, tactile quality.
 */
export const GrainOverlay: React.FC = () => {
  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 9998 }}
      aria-hidden="true"
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#grain-noise)"
          opacity="0.035"
        />
      </svg>
    </div>
  );
};

