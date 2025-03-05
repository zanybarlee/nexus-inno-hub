
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export interface CollaborationMessage {
  id: string;
  sender: string;
  time: string;
  content: string;
  type: 'text' | 'file' | 'system';
  fileName?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  participants: {
    id: string;
    name: string;
    role: string;
    isOnline: boolean;
  }[];
  documents: {
    id: string;
    name: string;
    type: string;
    date: string;
  }[];
}

export const useCollaborationMessages = (projectId: string) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<CollaborationMessage[]>([]);
  const [project, setProject] = useState<ProjectData | null>(null);
  
  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      // Mock project data
      const mockProject = {
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
      
      // Mock messages with fixed apostrophe syntax
      const mockMessages = [
        { id: '1', sender: 'Ahmad (QP)', time: '10:30 AM', content: "I've reviewed the structural plans and have some concerns about the load-bearing walls on levels 5-8.", type: 'text' as const },
        { id: '2', sender: 'Sarah (Developer)', time: '10:35 AM', content: 'Thanks for the feedback. Can you highlight the specific areas in the BIM model?', type: 'text' as const },
        { id: '3', sender: 'System', time: '10:38 AM', content: 'Ahmad (QP) has shared a document: Structural Analysis Report', type: 'system' as const },
        { id: '4', sender: 'Ahmad (QP)', time: '10:40 AM', content: "I've annotated the areas of concern in the attached report. We'll need to revise the column placement.", type: 'text' as const },
        { id: '5', sender: 'Li Wei (Engineer)', time: '10:45 AM', content: "I can work on revising the structural design. What's the timeline for this?", type: 'text' as const },
        { id: '6', sender: 'Sarah (Developer)', time: '10:47 AM', content: 'We should aim to have the revised plans by end of week. The authority review is scheduled for next Tuesday.', type: 'text' as const },
        { id: '7', sender: 'Michael (Architect)', time: '11:00 AM', content: "Adjusting the column placement might affect the lobby layout. I'll review the changes once Li Wei has updated the structural plans.", type: 'text' as const }
      ];
      
      setProject(mockProject);
      setMessages(mockMessages);
      setLoading(false);
    };
    
    fetchData();
  }, [projectId]);
  
  const addMessage = (message: CollaborationMessage) => {
    setMessages(prev => [...prev, message]);
  };
  
  const handleSendMessage = (newMessage: string, selectedFile: File | null) => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentUser = 'Ahmad (QP)';
    
    if (selectedFile) {
      const fileMessage: CollaborationMessage = {
        id: Date.now().toString(),
        sender: currentUser,
        time: currentTime,
        content: `Shared file: ${selectedFile.name}`,
        type: 'file',
        fileName: selectedFile.name
      };
      addMessage(fileMessage);
      
      toast({
        title: 'File Uploaded',
        description: `${selectedFile.name} has been shared with the team.`
      });
    }
    
    if (newMessage.trim()) {
      const textMessage: CollaborationMessage = {
        id: Date.now().toString(),
        sender: currentUser,
        time: currentTime,
        content: newMessage,
        type: 'text'
      };
      addMessage(textMessage);
    }
  };
  
  return {
    loading,
    messages,
    project,
    handleSendMessage
  };
};
