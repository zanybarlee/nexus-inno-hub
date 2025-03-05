
import { useState, useRef, useEffect } from 'react';
import { Maximize2, Minimize2, Move, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResizableIframeProps {
  url: string;
  initialWidth?: number;
  initialHeight?: number;
}

const ResizableIframe = ({ 
  url, 
  initialWidth = 500, 
  initialHeight = 400 
}: ResizableIframeProps) => {
  const [isDetached, setIsDetached] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
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

  return (
    <div 
      ref={iframeRef}
      className={cn(
        "bg-white rounded-md shadow-md overflow-hidden border border-border flex flex-col transition-all",
        isDetached ? "fixed z-50" : "relative"
      )}
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        left: isDetached ? position.x : 'auto',
        top: isDetached ? position.y : 'auto',
        resize: isDetached ? 'none' : 'both'
      }}
    >
      <div 
        className="flex items-center justify-between px-3 py-2 bg-secondary border-b cursor-move"
        onMouseDown={handleDragStart}
      >
        <div className="flex items-center">
          <Move className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-sm font-medium">External Content</span>
        </div>
        <div className="flex items-center space-x-1">
          {isDetached ? (
            <button 
              onClick={toggleDetached} 
              className="p-1 hover:bg-background/80 rounded"
            >
              <Minimize2 className="h-4 w-4 text-muted-foreground" />
            </button>
          ) : (
            <button 
              onClick={toggleDetached} 
              className="p-1 hover:bg-background/80 rounded"
            >
              <Maximize2 className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
          <button 
            onClick={() => iframeRef.current?.remove()} 
            className="p-1 hover:bg-background/80 rounded"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="flex-grow relative">
        <iframe 
          src={url} 
          className="w-full h-full border-none"
          title="External Content"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
      {isDetached && (
        <div
          className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize"
          onMouseDown={handleResizeStart}
        >
          <div className="absolute bottom-1 right-1 w-3 h-3 bg-muted-foreground opacity-70 rounded-bl"></div>
        </div>
      )}
    </div>
  );
};

export default ResizableIframe;
