
import { useState, useRef, useEffect } from 'react';
import { Position, Size, ResizeStart } from './types';

export function useResizableIframe(initialWidth: number, initialHeight: number) {
  const [isDetached, setIsDetached] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 20, y: 20 });
  const [size, setSize] = useState<Size>({ width: initialWidth, height: initialHeight });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState<ResizeStart>({ x: 0, y: 0, width: 0, height: 0 });
  const iframeRef = useRef<HTMLDivElement>(null);

  // Handle drag events
  const handleDragStart = (e: React.MouseEvent) => {
    if (!isDetached) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  // Handle resize events
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }

      if (isResizing) {
        const newWidth = Math.max(300, resizeStart.width + (e.clientX - resizeStart.x));
        const newHeight = Math.max(200, resizeStart.height + (e.clientY - resizeStart.y));
        
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
  }, [isDragging, isResizing, dragStart, resizeStart]);

  const toggleDetached = () => {
    setIsDetached(!isDetached);
  };

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    setIsMinimized(true);
  };

  const handleButtonClick = () => {
    setIsMinimized(false);
    setIsDetached(true);
    
    // Center the iframe on the screen
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    setPosition({
      x: Math.max(0, (viewportWidth - size.width) / 2),
      y: Math.max(0, (viewportHeight - size.height) / 2)
    });
  };

  return {
    isDetached,
    isMinimized,
    position,
    size,
    isDragging,
    iframeRef,
    toggleDetached,
    toggleMinimized,
    handleClose,
    handleDragStart,
    handleResizeStart,
    handleButtonClick
  };
}
