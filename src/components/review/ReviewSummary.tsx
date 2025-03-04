
import { BarChart3, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import Button from '@/components/ui/custom/Button';
import { toast } from '@/hooks/use-toast';

interface ReviewSummaryProps {
  projectId: string;
  projectName: string;
  totalModels: number;
  approvedModels: number;
  rejectedModels: number;
  pendingModels: number;
  checklistItems: {
    total: number;
    passed: number;
    failed: number;
    na: number;
  };
  onFinalizeReview: () => void;
}

const ReviewSummary = ({
  projectId,
  projectName,
  totalModels,
  approvedModels,
  rejectedModels,
  pendingModels,
  checklistItems,
  onFinalizeReview,
}: ReviewSummaryProps) => {
  
  const canFinalize = pendingModels === 0 && checklistItems.total === (checklistItems.passed + checklistItems.failed + checklistItems.na);
  
  const handleFinalize = () => {
    if (canFinalize) {
      onFinalizeReview();
      toast({
        title: "Review Finalized",
        description: "The review has been completed and submitted",
      });
    } else {
      toast({
        title: "Cannot Finalize",
        description: "All models must be reviewed and all checklist items must be completed",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center mb-2">
          <BarChart3 className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold">Review Summary</h2>
        </div>
        <p className="text-sm text-muted-foreground">Project: {projectName}</p>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-secondary/30 rounded-lg p-3">
            <h3 className="text-sm font-medium mb-2">BIM Models Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Approved
                </span>
                <span className="text-sm font-medium">{approvedModels} of {totalModels}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-500 mr-1" /> Rejected
                </span>
                <span className="text-sm font-medium">{rejectedModels} of {totalModels}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-4 w-4 text-yellow-500 mr-1" /> Pending
                </span>
                <span className="text-sm font-medium">{pendingModels} of {totalModels}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary/30 rounded-lg p-3">
            <h3 className="text-sm font-medium mb-2">Checklist Completion</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Passed Items</span>
                <span className="text-sm font-medium">{checklistItems.passed} of {checklistItems.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Failed Items</span>
                <span className="text-sm font-medium">{checklistItems.failed} of {checklistItems.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">N/A Items</span>
                <span className="text-sm font-medium">{checklistItems.na} of {checklistItems.total}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            variant="primary"
            disabled={!canFinalize}
            onClick={handleFinalize}
          >
            Finalize Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
