
interface ProjectOverviewProps {
  detailedDescription: string;
  location: string;
  size: string;
  budget: string;
  submissionDate: string;
  reviewDate: string;
  estimatedCompletionDate: string;
}

const ProjectOverview = ({ 
  detailedDescription, 
  location, 
  size, 
  budget, 
  submissionDate, 
  reviewDate, 
  estimatedCompletionDate 
}: ProjectOverviewProps) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-card rounded-xl border shadow-sm p-6 h-full">
        <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
        <p className="mb-6">{detailedDescription}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Project Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Location</span>
                <span className="text-sm font-medium">{location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Size</span>
                <span className="text-sm font-medium">{size}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Budget</span>
                <span className="text-sm font-medium">{budget}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Key Dates</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Submission Date</span>
                <span className="text-sm font-medium">{submissionDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Review Date</span>
                <span className="text-sm font-medium">{reviewDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Est. Completion</span>
                <span className="text-sm font-medium">{estimatedCompletionDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
