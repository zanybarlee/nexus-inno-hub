
import React from 'react';

interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ onMouseDown }) => {
  return (
    <div 
      className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize" 
      onMouseDown={onMouseDown}
    >
      <svg 
        width="10" 
        height="10" 
        viewBox="0 0 10 10" 
        className="absolute bottom-1 right-1 text-muted-foreground"
      >
        <path 
          d="M0,10 L10,0 M0,5 L5,0 M5,10 L10,5" 
          stroke="currentColor" 
          strokeWidth="1" 
        />
      </svg>
    </div>
  );
};

export default ResizeHandle;
