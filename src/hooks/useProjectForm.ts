
import { useState } from 'react';
import { ProjectFormData } from '@/types/project';

const useProjectForm = (initialState: ProjectFormData, onSubmitSuccess: () => void) => {
  const [formData, setFormData] = useState<ProjectFormData>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
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
      onSubmitSuccess();
    }, 1500);
  };
  
  return {
    formData,
    isSubmitting,
    errors,
    handleChange,
    handleSubmit
  };
};

export default useProjectForm;
