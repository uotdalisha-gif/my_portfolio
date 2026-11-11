import React, { useRef, useEffect } from 'react';

export const TimelineCanvas: React.FC = () => {
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

    let pulseY = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      pulseY = (pulseY + 0.8) % (canvas.height || 1);

      const spacing = 50;
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      // Draw faint milestone timeline guide down the center
      const centerX = canvas.width / 2;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.05)';
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 6]);
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Subtle pulse dot traveling down the axis
      ctx.beginPath();
      ctx.arc(centerX, pulseY, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(96, 165, 250, 0.35)';
      ctx.fill();

      // Draw matrix of crosshairs and interactive nodes
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing;
          const y = r * spacing;

          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          if (dist < maxDist) {
            const proximity = 1 - dist / maxDist;
            const size = 3 + proximity * 3;

            // Draw glowing crosshair near cursor
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.12 + proximity * 0.35})`;
            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(x - size, y);
            ctx.lineTo(x + size, y);
            ctx.moveTo(x, y - size);
            ctx.lineTo(x, y + size);
            ctx.stroke();

            // Connecting line to cursor if close
            if (dist < 110) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(96, 165, 250, ${(1 - dist / 110) * 0.18})`;
              ctx.moveTo(x, y);
              ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
              ctx.stroke();
            }
          } else {
            // Subtle ambient dot for undisturbed grid
            ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
            ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
          }
        }
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
