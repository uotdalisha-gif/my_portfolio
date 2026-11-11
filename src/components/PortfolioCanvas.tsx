import React, { useRef, useEffect } from 'react';

export const PortfolioCanvas: React.FC = () => {
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

    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      offset = (offset + 0.3) % 40;

      const gridSpacing = 44;

      ctx.lineWidth = 1;

      // 1. Draw subtle diagonal isometric lines
      const diagCount = Math.ceil((canvas.width + canvas.height) / gridSpacing) + 2;
      for (let i = -diagCount; i < diagCount; i++) {
        const startX = i * gridSpacing + offset;
        ctx.beginPath();
        ctx.strokeStyle = i % 4 === 0 ? 'rgba(96, 165, 250, 0.07)' : 'rgba(255, 255, 255, 0.025)';
        ctx.moveTo(startX, 0);
        ctx.lineTo(startX + canvas.height, canvas.height);
        ctx.stroke();
      }

      // 2. Draw subtle horizontal grid scanlines
      const rowCount = Math.ceil(canvas.height / gridSpacing) + 1;
      for (let r = 0; r < rowCount; r++) {
        const y = r * gridSpacing;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 3. Interactive CAD cursor warp & glowing inspection rings
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        // Radial inspection glow
        const radGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 220);
        radGrad.addColorStop(0, 'rgba(96, 165, 250, 0.08)');
        radGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.03)');
        radGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(mx, my, 220, 0, Math.PI * 2);
        ctx.fill();

        // Technical crosshair radar
        ctx.strokeStyle = 'rgba(96, 165, 250, 0.2)';
        ctx.beginPath();
        ctx.arc(mx, my, 35, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mx, my, 70, 0, Math.PI * 2);
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
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
