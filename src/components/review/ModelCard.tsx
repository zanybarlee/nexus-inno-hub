
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  FileCheck, 
  FileX, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Eye
} from 'lucide-react';
import Button from '@/components/ui/custom/Button';
import { toast } from '@/hooks/use-toast';

interface ModelCardProps {
  model: {
    id: string;
    name: string;
    type: string;
    date: string;
    status: 'approved' | 'rejected' | 'pending' | 'in-review';
    issues?: Array<{
      id: string;
      type: string;
      description: string;
      severity: 'high' | 'medium' | 'low';
      resolved: boolean;
    }>;
  };
  onStatusChange: (modelId: string, newStatus: 'approved' | 'rejected' | 'pending' | 'in-review') => void;
  onAddFeedback: (modelId: string, feedback: string) => void;
}

const ModelCard = ({ model, onStatusChange, onAddFeedback }: ModelCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [viewerOpen, setViewerOpen] = useState(false);

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'in-review': 'bg-blue-100 text-blue-800',
    'approved': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800',
  };

  const handleStatusChange = (newStatus: 'approved' | 'rejected' | 'pending' | 'in-review') => {
    onStatusChange(model.id, newStatus);
    toast({
      title: "Status Updated",
      description: `${model.name} has been ${newStatus}`,
      variant: newStatus === 'approved' ? 'default' : (newStatus === 'rejected' ? 'destructive' : 'default')
    });
  };

  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      onAddFeedback(model.id, feedback);
      setFeedback('');
      toast({
        title: "Feedback Submitted",
        description: "Your feedback has been recorded",
      });
    }
  };

  const toggleViewer = () => {
    setViewerOpen(!viewerOpen);
  };

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden mb-4 transition-all duration-200">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          {model.status === 'approved' ? (
            <FileCheck className="h-5 w-5 text-green-500 mr-3" />
          ) : model.status === 'rejected' ? (
            <FileX className="h-5 w-5 text-red-500 mr-3" />
          ) : (
            <MessageSquare className="h-5 w-5 text-blue-500 mr-3" />
          )}
          <div>
            <h3 className="font-medium">{model.name}</h3>
            <p className="text-sm text-muted-foreground">Uploaded: {model.date}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <span className={cn("text-xs px-2 py-1 rounded-full mr-4", statusColors[model.status])}>
            {model.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Button 
              size="sm" 
              variant="outline" 
              leftIcon={<Eye size={14} />}
              onClick={toggleViewer}
            >
              View Model
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-green-500 text-green-600 hover:bg-green-50"
              onClick={() => handleStatusChange('approved')}
            >
              Approve
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50"
              onClick={() => handleStatusChange('rejected')}
            >
              Reject
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleStatusChange('in-review')}
            >
              Mark In-Review
            </Button>
          </div>

          {viewerOpen && (
            <div className="bg-gray-100 rounded-lg p-3 mb-4 h-64 flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                3D Model Viewer Placeholder<br />
                (In a real implementation, this would be a 3D BIM viewer)
              </p>
            </div>
          )}
          
          {model.issues && model.issues.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Identified Issues</h4>
              <div className="space-y-2">
                {model.issues.map(issue => (
                  <div key={issue.id} className="bg-secondary/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{issue.type}</span>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full", {
                        "bg-red-100 text-red-800": issue.severity === 'high',
                        "bg-yellow-100 text-yellow-800": issue.severity === 'medium',
                        "bg-blue-100 text-blue-800": issue.severity === 'low',
                      })}>
                        {issue.severity}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{issue.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <h4 className="text-sm font-medium mb-2">Add Feedback</h4>
            <textarea 
              className="w-full border rounded-md p-2 mb-2 text-sm"
              rows={3}
              placeholder="Enter your feedback for this model..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <Button 
              size="sm"
              onClick={handleSubmitFeedback}
              leftIcon={<MessageSquare size={14} />}
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelCard;
