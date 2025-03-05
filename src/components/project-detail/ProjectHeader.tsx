
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import Button from '@/components/ui/custom/Button';

interface ProjectHeaderProps {
  title: string;
  description: string;
  status: string;
  projectId: string;
  statusColors: Record<string, string>;
}

const ProjectHeader = ({ title, description, status, projectId, statusColors }: ProjectHeaderProps) => {
  return (
    <>
      {/* Back button */}
      <Link to="/dashboard" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>
      
      {/* Project header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
              {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <Link to={`/projects/${projectId}/review`}>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<ShieldCheck size={14} />}
              >
                Compliance Review
              </Button>
            </Link>
          </div>
        </div>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>
    </>
  );
};

export default ProjectHeader;
