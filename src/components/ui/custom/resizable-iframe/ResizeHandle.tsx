
import React from 'react';

interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ onMouseDown }) => {
  return (
    <div
      className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize"
      onMouseDown={onMouseDown}
    >
      <div className="absolute bottom-1 right-1 w-3 h-3 bg-muted-foreground opacity-70 rounded-bl"></div>
    </div>
  );
};

export default ResizeHandle;
