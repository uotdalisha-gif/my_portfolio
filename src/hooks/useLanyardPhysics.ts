import { useState, useEffect, useRef, useCallback } from 'react';

interface PhysicsPosition {
  x: number;
  y: number;
}

export function useLanyardPhysics() {
  const [position, setPosition] = useState<PhysicsPosition>({ x: 0, y: 0 });
  const [rotation, setRotation] = useState<number>(-3);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dragStart = useRef<PhysicsPosition>({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0, vx: 0, vy: 0, rot: -3, vRot: 0 });

  useEffect(() => {
    let animationFrameId: number;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setPosition({ x: 0, y: 0 });
      setRotation(0);
      return;
    }

    const updatePhysics = () => {
      if (!isDragging) {
        const stiffness = 0.055;
        const damping = 0.82;
        const gravity = 0.12;

        const ax = -currentPos.current.x * stiffness;
        const ay = -currentPos.current.y * stiffness - gravity;

        currentPos.current.vx = (currentPos.current.vx + ax) * damping;
        currentPos.current.vy = (currentPos.current.vy + ay) * damping;

        currentPos.current.x += currentPos.current.vx;
        currentPos.current.y += currentPos.current.vy;

        const targetRot = currentPos.current.x * 0.14 + currentPos.current.vx * 1.5;
        const rotSpring = (targetRot - currentPos.current.rot) * 0.1;
        currentPos.current.vRot = (currentPos.current.vRot + rotSpring) * 0.78;
        currentPos.current.rot += currentPos.current.vRot;

        setPosition({ x: currentPos.current.x, y: currentPos.current.y });
        setRotation(currentPos.current.rot);
      }
      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging]);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // In case element detached or capture not supported
    }
    dragStart.current = {
      x: e.clientX - currentPos.current.x,
      y: e.clientY - currentPos.current.y
    };
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;

    currentPos.current.vx = newX - currentPos.current.x;
    currentPos.current.vy = newY - currentPos.current.y;
    currentPos.current.x = newX;
    currentPos.current.y = newY;
    currentPos.current.rot = newX * 0.12;

    setPosition({ x: newX, y: newY });
    setRotation(newX * 0.12);
  }, [isDragging]);

  const handlePointerUp = useCallback((e?: React.PointerEvent<HTMLDivElement>) => {
    if (e && e.pointerId) {
      try {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Safe fallback
      }
    }
    setIsDragging(false);
  }, []);

  return {
    position,
    rotation,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp
  };
}

