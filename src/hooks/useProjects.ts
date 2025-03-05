
import { useState, useEffect } from 'react';
import { Project, developerProjects, authorityProjects } from '@/data/ProjectsData';

interface UseProjectsProps {
  filter?: string;
}

export const useProjects = ({ filter }: UseProjectsProps) => {
  const [userRole, setUserRole] = useState<string>('');
  
  useEffect(() => {
    // Get user role from session storage or wherever it's stored
    const role = sessionStorage.getItem('userRole') || '';
    setUserRole(role);
  }, []);

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

  return {
    userRole,
    projects,
    filteredProjects,
    sectionTitle: getSectionTitle()
  };
};
