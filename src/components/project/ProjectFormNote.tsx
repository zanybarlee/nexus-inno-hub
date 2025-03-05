
import { Info } from 'lucide-react';

const ProjectFormNote = () => {
  return (
    <div className="bg-secondary/50 rounded-lg p-4 flex items-start">
      <Info className="h-5 w-5 text-muted-foreground mt-0.5 mr-3 shrink-0" />
      <p className="text-sm text-muted-foreground">
        Once your project is created, you'll be able to upload BIM models, collaborate with team members, and track the submission process through the dashboard.
      </p>
    </div>
  );
};

export default ProjectFormNote;
