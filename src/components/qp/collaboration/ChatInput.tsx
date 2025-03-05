
import { useState } from 'react';
import { Paperclip, Send, X } from 'lucide-react';
import { FileText } from 'lucide-react';
import Button from '@/components/ui/custom/Button';
import { toast } from '@/hooks/use-toast';

interface ChatInputProps {
  onSendMessage: (messageText: string, file: File | null) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && !selectedFile) return;
    
    onSendMessage(newMessage, selectedFile);
    setNewMessage('');
    setSelectedFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="border-t p-4">
      <form onSubmit={handleSubmit} className="flex flex-col">
        {selectedFile && (
          <div className="bg-secondary mb-2 p-2 rounded-md flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm truncate">{selectedFile.name}</span>
            </div>
            <button 
              type="button" 
              onClick={removeSelectedFile}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <label className="cursor-pointer text-primary hover:text-primary/80">
            <Paperclip className="h-5 w-5" />
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </label>
          <input
            type="text"
            className="flex-1 border rounded-md px-3 py-2 outline-none focus:ring-1 focus:ring-primary"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button
            type="submit"
            variant="primary"
            size="sm"
            leftIcon={<Send size={16} />}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
