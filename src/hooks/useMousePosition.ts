import { useState, useEffect, useCallback } from 'react';
import { CursorVariant } from '../types/portfolio';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition() {
  const [position, setPosition] = useState<MousePosition>({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const setCursorState = useCallback((text = '', variant: CursorVariant = 'hover') => {
    setCursorText(text);
    setCursorVariant(variant);
  }, []);

  const resetCursorState = useCallback(() => {
    setCursorText('');
    setCursorVariant('default');
  }, []);

  return {
    position,
    cursorText,
    cursorVariant,
    setCursorState,
    resetCursorState
  };
}

