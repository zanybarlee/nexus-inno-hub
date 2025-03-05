
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';

// Import the smaller components
import ProjectHeader from '@/components/qp/collaboration/ProjectHeader';
import CollaborationMessages from '@/components/qp/collaboration/CollaborationMessages';
import ChatInput from '@/components/qp/collaboration/ChatInput';
import ProjectSidebar from '@/components/qp/collaboration/ProjectSidebar';
import { useCollaborationMessages } from '@/components/qp/collaboration/useCollaborationMessages';

const QPCollaboration = () => {
  const { projectId = '' } = useParams<{ projectId: string }>();
  const [showSidebar, setShowSidebar] = useState(true);
  
  const { 
    loading, 
    messages, 
    project, 
    handleSendMessage 
  } = useCollaborationMessages(projectId);
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  if (!project) {
    return (
      <MainLayout>
        <div className="pt-20 pb-0 h-screen flex flex-col">
          <div className="container max-w-7xl mx-auto px-4 flex-1 flex flex-col">
            <div className="py-4">Loading project...</div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="pt-20 pb-0 h-screen flex flex-col">
        <div className="container max-w-7xl mx-auto px-4 flex-1 flex flex-col">
          {/* Header */}
          <ProjectHeader 
            projectId={projectId}
            projectTitle={project.title}
            showSidebar={showSidebar}
            toggleSidebar={toggleSidebar}
          />
          
          {/* Main content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Chat area */}
            <div className="flex-1 flex flex-col">
              {/* Messages */}
              <CollaborationMessages 
                messages={messages}
                loading={loading}
                currentUser="Ahmad (QP)"
              />
              
              {/* Input area */}
              <ChatInput 
                onSendMessage={handleSendMessage}
              />
            </div>
            
            {/* Sidebar */}
            {showSidebar && (
              <ProjectSidebar 
                participants={project.participants}
                documents={project.documents}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QPCollaboration;
