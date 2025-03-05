
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useProjectDetail } from '@/hooks/useProjectDetail';

// Import our refactored components
import LoadingState from '@/components/project-detail/LoadingState';
import NotFoundState from '@/components/project-detail/NotFoundState';
import ProjectHeader from '@/components/project-detail/ProjectHeader';
import ProjectOverview from '@/components/project-detail/ProjectOverview';
import TeamInfo from '@/components/project-detail/TeamInfo';
import DocumentSection from '@/components/project-detail/DocumentSection';
import TimelineSection from '@/components/project-detail/TimelineSection';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const { project, loading, statusColors, documentStatusColors, timelineStatusColors } = useProjectDetail(projectId);

  if (loading) {
    return <LoadingState />;
  }

  if (!project) {
    return <NotFoundState />;
  }

  return (
    <MainLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          <ProjectHeader 
            title={project.title}
            description={project.description}
            status={project.status}
            projectId={project.id}
            statusColors={statusColors}
          />
          
          {/* Project overview and team info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <ProjectOverview 
              detailedDescription={project.detailedDescription}
              location={project.location}
              size={project.size}
              budget={project.budget}
              submissionDate={project.submissionDate}
              reviewDate={project.reviewDate}
              estimatedCompletionDate={project.estimatedCompletionDate}
            />
            
            <TeamInfo 
              mainContractor={project.mainContractor}
              architect={project.architect}
              members={project.members}
            />
          </div>
          
          {/* Project documents and timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <DocumentSection 
              documents={project.documents}
              documentStatusColors={documentStatusColors}
            />
            
            <TimelineSection 
              timeline={project.timeline}
              timelineStatusColors={timelineStatusColors}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectDetail;
