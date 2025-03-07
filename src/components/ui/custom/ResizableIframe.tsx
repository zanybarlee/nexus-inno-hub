
import React from 'react';
import { Mic, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useResizableIframe } from './resizable-iframe/useResizableIframe';
import IframeHeader from './resizable-iframe/IframeHeader';
import ResizeHandle from './resizable-iframe/ResizeHandle';
import { ResizableIframeProps } from './resizable-iframe/types';

const ResizableIframe: React.FC<ResizableIframeProps> = ({ 
  url, 
  initialWidth = 500, 
  initialHeight = 400 
}) => {
  const {
    isDetached,
    isMinimized,
    position,
    size,
    iframeRef,
    toggleDetached,
    toggleMinimized,
    handleClose,
    handleDragStart,
    handleResizeStart
  } = useResizableIframe(initialWidth, initialHeight);

  return (
    <>
      {/* Voice Bot Button (Minimized State) */}
      {isMinimized && (
        <button 
          onClick={toggleMinimized} 
          className="fixed bottom-5 right-20 z-40 flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          title="Open Voice Bot"
        >
          <Mic className="h-6 w-6" />
        </button>
      )}
      
      {/* Close Button (When iFrame is visible and detached) */}
      {!isMinimized && isDetached && (
        <button 
          onClick={handleClose} 
          className="fixed bottom-5 right-20 z-40 flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-all"
          title="Close Voice Bot"
        >
          <X className="h-6 w-6" />
        </button>
      )}
      
      {/* iFrame Container */}
      {!isMinimized && (
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
          <IframeHeader 
            isDetached={isDetached}
            onDragStart={handleDragStart}
            toggleDetached={toggleDetached}
            handleClose={handleClose}
          />
          
          <div className="flex-grow relative">
            <iframe 
              src={url} 
              className="w-full h-full border-none"
              title="Voice Bot"
              allow="microphone; camera; autoplay; clipboard-write; encrypted-media"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
            />
          </div>
          
          {isDetached && (
            <ResizeHandle onMouseDown={handleResizeStart} />
          )}
        </div>
      )}
    </>
  );
};

export default ResizableIframe;
