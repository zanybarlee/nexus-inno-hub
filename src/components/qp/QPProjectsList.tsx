
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, FileCheck, MessageSquare, Eye } from 'lucide-react';
import Button from '@/components/ui/custom/Button';

interface QPProjectsListProps {
  isLoading: boolean;
  filterStatus: string;
}

const QPProjectsList = ({ isLoading, filterStatus }: QPProjectsListProps) => {
  // Mock project data
  const allProjects = [
    {
      id: '1',
      title: 'Kuala Lumpur Tower Development',
      description: 'Mixed-use development with residential and commercial spaces in central KL.',
      status: 'in-review',
      date: 'Oct 12, 2023',
      members: 5,
      submissions: 3,
      comments: 8,
      dueDate: 'Oct 30, 2023'
    },
    {
      id: '2',
      title: 'Johor Bahru Waterfront Project',
      description: 'Coastal development with residential units and a marina in JB.',
      status: 'pending',
      date: 'Nov 3, 2023',
      members: 3,
      submissions: 1,
      comments: 2,
      dueDate: 'Nov 20, 2023'
    },
    {
      id: '3',
      title: 'Penang Heritage Renovation',
      description: 'Restoration of heritage buildings in Georgetown with modern amenities.',
      status: 'approved',
      date: 'Sep 17, 2023',
      members: 4,
      submissions: 2,
      comments: 15,
      dueDate: 'Completed'
    },
    {
      id: '4',
      title: 'Kota Kinabalu Resort Complex',
      description: 'Luxury resort development with villas and amenities in Sabah.',
      status: 'rejected',
      date: 'Dec 5, 2023',
      members: 6,
      submissions: 4,
      comments: 12,
      dueDate: 'Needs revision'
    },
    {
      id: '5',
      title: 'Ipoh Office Park',
      description: 'Modern office complex with sustainable design features in Ipoh.',
      status: 'in-review',
      date: 'Oct 25, 2023',
      members: 4,
      submissions: 2,
      comments: 6,
      dueDate: 'Nov 10, 2023'
    },
    {
      id: '6',
      title: 'Malacca Heritage Hotel',
      description: 'Boutique hotel conversion of historic shophouses in Malacca.',
      status: 'pending',
      date: 'Nov 8, 2023',
      members: 3,
      submissions: 1,
      comments: 4,
      dueDate: 'Dec 1, 2023'
    }
  ];

  // Filter projects based on selected status
  const projects = filterStatus === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.status === filterStatus);

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'in-review': 'bg-blue-100 text-blue-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">My Projects</h2>
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-xl bg-card/40 border shadow-sm animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {projects.length === 0 ? (
            <div className="text-center p-8 border rounded-xl bg-card">
              <p className="text-muted-foreground">No projects match the selected filter.</p>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                          {project.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link to={`/qp/projects/${project.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={<Eye size={14} />}
                        >
                          View Details
                        </Button>
                      </Link>
                      <Link to={`/qp/collaboration/${project.id}`}>
                        <Button
                          variant="primary"
                          size="sm"
                          leftIcon={<MessageSquare size={14} />}
                        >
                          Collaboration Hub
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1.5 text-muted-foreground" />
                      <span>Submitted: {project.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1.5 text-muted-foreground" />
                      <span>Team: {project.members} members</span>
                    </div>
                    <div className="flex items-center">
                      <FileCheck className="h-4 w-4 mr-1.5 text-muted-foreground" />
                      <span>Submissions: {project.submissions}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1.5 text-muted-foreground" />
                      <span>Comments: {project.comments}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Due Date:</span>
                      <span className="text-sm">{project.dueDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default QPProjectsList;
