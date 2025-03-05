import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ShieldCheck, Clipboard, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/custom/Button';
import ProjectCard from '@/components/ui/custom/ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'in-review' | 'pending' | 'approved' | 'rejected';
  date: string;
  members: number;
  submissions: number;
}

interface ProjectsSectionProps {
  isLoading: boolean;
  filter?: string;
}

const ProjectsSection = ({ isLoading, filter }: ProjectsSectionProps) => {
  const [userRole, setUserRole] = useState<string>('');
  
  useEffect(() => {
    // Get user role from session storage or wherever it's stored
    const role = sessionStorage.getItem('userRole') || '';
    setUserRole(role);
  }, []);

  // Developer-focused projects
  const developerProjects: Project[] = [
    {
      id: '1',
      title: 'Kuala Lumpur Tower Development',
      description: 'Mixed-use development with residential and commercial spaces in central KL.',
      status: 'in-review',
      date: 'Oct 12, 2023',
      members: 5,
      submissions: 3
    },
    {
      id: '2',
      title: 'Johor Bahru Waterfront Project',
      description: 'Coastal development with residential units and a marina in JB.',
      status: 'pending',
      date: 'Nov 3, 2023',
      members: 3,
      submissions: 1
    },
    {
      id: '3',
      title: 'Penang Heritage Renovation',
      description: 'Restoration of heritage buildings in Georgetown with modern amenities.',
      status: 'approved',
      date: 'Sep 17, 2023',
      members: 4,
      submissions: 2
    },
    {
      id: '4',
      title: 'Kota Kinabalu Resort Complex',
      description: 'Luxury resort development with villas and amenities in Sabah.',
      status: 'rejected',
      date: 'Dec 5, 2023',
      members: 6,
      submissions: 4
    }
  ];

  // Authority-focused projects (pending review)
  const authorityProjects: Project[] = [
    {
      id: '1',
      title: 'Kuala Lumpur Tower Development',
      description: 'Mixed-use development with residential and commercial spaces in central KL.',
      status: 'in-review',
      date: 'Oct 12, 2023',
      members: 5,
      submissions: 3
    },
    {
      id: '2',
      title: 'Johor Bahru Waterfront Project',
      description: 'Coastal development with residential units and a marina in JB.',
      status: 'pending',
      date: 'Nov 3, 2023',
      members: 3,
      submissions: 1
    },
    {
      id: '3',
      title: 'Penang Heritage Renovation',
      description: 'Restoration of heritage buildings in Georgetown with modern amenities.',
      status: 'pending',
      date: 'Nov 20, 2023',
      members: 7,
      submissions: 3
    },
    {
      id: '4',
      title: 'Melaka Heritage Hotel',
      description: 'Conversion of heritage buildings into a boutique hotel in Melaka.',
      status: 'in-review',
      date: 'Nov 15, 2023',
      members: 3,
      submissions: 2
    }
  ];

  // Select projects based on user role
  const projects = userRole === 'authority' ? authorityProjects : developerProjects;

  // Filter projects if a filter is provided
  const filteredProjects = filter 
    ? projects.filter(project => {
        switch(filter) {
          case 'pending':
            return project.status === 'pending';
          case 'approved':
            return project.status === 'approved';
          case 'issues':
            return project.status === 'rejected';
          default:
            return true;
        }
      })
    : projects;

  // Get section title based on user role
  const getSectionTitle = () => {
    switch(userRole) {
      case 'developer':
        return 'Recent Projects';
      case 'authority':
        return 'Projects Awaiting Review';
      default:
        return 'Recent Projects';
    }
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">{getSectionTitle()}</h2>
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
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 rounded-xl bg-card/40 border shadow-sm animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              status={project.status}
              date={project.date}
              members={project.members}
              submissions={project.submissions}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;
