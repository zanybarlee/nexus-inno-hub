
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  sender: string;
  time: string;
  content: string;
  type: 'text' | 'file' | 'system';
}

interface CollaborationMessagesProps {
  messages: Message[];
  loading: boolean;
  currentUser: string;
}

const CollaborationMessages = ({ 
  messages, 
  loading, 
  currentUser 
}: CollaborationMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-64"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              id={message.id}
              sender={message.sender}
              time={message.time}
              content={message.content}
              type={message.type}
              isCurrentUser={message.sender === currentUser}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollaborationMessages;
