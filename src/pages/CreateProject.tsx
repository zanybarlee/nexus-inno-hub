
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import CreateProjectForm from '@/components/project/CreateProjectForm';
import useProjectForm from '@/hooks/useProjectForm';

const projectTypes = [
  'Residential',
  'Commercial',
  'Mixed-Use',
  'Industrial',
  'Infrastructure',
  'Heritage',
  'Other'
];

const initialFormData = {
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
};

const CreateProject = () => {
  const navigate = useNavigate();
  
  const {
    formData,
    isSubmitting,
    errors,
    handleChange,
    handleSubmit
  } = useProjectForm(initialFormData, () => navigate('/upload'));
  
  const handleCancel = () => navigate('/dashboard');
  
  return (
    <MainLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create New Project</h1>
            <p className="text-muted-foreground">Fill in the details to start your building submission</p>
          </div>
          
          <div className="bg-card rounded-xl border shadow-sm p-6 md:p-8 animate-scale-in">
            <CreateProjectForm
              formData={formData}
              isSubmitting={isSubmitting}
              errors={errors}
              projectTypes={projectTypes}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateProject;
