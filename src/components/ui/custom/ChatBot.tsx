import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageSquare, RotateCcw, Maximize2, Minimize2, Move } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/ui/custom/Button';
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}
const INITIAL_MESSAGE = {
  id: '0',
  content: 'Hello! I am the CIDB ChatBot. How can I assist you with your building submission today?',
  sender: 'bot' as const,
  timestamp: new Date()
};
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  const [size, setSize] = useState({
    width: 384,
    height: 384
  }); // 384px is w-96
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0
  });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages]);

  // Handle document-level mouse events for dragging and resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        setPosition(prev => ({
          x: prev.x + dx,
          y: prev.y + dy
        }));
        setDragStart({
          x: e.clientX,
          y: e.clientY
        });
      }
      if (isResizing) {
        const dx = e.clientX - resizeStart.x;
        const dy = e.clientY - resizeStart.y;

        // Minimum size constraints
        const newWidth = Math.max(280, resizeStart.width + dx);
        const newHeight = Math.max(300, resizeStart.height + dy);
        setSize({
          width: newWidth,
          height: newHeight
        });
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, isResizing, resizeStart]);
  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };
  const handleDragStart = (e: React.MouseEvent) => {
    if (!isFloating) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };
  const handleResizeStart = (e: React.MouseEvent) => {
    if (!isFloating) return;
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      width: size.width,
      height: size.height,
      x: e.clientX,
      y: e.clientY
    });
  };
  const toggleFloatMode = () => {
    if (!isFloating) {
      // When entering float mode, position it relative to viewport
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      setPosition({
        x: viewportWidth / 2 - size.width / 2,
        y: viewportHeight / 2 - size.height / 2
      });
    }
    setIsFloating(!isFloating);
  };
  async function query(data: {
    question: string;
  }) {
    try {
      const response = await fetch("http://127.0.0.1:3001/api/v1/prediction/a3e43eff-de44-4e96-a88e-4f4b53cf5bb5", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result.text;
    } catch (error) {
      console.error('Error querying chatbot API:', error);
      return "I'm sorry, I'm having trouble connecting to my services. Please try again later.";
    }
  }
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    try {
      const response = await query({
        question: input
      });
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I couldn't process your request. Please try again later.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return <div className="fixed bottom-5 right-5 z-50">
      {/* Chat toggle button - only show when chat is closed or not in float mode */}
      {(!isOpen || !isFloating) && <button onClick={() => setIsOpen(!isOpen)} className={cn("flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all", isOpen ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground")}>
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>}
      
      {/* Chat window */}
      {isOpen && <div ref={chatWindowRef} className={cn("bg-background border rounded-lg shadow-lg flex flex-col overflow-hidden", isFloating ? "fixed" : "absolute bottom-16 right-0")} style={isFloating ? {
      width: `${size.width}px`,
      height: `${size.height}px`,
      left: `${position.x}px`,
      top: `${position.y}px`,
      transition: isDragging || isResizing ? 'none' : 'width 0.2s, height 0.2s'
    } : {
      width: 'w-80 sm:w-96',
      height: '24rem'
    }}>
          {/* Header - now draggable in float mode */}
          <div className={cn("bg-primary text-primary-foreground p-3 flex items-center", isFloating && "cursor-move")} onMouseDown={handleDragStart}>
            <MessageSquare size={18} className="mr-2" />
            <h3 className="font-medium text-lg">CIDB ChatBot</h3>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={resetChat} className="text-primary-foreground/80 hover:text-primary-foreground" title="Clear chat">
                <RotateCcw size={16} />
              </button>
              <button onClick={toggleFloatMode} className="text-primary-foreground/80 hover:text-primary-foreground" title={isFloating ? "Dock chatbot" : "Float chatbot"}>
                {isFloating ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button onClick={() => isFloating ? setIsOpen(false) : setIsOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
                <X size={18} />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto">
            <div className="space-y-4">
              {messages.map(message => <div key={message.id} className={cn("flex flex-col max-w-[80%] rounded-lg p-3 mb-2", message.sender === 'user' ? "ml-auto bg-primary text-primary-foreground rounded-br-none" : "mr-auto bg-secondary text-secondary-foreground rounded-bl-none")}>
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 self-end">
                    {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
                  </span>
                </div>)}
              {isLoading && <div className="flex items-center space-x-2 max-w-[80%] mr-auto bg-secondary text-secondary-foreground rounded-lg rounded-bl-none p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{
                animationDelay: '0ms'
              }}></div>
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{
                animationDelay: '150ms'
              }}></div>
                    <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{
                animationDelay: '300ms'
              }}></div>
                  </div>
                </div>}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input */}
          <div className="p-3 border-t">
            <div className="flex items-center">
              <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type your message..." className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary" disabled={isLoading} />
              <Button onClick={handleSendMessage} variant="primary" size="sm" className="rounded-l-none" disabled={isLoading || !input.trim()}>
                <Send size={16} />
              </Button>
            </div>
          </div>
          
          {/* Resize handle - only in floating mode */}
          {isFloating && <div className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize" onMouseDown={handleResizeStart}>
              <svg width="10" height="10" viewBox="0 0 10 10" className="absolute bottom-1 right-1 text-muted-foreground">
                <path d="M0,10 L10,0 M0,5 L5,0 M5,10 L10,5" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>}
        </div>}
    </div>;
};
export default ChatBot;