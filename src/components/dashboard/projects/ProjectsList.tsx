
import { Project } from '@/data/ProjectsData';
import ProjectCard from '@/components/ui/custom/ProjectCard';

interface ProjectsListProps {
  isLoading: boolean;
  projects: Project[];
}

const ProjectsList = ({ isLoading, projects }: ProjectsListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-64 rounded-xl bg-card/40 border shadow-sm animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {projects.map((project, index) => (
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
  );
};

export default ProjectsList;
