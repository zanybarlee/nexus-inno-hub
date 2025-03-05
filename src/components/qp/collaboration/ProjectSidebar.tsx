
import { Users, FileText, Eye, Upload } from 'lucide-react';
import Button from '@/components/ui/custom/Button';

interface Participant {
  id: string;
  name: string;
  role: string;
  isOnline: boolean;
}

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
}

interface ProjectSidebarProps {
  participants: Participant[];
  documents: Document[];
}

const ProjectSidebar = ({ participants, documents }: ProjectSidebarProps) => {
  return (
    <div className="w-80 border-l bg-card/50 overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="font-semibold flex items-center">
          <Users className="h-4 w-4 mr-2" />
          Participants
        </h2>
        <div className="mt-3 space-y-2">
          {participants.map((participant) => (
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
          {documents.map((doc) => (
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
  );
};

export default ProjectSidebar;
