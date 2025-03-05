
import { Check } from 'lucide-react';
import Button from '@/components/ui/custom/Button';

interface ProjectFormActionsProps {
  isSubmitting: boolean;
  onCancel: () => void;
}

const ProjectFormActions = ({ isSubmitting, onCancel }: ProjectFormActionsProps) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button 
        variant="outline" 
        type="button"
        onClick={onCancel}
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
  );
};

export default ProjectFormActions;
