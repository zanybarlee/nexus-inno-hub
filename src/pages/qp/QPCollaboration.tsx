
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, MessageSquare, Eye, Upload, PanelLeft, PanelRight, FileText, Send, Paperclip, X } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/custom/Button';
import { toast } from '@/hooks/use-toast';

const QPCollaboration = () => {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  
  // Mock project data
  const project = {
    id: projectId,
    title: projectId === '1' ? 'Kuala Lumpur Tower Development' : 
           projectId === '2' ? 'Johor Bahru Waterfront Project' : 
           projectId === '3' ? 'Penang Heritage Renovation' : 'Unknown Project',
    participants: [
      { id: '1', name: 'Ahmad (QP)', role: 'qp', isOnline: true },
      { id: '2', name: 'Sarah (Developer)', role: 'developer', isOnline: true },
      { id: '3', name: 'Michael (Architect)', role: 'stakeholder', isOnline: false },
      { id: '4', name: 'Li Wei (Engineer)', role: 'stakeholder', isOnline: true },
      { id: '5', name: 'Raj (Authority)', role: 'authority', isOnline: false }
    ],
    documents: [
      { id: '1', name: 'BIM Model v3.0', type: 'model', date: 'Oct 10, 2023' },
      { id: '2', name: 'Structural Analysis Report', type: 'pdf', date: 'Oct 8, 2023' },
      { id: '3', name: 'Environmental Assessment', type: 'pdf', date: 'Oct 5, 2023' },
      { id: '4', name: 'Floor Plans', type: 'dwg', date: 'Oct 12, 2023' }
    ]
  };
  
  // Mock messages
  const mockMessages = [
    { id: '1', sender: 'Ahmad (QP)', time: '10:30 AM', content: 'I've reviewed the structural plans and have some concerns about the load-bearing walls on levels 5-8.', type: 'text' },
    { id: '2', sender: 'Sarah (Developer)', time: '10:35 AM', content: 'Thanks for the feedback. Can you highlight the specific areas in the BIM model?', type: 'text' },
    { id: '3', sender: 'System', time: '10:38 AM', content: 'Ahmad (QP) has shared a document: Structural Analysis Report', type: 'system' },
    { id: '4', sender: 'Ahmad (QP)', time: '10:40 AM', content: 'I've annotated the areas of concern in the attached report. We'll need to revise the column placement.', type: 'text' },
    { id: '5', sender: 'Li Wei (Engineer)', time: '10:45 AM', content: 'I can work on revising the structural design. What's the timeline for this?', type: 'text' },
    { id: '6', sender: 'Sarah (Developer)', time: '10:47 AM', content: 'We should aim to have the revised plans by end of week. The authority review is scheduled for next Tuesday.', type: 'text' },
    { id: '7', sender: 'Michael (Architect)', time: '11:00 AM', content: 'Adjusting the column placement might affect the lobby layout. I'll review the changes once Li Wei has updated the structural plans.', type: 'text' }
  ];
  
  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setMessages(mockMessages);
      setLoading(false);
    }, 800);
  }, []);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !selectedFile) return;
    
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (selectedFile) {
      const fileMessage = {
        id: Date.now().toString(),
        sender: 'Ahmad (QP)',
        time: currentTime,
        content: `Shared file: ${selectedFile.name}`,
        type: 'file',
        fileName: selectedFile.name
      };
      setMessages([...messages, fileMessage]);
      setSelectedFile(null);
      
      toast({
        title: 'File Uploaded',
        description: `${selectedFile.name} has been shared with the team.`
      });
    }
    
    if (newMessage.trim()) {
      const textMessage = {
        id: Date.now().toString(),
        sender: 'Ahmad (QP)',
        time: currentTime,
        content: newMessage,
        type: 'text'
      };
      setMessages([...messages, textMessage]);
      setNewMessage('');
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const removeSelectedFile = () => {
    setSelectedFile(null);
  };
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <MainLayout>
      <div className="pt-20 pb-0 h-screen flex flex-col">
        <div className="container max-w-7xl mx-auto px-4 flex-1 flex flex-col">
          {/* Header */}
          <div className="py-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/qp/dashboard" className="text-primary hover:text-primary/80 mr-4">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold">{project.title}</h1>
                <p className="text-sm text-muted-foreground">Collaboration Hub</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleSidebar}
                leftIcon={showSidebar ? <PanelLeft size={16} /> : <PanelRight size={16} />}
              >
                {showSidebar ? 'Hide' : 'Show'} Sidebar
              </Button>
              <Link to={`/qp/projects/${projectId}`}>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Eye size={16} />}
                >
                  View Project
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Chat area */}
            <div className="flex-1 flex flex-col">
              {/* Messages */}
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
                      <div key={message.id} className={`flex items-start ${message.sender === 'Ahmad (QP)' ? 'justify-end' : ''}`}>
                        {message.type === 'system' ? (
                          <div className="bg-secondary/50 text-center px-4 py-2 rounded-lg text-sm text-muted-foreground w-full">
                            {message.content}
                          </div>
                        ) : (
                          <div className={`max-w-[80%] ${message.sender === 'Ahmad (QP)' ? 'bg-primary text-primary-foreground' : 'bg-card border'} rounded-lg px-4 py-3`}>
                            <div className="flex justify-between items-center mb-1">
                              <span className={`text-xs font-medium ${message.sender === 'Ahmad (QP)' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{message.sender}</span>
                              <span className={`text-xs ${message.sender === 'Ahmad (QP)' ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{message.time}</span>
                            </div>
                            {message.type === 'file' ? (
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2" />
                                <span>{message.content}</span>
                              </div>
                            ) : (
                              <p>{message.content}</p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Input area */}
              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex flex-col">
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
            </div>
            
            {/* Sidebar */}
            {showSidebar && (
              <div className="w-80 border-l bg-card/50 overflow-y-auto">
                <div className="p-4 border-b">
                  <h2 className="font-semibold flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Participants
                  </h2>
                  <div className="mt-3 space-y-2">
                    {project.participants.map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between">
                        <span className="text-sm">{participant.name}</span>
                        <span className={`inline-block w-2 h-2 rounded-full ${participant.isOnline ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4">
                  <h2 className="font-semibold flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Shared Documents
                  </h2>
                  <div className="mt-3 space-y-2">
                    {project.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded-md">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-primary" />
                          <div>
                            <span className="text-sm">{doc.name}</span>
                            <p className="text-xs text-muted-foreground">{doc.date}</p>
                          </div>
                        </div>
                        <button className="text-primary hover:text-primary/80">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      leftIcon={<Upload size={14} />}
                    >
                      Upload Document
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QPCollaboration;
