
import { Calendar, Users, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-review' | 'approved' | 'rejected';
  date: string;
  members: number;
  submissions: number;
  index: number;
}

const ProjectCard = ({ id, title, description, status, date, members, submissions, index }: ProjectCardProps) => {
  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'in-review': 'bg-blue-100 text-blue-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
  };
  
  return (
    <Link 
      to={`/projects/${id}`}
      className="block animate-slide-in"
      style={{ '--index': index } as React.CSSProperties}
    >
      <div className="p-6 rounded-xl bg-card border shadow-sm card-hover h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        </div>
        
        <p className="text-muted-foreground mb-6 line-clamp-2">{description}</p>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1.5" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1.5" />
            <span>{members}</span>
          </div>
          
          <div className="flex items-center">
            <FileCheck className="h-4 w-4 mr-1.5" />
            <span>{submissions}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
