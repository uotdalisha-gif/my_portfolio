import React, { useState, useEffect } from 'react';

interface WelcomeLoaderProps {
  onComplete: () => void;
}

const FULL_NAME = 'UOT DALISHA';
const ROLE_TEXT = 'IT Specialist & Developer';

export const WelcomeLoader: React.FC<WelcomeLoaderProps> = ({ onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [lineExpanded, setLineExpanded] = useState(false);
  const [showTagline, setShowTagline] = useState(false);
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    // Check sessionStorage
    if (sessionStorage.getItem('loaderShown')) {
      onComplete();
      return;
    }

    // Step 1: 0.0s to 0.8s - Typing effect
    const charDelay = 800 / FULL_NAME.length; // ~72ms per char
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    for (let i = 1; i <= FULL_NAME.length; i++) {
      timeouts.push(
        setTimeout(() => {
          setDisplayText(FULL_NAME.slice(0, i));
        }, i * charDelay)
      );
    }

    // Step 2: 0.8s to 1.6s - Line expands, cursor fades
    timeouts.push(
      setTimeout(() => {
        setCursorVisible(false);
        setLineExpanded(true);
      }, 800)
    );

    // Step 3: 1.6s to 2.4s - Tagline fades in and slides up
    timeouts.push(
      setTimeout(() => {
        setShowTagline(true);
      }, 1600)
    );

    // Step 4: 2.4s to 3.0s - Entire loader slides up out of view
    timeouts.push(
      setTimeout(() => {
        setSlideUp(true);
      }, 2400)
    );

    // Step 5: 3.0s - Finish and signal parent to fade in main content
    timeouts.push(
      setTimeout(() => {
        sessionStorage.setItem('loaderShown', 'true');
        onComplete();
      }, 3000)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center pointer-events-none transition-transform duration-600 ease-in-out`}
      style={{
        transform: slideUp ? 'translateY(-100%)' : 'translateY(0%)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      {/* Noise filter */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <filter id="loader-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#loader-grain)" opacity="0.03" />
      </svg>

      {/* Radial soft glow blob in center */}
      <div
        className="absolute rounded-full bg-[#60a5fa] pointer-events-none"
        style={{
          width: '40vw',
          height: '40vw',
          maxWidth: '400px',
          maxHeight: '400px',
          opacity: 0.06,
          filter: 'blur(80px)',
        }}
      />

      {/* Centered Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-lg w-full">
        {/* Name / Initials with typing cursor */}
        <div className="flex items-center justify-center min-h-[4rem]">
          <h1
            className="text-white font-display font-bold tracking-tight text-[clamp(2rem,6vw,3.75rem)] select-none"
            style={{ letterSpacing: '-0.02em' }}
          >
            {displayText}
          </h1>
          {cursorVisible && (
            <span
              className="inline-block text-[#60a5fa] font-mono text-[clamp(2rem,6vw,3.75rem)] ml-1 animate-pulse"
              style={{ lineHeight: 1 }}
            >
              |
            </span>
          )}
        </div>

        {/* Horizontal Line Expanding */}
        <div className="w-full flex justify-center my-3 h-[2px]">
          <div
            className="h-full bg-[#60a5fa] rounded-full transition-all duration-600 ease-in-out"
            style={{
              width: lineExpanded ? '100%' : '0%',
              opacity: lineExpanded ? 0.9 : 0,
            }}
          />
        </div>

        {/* Tagline / Role fading in and sliding up */}
        <div
          className="transition-all duration-500 ease-out select-none min-h-[1.75rem]"
          style={{
            opacity: showTagline ? 1 : 0,
            transform: showTagline ? 'translateY(0px)' : 'translateY(10px)',
          }}
        >
          <p className="text-slate-400 font-mono text-xs sm:text-sm tracking-widest uppercase">
            {ROLE_TEXT}
          </p>
        </div>
      </div>
    </div>
  );
};

