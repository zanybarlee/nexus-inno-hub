
import { useProjects } from '@/hooks/useProjects';
import ProjectsHeader from './projects/ProjectsHeader';
import ProjectsList from './projects/ProjectsList';

interface ProjectsSectionProps {
  isLoading: boolean;
  filter?: string;
}

const ProjectsSection = ({ isLoading, filter }: ProjectsSectionProps) => {
  const { userRole, projects, filteredProjects, sectionTitle } = useProjects({ filter });

  return (
    <div className="mb-10">
      <ProjectsHeader 
        userRole={userRole} 
        projects={projects} 
        sectionTitle={sectionTitle} 
      />
      
      <ProjectsList 
        isLoading={isLoading} 
        projects={filteredProjects} 
      />
    </div>
  );
};

export default ProjectsSection;
