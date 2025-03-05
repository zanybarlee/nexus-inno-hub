
import { useState, useEffect, useRef } from 'react';
import { Message } from './types';

// Initial welcome message
export const INITIAL_MESSAGE: Message = {
  id: '0',
  content: 'Hello! I am the CIDB ChatBot. How can I assist you with your building submission today?',
  sender: 'bot',
  timestamp: new Date()
};

export function useChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate a unique session ID when the component mounts
  useEffect(() => {
    setSessionId(`user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  }, []);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    // Generate a new session ID when chat is reset
    setSessionId(`user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  };

  async function query(data: {
    question: string;
    overrideConfig?: {
      sessionId: string;
    };
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
        question: input,
        overrideConfig: {
          sessionId: sessionId
        }
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

  return {
    isOpen,
    setIsOpen,
    messages,
    input,
    setInput,
    isLoading,
    messagesEndRef,
    resetChat,
    handleSendMessage,
    handleKeyDown,
    sessionId
  };
}
