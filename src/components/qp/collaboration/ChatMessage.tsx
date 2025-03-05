
import { ReactNode } from 'react';

interface ChatMessageProps {
  id: string;
  sender: string;
  time: string;
  content: string;
  type: 'text' | 'file' | 'system';
  isCurrentUser: boolean;
}

const ChatMessage = ({ 
  id, 
  sender, 
  time, 
  content, 
  type, 
  isCurrentUser 
}: ChatMessageProps) => {
  if (type === 'system') {
    return (
      <div className="bg-secondary/50 text-center px-4 py-2 rounded-lg text-sm text-muted-foreground w-full">
        {content}
      </div>
    );
  }

  return (
    <div className={`flex items-start ${isCurrentUser ? 'justify-end' : ''}`}>
      <div className={`max-w-[80%] ${isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-card border'} rounded-lg px-4 py-3`}>
        <div className="flex justify-between items-center mb-1">
          <span className={`text-xs font-medium ${isCurrentUser ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
            {sender}
          </span>
          <span className={`text-xs ${isCurrentUser ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
            {time}
          </span>
        </div>
        {type === 'file' ? (
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            <span>{content}</span>
          </div>
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
  );
};

// Fix: Missing import
import { FileText } from 'lucide-react';

export default ChatMessage;
