import React, { useState, useEffect, useCallback } from 'react';

interface PageLoaderProps {
  onComplete: () => void;
}

const LOADING_LINES = [
  '> initializing system...',
  '> loading portfolio modules...',
  '> compiling assets...',
  '> connecting interfaces...',
  '> ready.',
];

export const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isFading, setIsFading] = useState(false);

  const finishLoading = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  }, [onComplete]);

  // Progress counter 0 → 100
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const intervalMs = 20;
    const step = 100 / (duration / intervalMs);
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, []);

  // Terminal text typing — reveal lines progressively
  useEffect(() => {
    const lineDelay = 400;
    const timers: ReturnType<typeof setTimeout>[] = [];
    LOADING_LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
        }, lineDelay * (i + 1))
      );
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  // When progress reaches 100, start fade out
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(finishLoading, 300);
      return () => clearTimeout(timer);
    }
  }, [progress, finishLoading]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center transition-opacity duration-500 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ pointerEvents: isFading ? 'none' : 'auto' }}
    >
      <div className="w-full max-w-md px-8">
        {/* Terminal text */}
        <div className="font-mono text-sm space-y-1.5 mb-8 min-h-[140px]">
          {LOADING_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className={`transition-opacity duration-300 ${
                i === visibleLines - 1 ? 'text-white' : 'text-white/40'
              }`}
            >
              {line}
              {i === visibleLines - 1 && (
                <span className="inline-block w-2 h-4 bg-white/70 ml-1 animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="relative">
          <div className="h-[1px] w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/80 transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
              loading
            </span>
            <span className="text-xs font-mono text-white/60 tabular-nums">
              {String(Math.round(progress)).padStart(3, '0')}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

