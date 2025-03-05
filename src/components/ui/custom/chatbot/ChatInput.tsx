
import React from 'react';
import { Send } from 'lucide-react';
import Button from '@/components/ui/custom/Button';

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  input, 
  setInput, 
  handleSendMessage, 
  handleKeyDown, 
  isLoading 
}) => {
  return (
    <div className="p-3 border-t">
      <div className="flex items-center">
        <input 
          type="text" 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          onKeyDown={handleKeyDown} 
          placeholder="Type your message..." 
          className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary" 
          disabled={isLoading} 
        />
        <Button 
          onClick={handleSendMessage} 
          variant="primary" 
          size="sm" 
          className="rounded-l-none" 
          disabled={isLoading || !input.trim()}
        >
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
