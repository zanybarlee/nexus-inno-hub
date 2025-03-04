
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, MapPin, Users, Calendar, Check, Info } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/custom/Button';

const projectTypes = [
  'Residential',
  'Commercial',
  'Mixed-Use',
  'Industrial',
  'Infrastructure',
  'Heritage',
  'Other'
];

const CreateProject = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    location: '',
    projectType: '',
    startDate: '',
    estimatedCompletion: '',
    developerName: '',
    qpName: '',
    qpLicense: '',
    teamMembers: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.projectType) {
      newErrors.projectType = 'Project type is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.developerName.trim()) {
      newErrors.developerName = 'Developer name is required';
    }
    
    if (!formData.qpName.trim()) {
      newErrors.qpName = 'QP name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/upload');
    }, 1500);
  };
  
  return (
    <MainLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create New Project</h1>
            <p className="text-muted-foreground">Fill in the details to start your building submission</p>
          </div>
          
          <div className="bg-card rounded-xl border shadow-sm p-6 md:p-8 animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Project Details */}
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
              
              {/* Location & Timeline */}
              <div className="space-y-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-2" />
                  <h2 className="text-xl font-semibold">Location & Timeline</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`input-base w-full ${errors.location ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      placeholder="Project location/address"
                    />
                    {errors.location && (
                      <p className="text-xs text-red-500 mt-1">{errors.location}</p>
                    )}
                  </div>
                  
                  <div></div>
                  
                  <div className="space-y-2">
                    <label htmlFor="startDate" className="text-sm font-medium">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className={`input-base w-full ${errors.startDate ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    />
                    {errors.startDate && (
                      <p className="text-xs text-red-500 mt-1">{errors.startDate}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="estimatedCompletion" className="text-sm font-medium">
                      Estimated Completion
                    </label>
                    <input
                      type="date"
                      id="estimatedCompletion"
                      name="estimatedCompletion"
                      value={formData.estimatedCompletion}
                      onChange={handleChange}
                      className="input-base w-full"
                    />
                  </div>
                </div>
              </div>
              
              {/* Team Information */}
              <div className="space-y-6">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  <h2 className="text-xl font-semibold">Team Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="developerName" className="text-sm font-medium">
                      Developer Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="developerName"
                      name="developerName"
                      value={formData.developerName}
                      onChange={handleChange}
                      className={`input-base w-full ${errors.developerName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      placeholder="Enter developer name"
                    />
                    {errors.developerName && (
                      <p className="text-xs text-red-500 mt-1">{errors.developerName}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="teamMembers" className="text-sm font-medium">
                      Team Members
                    </label>
                    <input
                      type="text"
                      id="teamMembers"
                      name="teamMembers"
                      value={formData.teamMembers}
                      onChange={handleChange}
                      className="input-base w-full"
                      placeholder="Enter team members (comma separated)"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="qpName" className="text-sm font-medium">
                      QP Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="qpName"
                      name="qpName"
                      value={formData.qpName}
                      onChange={handleChange}
                      className={`input-base w-full ${errors.qpName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                      placeholder="Enter QP name"
                    />
                    {errors.qpName && (
                      <p className="text-xs text-red-500 mt-1">{errors.qpName}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="qpLicense" className="text-sm font-medium">
                      QP License Number
                    </label>
                    <input
                      type="text"
                      id="qpLicense"
                      name="qpLicense"
                      value={formData.qpLicense}
                      onChange={handleChange}
                      className="input-base w-full"
                      placeholder="Enter QP license number"
                    />
                  </div>
                </div>
              </div>
              
              {/* Additional Notes */}
              <div className="bg-secondary/50 rounded-lg p-4 flex items-start">
                <Info className="h-5 w-5 text-muted-foreground mt-0.5 mr-3 shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Once your project is created, you'll be able to upload BIM models, collaborate with team members, and track the submission process through the dashboard.
                </p>
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button 
                  variant="outline" 
                  type="button"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary"
                  type="submit"
                  isLoading={isSubmitting}
                  leftIcon={isSubmitting ? undefined : <Check size={18} />}
                >
                  {isSubmitting ? 'Creating Project...' : 'Create Project'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateProject;
