
import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from './types';
import ReactMarkdown from 'react-markdown';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading, messagesEndRef }) => {
  const renderMessageContent = (message: Message) => {
    if (message.sender === 'bot') {
      return (
        <ReactMarkdown className="prose prose-sm dark:prose-invert max-w-none break-words">
          {message.content}
        </ReactMarkdown>
      );
    }
    return <p className="whitespace-pre-wrap break-words">{message.content}</p>;
  };

  return (
    <div className="flex-1 p-3 overflow-y-auto">
      <div className="space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={cn(
              "flex flex-col max-w-[80%] rounded-lg p-3 mb-2", 
              message.sender === 'user' 
                ? "ml-auto bg-primary text-primary-foreground rounded-br-none" 
                : "mr-auto bg-secondary text-secondary-foreground rounded-bl-none"
            )}
          >
            {renderMessageContent(message)}
            <span className="text-xs opacity-70 mt-1 self-end">
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 max-w-[80%] mr-auto bg-secondary text-secondary-foreground rounded-lg rounded-bl-none p-3">
            <div className="flex space-x-1">
              <div 
                className="w-2 h-2 rounded-full bg-current animate-bounce" 
                style={{ animationDelay: '0ms' }}
              ></div>
              <div 
                className="w-2 h-2 rounded-full bg-current animate-bounce" 
                style={{ animationDelay: '150ms' }}
              ></div>
              <div 
                className="w-2 h-2 rounded-full bg-current animate-bounce" 
                style={{ animationDelay: '300ms' }}
              ></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
