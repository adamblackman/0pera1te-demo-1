import { useState, useEffect, useCallback, RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
}

export function useMousePosition(ref?: RefObject<HTMLElement>): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (ref?.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({
        x,
        y,
        normalizedX: x / rect.width,
        normalizedY: y / rect.height,
      });
    } else {
      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX: e.clientX / window.innerWidth,
        normalizedY: e.clientY / window.innerHeight,
      });
    }
  }, [ref]);

  useEffect(() => {
    const element = ref?.current || window;
    element.addEventListener('mousemove', handleMouseMove as EventListener);
    return () => {
      element.removeEventListener('mousemove', handleMouseMove as EventListener);
    };
  }, [handleMouseMove, ref]);

  return position;
}
