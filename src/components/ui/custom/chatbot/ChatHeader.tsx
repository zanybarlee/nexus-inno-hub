
import React from 'react';
import { cn } from '@/lib/utils';
import { MessageSquare, RotateCcw, Maximize2, Minimize2, X } from 'lucide-react';

interface ChatHeaderProps {
  onReset: () => void;
  toggleFloatMode: () => void;
  isFloating: boolean;
  onClose: () => void;
  handleDragStart: (e: React.MouseEvent) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  onReset, 
  toggleFloatMode, 
  isFloating, 
  onClose, 
  handleDragStart 
}) => {
  return (
    <div 
      className={cn(
        "bg-primary text-primary-foreground p-3 flex items-center", 
        isFloating && "cursor-move"
      )} 
      onMouseDown={handleDragStart}
    >
      <MessageSquare size={18} className="mr-2" />
      <h3 className="font-medium text-lg">CIDB ChatBot</h3>
      <div className="ml-auto flex items-center gap-2">
        <button 
          onClick={onReset} 
          className="text-primary-foreground/80 hover:text-primary-foreground" 
          title="Clear chat"
        >
          <RotateCcw size={16} />
        </button>
        <button 
          onClick={toggleFloatMode} 
          className="text-primary-foreground/80 hover:text-primary-foreground" 
          title={isFloating ? "Dock chatbot" : "Float chatbot"}
        >
          {isFloating ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
        <button 
          onClick={onClose} 
          className="text-primary-foreground/80 hover:text-primary-foreground"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
