import React, { useState, useEffect } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
  speed?: number;
}

const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________010101XYZ';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  trigger = true,
  speed = 25
}) => {
  const [displayText, setDisplayText] = useState<string>(text);

  useEffect(() => {
    if (!trigger) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((_, index) => {
            if (index < iteration) {
              return text[index];
            }
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, speed);

    return () => clearInterval(interval);
  }, [text, trigger, speed]);

  return <span className={className}>{displayText}</span>;
};
