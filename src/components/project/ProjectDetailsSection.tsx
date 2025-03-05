
import { Building } from 'lucide-react';
import { ProjectFormData } from '@/types/project';

interface ProjectDetailsSectionProps {
  formData: ProjectFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  errors: Record<string, string>;
  projectTypes: string[];
}

const ProjectDetailsSection = ({ formData, handleChange, errors, projectTypes }: ProjectDetailsSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Building className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-xl font-semibold">Project Details</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="projectName" className="text-sm font-medium">
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className={`input-base w-full ${errors.projectName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            placeholder="Enter project name"
          />
          {errors.projectName && (
            <p className="text-xs text-red-500 mt-1">{errors.projectName}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="projectType" className="text-sm font-medium">
            Project Type <span className="text-red-500">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className={`input-base w-full ${errors.projectType ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
          >
            <option value="" disabled>Select project type</option>
            {projectTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.projectType && (
            <p className="text-xs text-red-500 mt-1">{errors.projectType}</p>
          )}
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`input-base w-full ${errors.description ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            placeholder="Brief description of the project"
          ></textarea>
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">{errors.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsSection;
