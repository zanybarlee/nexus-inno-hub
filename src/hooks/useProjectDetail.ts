
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

// Import the mock project data
import { projects } from '@/data/projectDetailData';

export const useProjectDetail = (projectId: string | undefined) => {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Define the color mappings
  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'in-review': 'bg-blue-100 text-blue-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
  };

  const documentStatusColors = {
    'pending': 'text-yellow-600',
    'approved': 'text-green-600',
    'rejected': 'text-red-600',
  };
  
  const timelineStatusColors = {
    'completed': 'bg-green-500',
    'in-progress': 'bg-blue-500',
    'pending': 'bg-gray-300',
    'rejected': 'bg-red-500',
  };

  useEffect(() => {
    // In a real application, this would be an API call
    const fetchProject = () => {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const foundProject = projects.find(p => p.id === projectId);
        setProject(foundProject || null);
        setLoading(false);
        
        if (!foundProject) {
          toast({
            title: "Project not found",
            description: `No project found with ID ${projectId}`,
            variant: "destructive"
          });
        }
      }, 500);
    };

    fetchProject();
  }, [projectId]);

  return {
    project,
    loading,
    statusColors,
    documentStatusColors,
    timelineStatusColors
  };
};
