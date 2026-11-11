import React, { useRef, useEffect } from 'react';

export const TopographicCanvas: React.FC = () => {
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
    const numLines = 14;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;

      phase += 0.008;
      const lineSpacing = canvas.height / (numLines - 1);
      ctx.lineWidth = 1.5;

      for (let i = 0; i < numLines; i++) {
        const baseY = i * lineSpacing;
        ctx.beginPath();
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(59, 102, 245, 0.22)' : 'rgba(99, 102, 241, 0.14)';

        const step = 16;
        for (let x = 0; x <= canvas.width + step; x += step) {
          const wave =
            Math.sin(x * 0.004 + phase + i * 0.5) * 20 +
            Math.cos(x * 0.009 - phase * 0.7) * 12;

          const dx = x - mouseRef.current.x;
          const dy = (baseY + wave) - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;

          let warpY = 0;
          if (dist < maxDist) {
            const force = (1 - dist / maxDist) * 45;
            warpY = (dy > 0 ? 1 : -1) * force;
          }

          const finalY = baseY + wave + warpY;

          if (x === 0) {
            ctx.moveTo(x, finalY);
          } else {
            ctx.lineTo(x, finalY);
          }
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

