
import { useState, useEffect, RefObject } from 'react';
import { Position, Size, ResizeStart } from './types';

export function useFloatingWindow() {
  const [isFloating, setIsFloating] = useState(false);
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0
  });
  const [size, setSize] = useState<Size>({
    width: 384,
    height: 384
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({
    x: 0,
    y: 0
  });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState<ResizeStart>({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        setPosition(prev => ({
          x: prev.x + dx,
          y: prev.y + dy
        }));
        setDragStart({
          x: e.clientX,
          y: e.clientY
        });
      }
      if (isResizing) {
        const dx = e.clientX - resizeStart.x;
        const dy = e.clientY - resizeStart.y;

        const newWidth = Math.max(280, resizeStart.width + dx);
        const newHeight = Math.max(300, resizeStart.height + dy);
        setSize({
          width: newWidth,
          height: newHeight
        });
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, isResizing, resizeStart]);

  const toggleFloatMode = () => {
    if (!isFloating) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      setPosition({
        x: viewportWidth / 2 - size.width / 2,
        y: viewportHeight / 2 - size.height / 2
      });
    }
    setIsFloating(!isFloating);
  };

  const handleDragStart = (e: React.MouseEvent) => {
    if (!isFloating) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    if (!isFloating) return;
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      width: size.width,
      height: size.height,
      x: e.clientX,
      y: e.clientY
    });
  };

  return {
    isFloating,
    position,
    size,
    toggleFloatMode,
    handleDragStart,
    handleResizeStart
  };
}
