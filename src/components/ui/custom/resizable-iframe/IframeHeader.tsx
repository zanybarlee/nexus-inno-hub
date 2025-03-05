
import React from 'react';
import { Maximize2, X, Mic } from 'lucide-react';

interface IframeHeaderProps {
  isDetached: boolean;
  onDragStart: (e: React.MouseEvent) => void;
  toggleDetached: () => void;
  handleClose: () => void;
}

const IframeHeader: React.FC<IframeHeaderProps> = ({
  isDetached,
  onDragStart,
  toggleDetached,
  handleClose
}) => {
  return (
    <div 
      className="flex items-center justify-between px-3 py-2 bg-primary text-primary-foreground border-b cursor-move"
      onMouseDown={onDragStart}
    >
      <div className="flex items-center">
        <Mic className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">Voice Bot</span>
      </div>
      <div className="flex items-center space-x-1">
        {isDetached ? (
          <button 
            onClick={toggleDetached} 
            className="p-1 hover:bg-primary-foreground/10 rounded"
            title="Dock"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
        ) : (
          <button 
            onClick={toggleDetached} 
            className="p-1 hover:bg-primary-foreground/10 rounded"
            title="Detach"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        )}
        <button 
          onClick={handleClose} 
          className="p-1 hover:bg-primary-foreground/10 rounded"
          title="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default IframeHeader;
