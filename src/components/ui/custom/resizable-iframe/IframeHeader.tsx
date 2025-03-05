
import React from 'react';
import { Move, Minimize2, Maximize2, X, Mic } from 'lucide-react';

interface IframeHeaderProps {
  isDetached: boolean;
  onDragStart: (e: React.MouseEvent) => void;
  toggleDetached: () => void;
  toggleMinimized: () => void;
  handleClose: () => void;
}

const IframeHeader: React.FC<IframeHeaderProps> = ({
  isDetached,
  onDragStart,
  toggleDetached,
  toggleMinimized,
  handleClose
}) => {
  return (
    <div 
      className="flex items-center justify-between px-3 py-2 bg-secondary border-b cursor-move"
      onMouseDown={onDragStart}
    >
      <div className="flex items-center">
        <Mic className="h-4 w-4 mr-2 text-primary" />
        <span className="text-sm font-medium">Voice Bot</span>
      </div>
      <div className="flex items-center space-x-1">
        <button 
          onClick={toggleMinimized} 
          className="p-1 hover:bg-background/80 rounded"
          title="Minimize"
        >
          <Minimize2 className="h-4 w-4 text-muted-foreground" />
        </button>
        {isDetached ? (
          <button 
            onClick={toggleDetached} 
            className="p-1 hover:bg-background/80 rounded"
            title="Dock"
          >
            <Minimize2 className="h-4 w-4 text-muted-foreground" />
          </button>
        ) : (
          <button 
            onClick={toggleDetached} 
            className="p-1 hover:bg-background/80 rounded"
            title="Detach"
          >
            <Maximize2 className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
        <button 
          onClick={handleClose} 
          className="p-1 hover:bg-background/80 rounded"
          title="Close"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default IframeHeader;
