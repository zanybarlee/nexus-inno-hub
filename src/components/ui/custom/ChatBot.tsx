
import React, { useRef } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChatBot } from './chatbot/useChatBot';
import { useFloatingWindow } from './chatbot/useFloatingWindow';
import ChatHeader from './chatbot/ChatHeader';
import MessageList from './chatbot/MessageList';
import ChatInput from './chatbot/ChatInput';
import ResizeHandle from './chatbot/ResizeHandle';

const ChatBot: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    messages,
    input,
    setInput,
    isLoading,
    messagesEndRef,
    resetChat,
    handleSendMessage,
    handleKeyDown
  } = useChatBot();

  const {
    isFloating,
    position,
    size,
    toggleFloatMode,
    handleDragStart,
    handleResizeStart
  } = useFloatingWindow();

  const chatWindowRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {(!isOpen || !isFloating) && (
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={cn(
            "flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all", 
            isOpen ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"
          )}
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      )}
      
      {isOpen && (
        <div 
          ref={chatWindowRef} 
          className={cn(
            "bg-background border rounded-lg shadow-lg flex flex-col overflow-hidden", 
            isFloating ? "fixed" : "absolute bottom-16 right-0"
          )} 
          style={isFloating ? {
            width: `${size.width}px`,
            height: `${size.height}px`,
            left: `${position.x}px`,
            top: `${position.y}px`,
            transition: 'width 0.2s, height 0.2s'
          } : {
            width: 'w-80 sm:w-96',
            height: '24rem'
          }}
        >
          <ChatHeader 
            onReset={resetChat}
            toggleFloatMode={toggleFloatMode}
            isFloating={isFloating}
            onClose={() => isFloating ? setIsOpen(false) : setIsOpen(false)}
            handleDragStart={handleDragStart}
          />
          
          <MessageList 
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />
          
          <ChatInput 
            input={input}
            setInput={setInput}
            handleSendMessage={handleSendMessage}
            handleKeyDown={handleKeyDown}
            isLoading={isLoading}
          />
          
          {isFloating && (
            <ResizeHandle onMouseDown={handleResizeStart} />
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
