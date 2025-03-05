
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, PanelLeft, PanelRight } from 'lucide-react';
import Button from '@/components/ui/custom/Button';

interface ProjectHeaderProps {
  projectId: string;
  projectTitle: string;
  showSidebar: boolean;
  toggleSidebar: () => void;
}

const ProjectHeader = ({ 
  projectId,
  projectTitle,
  showSidebar,
  toggleSidebar 
}: ProjectHeaderProps) => {
  return (
    <div className="py-4 border-b flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/qp/dashboard" className="text-primary hover:text-primary/80 mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">{projectTitle}</h1>
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
  );
};

export default ProjectHeader;
