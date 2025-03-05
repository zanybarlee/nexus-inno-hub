
import ProjectDetailsSection from './ProjectDetailsSection';
import LocationTimelineSection from './LocationTimelineSection';
import TeamInfoSection from './TeamInfoSection';
import ProjectFormNote from './ProjectFormNote';
import ProjectFormActions from './ProjectFormActions';
import { ProjectFormData } from '@/types/project';

interface CreateProjectFormProps {
  formData: ProjectFormData;
  isSubmitting: boolean;
  errors: Record<string, string>;
  projectTypes: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const CreateProjectForm = ({
  formData,
  isSubmitting,
  errors,
  projectTypes,
  handleChange,
  handleSubmit,
  onCancel
}: CreateProjectFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <ProjectDetailsSection 
        formData={formData}
        handleChange={handleChange}
        errors={errors}
        projectTypes={projectTypes}
      />
      
      <LocationTimelineSection 
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />
      
      <TeamInfoSection 
        formData={formData}
        handleChange={handleChange}
        errors={errors}
      />
      
      <ProjectFormNote />
      
      <ProjectFormActions 
        isSubmitting={isSubmitting}
        onCancel={onCancel}
      />
    </form>
  );
};

export default CreateProjectForm;
