
import { Link } from 'react-router-dom';
import { Plus, ShieldCheck, Clipboard, Clock, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/custom/Button';
import { Project } from '@/data/ProjectsData';

interface ProjectsHeaderProps {
  userRole: string;
  projects: Project[];
  sectionTitle: string;
}

const ProjectsHeader = ({ userRole, projects, sectionTitle }: ProjectsHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">{sectionTitle}</h2>
        {userRole === 'authority' && (
          <div className="flex gap-2 ml-4">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock size={14} className="text-yellow-500" />
              <span>Pending: {projects.filter(p => p.status === 'pending').length}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <AlertCircle size={14} className="text-blue-500" />
              <span>In Review: {projects.filter(p => p.status === 'in-review').length}</span>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        {userRole === 'authority' && (
          <Link to="/projects/1/review">
            <Button 
              variant="outline"
              size="sm"
              leftIcon={<ShieldCheck size={16} />}
            >
              Pending Reviews
            </Button>
          </Link>
        )}
        {userRole === 'qp' && (
          <Link to="/qp/dashboard">
            <Button 
              variant="outline"
              size="sm"
              leftIcon={<Clipboard size={16} />}
            >
              QP Dashboard
            </Button>
          </Link>
        )}
        {userRole === 'developer' && (
          <Link to="/projects/create">
            <Button 
              variant="primary"
              size="sm"
              leftIcon={<Plus size={16} />}
            >
              New Project
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProjectsHeader;
