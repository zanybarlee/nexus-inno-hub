
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileCheck, ShieldCheck } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import ModelCard from '@/components/review/ModelCard';
import ComplianceChecklist from '@/components/review/ComplianceChecklist';
import ReviewSummary from '@/components/review/ReviewSummary';
import { toast } from '@/hooks/use-toast';

// Mock projects data (same as in ProjectDetail.tsx)
const projects = [
  {
    id: '1',
    title: 'Kuala Lumpur Tower Development',
    description: 'Mixed-use development with residential and commercial spaces in central KL.',
    status: 'in-review',
    documents: [
      { id: 'model1', name: 'BIM Model v3', type: 'model', date: 'Oct 10, 2023', status: 'pending' },
      { id: 'model2', name: 'Structural Analysis', type: 'report', date: 'Oct 8, 2023', status: 'pending' },
      { id: 'model3', name: 'Environmental Impact Assessment', type: 'report', date: 'Oct 5, 2023', status: 'pending' }
    ]
  },
  {
    id: '2',
    title: 'Johor Bahru Waterfront Project',
    description: 'Coastal development with residential units and a marina in JB.',
    status: 'pending',
    documents: [
      { id: 'model4', name: 'Master Plan', type: 'plan', date: 'Nov 1, 2023', status: 'pending' },
      { id: 'model5', name: 'BIM Model v1', type: 'model', date: 'Oct 30, 2023', status: 'pending' }
    ]
  },
  {
    id: '3',
    title: 'Penang Heritage Renovation',
    description: 'Restoration of heritage buildings in Georgetown with modern amenities.',
    status: 'approved',
    documents: [
      { id: 'model6', name: 'Heritage Impact Assessment', type: 'report', date: 'Sep 8, 2023', status: 'approved' },
      { id: 'model7', name: 'Restoration Plans', type: 'plan', date: 'Sep 10, 2023', status: 'approved' },
      { id: 'model8', name: 'BIM Model v2', type: 'model', date: 'Sep 15, 2023', status: 'approved' }
    ]
  },
  {
    id: '4',
    title: 'Kota Kinabalu Resort Complex',
    description: 'Luxury resort development with villas and amenities in Sabah.',
    status: 'rejected',
    documents: [
      { id: 'model9', name: 'Environmental Impact Assessment', type: 'report', date: 'Nov 28, 2023', status: 'rejected' },
      { id: 'model10', name: 'BIM Model v1', type: 'model', date: 'Dec 1, 2023', status: 'rejected' },
      { id: 'model11', name: 'Structural Analysis', type: 'report', date: 'Dec 1, 2023', status: 'rejected' }
    ]
  }
];

// Mock compliance checklist items
const initialChecklistItems = [
  {
    id: 'check1',
    category: 'structural',
    title: 'Building height compliance',
    description: 'Check if the building height is within the allowed limit for the zone',
    status: 'na' as 'pass' | 'fail' | 'na'
  },
  {
    id: 'check2',
    category: 'structural',
    title: 'Floor area ratio',
    description: 'Verify that the floor area ratio complies with zoning regulations',
    status: 'na' as 'pass' | 'fail' | 'na'
  },
  {
    id: 'check3',
    category: 'safety',
    title: 'Fire safety requirements',
    description: 'Ensure that fire exits, sprinklers, and fire walls meet regulations',
    status: 'na' as 'pass' | 'fail' | 'na'
  },
  {
    id: 'check4',
    category: 'safety',
    title: 'Accessibility requirements',
    description: 'Verify that the design includes accessible routes, entrances, and facilities',
    status: 'na' as 'pass' | 'fail' | 'na'
  },
  {
    id: 'check5',
    category: 'zoning',
    title: 'Setback requirements',
    description: 'Check if building setbacks comply with zoning regulations',
    status: 'na' as 'pass' | 'fail' | 'na'
  },
  {
    id: 'check6',
    category: 'utilities',
    title: 'Drainage system',
    description: 'Verify that the drainage system is adequate and meets local requirements',
    status: 'na' as 'pass' | 'fail' | 'na'
  },
  {
    id: 'check7',
    category: 'utilities',
    title: 'Electrical system',
    description: 'Check if electrical systems meet safety codes and requirements',
    status: 'na' as 'pass' | 'fail' | 'na'
  },
  {
    id: 'check8',
    category: 'zoning',
    title: 'Parking provisions',
    description: 'Verify that adequate parking is provided according to zoning requirements',
    status: 'na' as 'pass' | 'fail' | 'na'
  }
];

const ComplianceReview = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState<any[]>([]);
  const [checklistItems, setChecklistItems] = useState(initialChecklistItems);
  
  // Initialize project and model data
  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      const foundProject = projects.find(p => p.id === projectId);
      
      if (foundProject) {
        setProject(foundProject);
        
        // Add mock issues data to models
        const enhancedModels = foundProject.documents.map(doc => ({
          ...doc,
          issues: doc.status === 'rejected' ? [
            {
              id: `issue-${Math.random().toString(36).substring(7)}`,
              type: 'Clearance Issue',
              description: 'Minimum clearance requirements not met in stairwell areas',
              severity: 'high',
              resolved: false
            },
            {
              id: `issue-${Math.random().toString(36).substring(7)}`,
              type: 'Material Specification',
              description: 'Fire rating of materials not specified correctly',
              severity: 'medium',
              resolved: false
            }
          ] : []
        }));
        
        setModels(enhancedModels);
      }
      
      setLoading(false);
      
      if (!foundProject) {
        toast({
          title: "Project not found",
          description: `No project found with ID ${projectId}`,
          variant: "destructive"
        });
        navigate('/dashboard');
      }
    }, 500);
  }, [projectId, navigate]);
  
  // Handle model status change
  const handleModelStatusChange = (modelId: string, newStatus: 'approved' | 'rejected' | 'pending' | 'in-review') => {
    setModels(models.map(model => 
      model.id === modelId ? { ...model, status: newStatus } : model
    ));
  };
  
  // Handle adding feedback to a model
  const handleAddFeedback = (modelId: string, feedback: string) => {
    // In a real app, this would send feedback to an API
    console.log(`Adding feedback for model ${modelId}: ${feedback}`);
    
    // For demonstration, we'll just update the local state
    setModels(models.map(model => 
      model.id === modelId ? { 
        ...model, 
        issues: [
          ...(model.issues || []),
          {
            id: `issue-${Math.random().toString(36).substring(7)}`,
            type: 'Manual Feedback',
            description: feedback,
            severity: 'medium',
            resolved: false
          }
        ]
      } : model
    ));
  };
  
  // Handle checklist item status change
  const handleChecklistItemStatusChange = (itemId: string, status: 'pass' | 'fail' | 'na') => {
    setChecklistItems(items => 
      items.map(item => item.id === itemId ? { ...item, status } : item)
    );
  };
  
  // Handle finalizing the review
  const handleFinalizeReview = () => {
    // In a real app, this would submit the review to an API
    // For demonstration, we'll navigate back to the project detail page
    navigate(`/projects/${projectId}`);
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="pt-24 pb-16">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!project) {
    return (
      <MainLayout>
        <div className="pt-24 pb-16">
          <div className="container max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
            <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
            <Link to="/dashboard">
              <button className="bg-primary text-white px-4 py-2 rounded">
                Return to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Calculate review statistics
  const approvedModels = models.filter(m => m.status === 'approved').length;
  const rejectedModels = models.filter(m => m.status === 'rejected').length;
  const pendingModels = models.filter(m => m.status === 'pending' || m.status === 'in-review').length;
  
  const checklistStats = {
    total: checklistItems.length,
    passed: checklistItems.filter(item => item.status === 'pass').length,
    failed: checklistItems.filter(item => item.status === 'fail').length,
    na: checklistItems.filter(item => item.status === 'na').length,
  };
  
  return (
    <MainLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Back button */}
          <Link to={`/projects/${projectId}`} className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Project
          </Link>
          
          {/* Review header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold">Compliance Review</h1>
              <div className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Authority Review Mode
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{project.title}</p>
          </div>
          
          {/* Review content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {/* Models column */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileCheck className="h-5 w-5 text-primary mr-2" />
                  BIM Models Review
                </h2>
                <div className="space-y-4">
                  {models.map((model) => (
                    <ModelCard
                      key={model.id}
                      model={model}
                      onStatusChange={handleModelStatusChange}
                      onAddFeedback={handleAddFeedback}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Checklist and summary column */}
            <div className="space-y-6">
              <ReviewSummary
                projectId={project.id}
                projectName={project.title}
                totalModels={models.length}
                approvedModels={approvedModels}
                rejectedModels={rejectedModels}
                pendingModels={pendingModels}
                checklistItems={checklistStats}
                onFinalizeReview={handleFinalizeReview}
              />
              
              <ComplianceChecklist
                items={checklistItems}
                onItemStatusChange={handleChecklistItemStatusChange}
              />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ComplianceReview;
