import React, { useRef, useEffect } from 'react';

export const LanguagesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    let phase = 0;
    const waveCount = 5;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      phase += 0.012;
      const centerY = canvas.height / 2;

      ctx.lineWidth = 1;

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.strokeStyle = i % 2 === 0
          ? `rgba(96, 165, 250, ${0.06 + i * 0.02})`
          : `rgba(16, 185, 129, ${0.05 + i * 0.015})`;

        const amplitude = 18 + i * 6;
        const frequency = 0.003 + i * 0.001;

        for (let x = 0; x <= canvas.width + 10; x += 15) {
          const wave = Math.sin(x * frequency + phase + i * 0.8) * amplitude;

          const dx = x - mouseRef.current.x;
          const dy = (centerY + wave) - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let warp = 0;
          if (dist < 160) {
            warp = (1 - dist / 160) * 30;
          }

          const y = centerY + wave + (dy > 0 ? warp : -warp);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

