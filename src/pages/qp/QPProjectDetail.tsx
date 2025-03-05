import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, FileCheck, Clock, CheckCircle, Edit, MessageSquare, File, Upload, ListChecks } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/custom/Button';
import { toast } from '@/hooks/use-toast';
import QPTaskSection from '@/components/qp/QPTaskSection';

const QPProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock projects data from ProjectDetail.tsx
  const projects = [
    {
      id: '1',
      title: 'Kuala Lumpur Tower Development',
      description: 'Mixed-use development with residential and commercial spaces in central KL.',
      detailedDescription: 'This ambitious project aims to create a landmark mixed-use development in the heart of Kuala Lumpur. The tower will feature premium residential units, Grade A office spaces, and a retail podium. The design incorporates sustainable features including rainwater harvesting, solar panels, and energy-efficient systems.',
      status: 'in-review',
      date: 'Oct 12, 2023',
      submissionDate: 'Oct 10, 2023',
      reviewDate: 'Oct 15, 2023',
      estimatedCompletionDate: 'Dec 30, 2023',
      members: 5,
      submissions: 3,
      location: 'Jalan Ampang, Kuala Lumpur',
      size: '120,000 sq ft',
      budget: 'RM 250 million',
      mainContractor: 'KL Construction Sdn Bhd',
      architect: 'Modern Designs Architecture',
      documents: [
        { name: 'BIM Model v3', type: 'model', date: 'Oct 10, 2023', status: 'approved' },
        { name: 'Structural Analysis', type: 'report', date: 'Oct 8, 2023', status: 'approved' },
        { name: 'Environmental Impact Assessment', type: 'report', date: 'Oct 5, 2023', status: 'pending' }
      ],
      timeline: [
        { event: 'Project Submission', date: 'Oct 5, 2023', status: 'completed' },
        { event: 'Initial Review', date: 'Oct 12, 2023', status: 'completed' },
        { event: 'Technical Compliance Check', date: 'Oct 18, 2023', status: 'in-progress' },
        { event: 'Final Approval', date: 'Oct 30, 2023', status: 'pending' }
      ],
      tasks: [
        { id: '1', title: 'Review structural plans', status: 'completed', assignee: 'Ahmad Ismail', dueDate: 'Oct 10, 2023' },
        { id: '2', title: 'Verify compliance with NBP 2023', status: 'in-progress', assignee: 'You', dueDate: 'Oct 20, 2023' },
        { id: '3', title: 'Coordinate with fire safety consultant', status: 'pending', assignee: 'Unassigned', dueDate: 'Oct 25, 2023' },
        { id: '4', title: 'Prepare final compliance report', status: 'pending', assignee: 'You', dueDate: 'Oct 28, 2023' }
      ]
    },
    {
      id: '2',
      title: 'Johor Bahru Waterfront Project',
      description: 'Coastal development with residential units and a marina in JB.',
      detailedDescription: 'The Johor Bahru Waterfront Project is a prestigious development along the coastline of JB. It includes luxury residential apartments, a yacht marina, retail spaces, and public recreation areas. The project emphasizes creating a seamless connection between urban living and coastal beauty.',
      status: 'pending',
      date: 'Nov 3, 2023',
      submissionDate: 'Nov 1, 2023',
      reviewDate: 'Not scheduled',
      estimatedCompletionDate: 'Mar 15, 2024',
      members: 3,
      submissions: 1,
      location: 'Danga Bay, Johor Bahru',
      size: '85,000 sq ft',
      budget: 'RM 180 million',
      mainContractor: 'Southern Construction Ltd',
      architect: 'Waterfront Architects Sdn Bhd',
      documents: [
        { name: 'Master Plan', type: 'plan', date: 'Nov 1, 2023', status: 'pending' },
        { name: 'BIM Model v1', type: 'model', date: 'Oct 30, 2023', status: 'pending' }
      ],
      timeline: [
        { event: 'Project Submission', date: 'Nov 1, 2023', status: 'completed' },
        { event: 'Initial Review', date: 'Nov 10, 2023', status: 'pending' },
        { event: 'Technical Compliance Check', date: 'Nov 20, 2023', status: 'pending' },
        { event: 'Final Approval', date: 'Dec 5, 2023', status: 'pending' }
      ],
      tasks: [
        { id: '5', title: 'Review master plan', status: 'completed', assignee: 'Ahmad Ismail', dueDate: 'Nov 5, 2023' },
        { id: '6', title: 'Verify coastal regulations', status: 'in-progress', assignee: 'You', dueDate: 'Nov 15, 2023' },
        { id: '7', title: 'Coordinate with marine engineers', status: 'pending', assignee: 'Unassigned', dueDate: 'Nov 22, 2023' },
        { id: '8', title: 'Prepare coastal compliance report', status: 'pending', assignee: 'You', dueDate: 'Nov 28, 2023' }
      ]
    },
    {
      id: '3',
      title: 'Penang Heritage Renovation',
      description: 'Restoration of heritage buildings in Georgetown with modern amenities.',
      detailedDescription: 'This renovation project focuses on carefully restoring historical buildings in Georgetown, Penang while integrating modern amenities and safety features. The project balances preservation of cultural heritage with contemporary functionality and comfort.',
      status: 'approved',
      date: 'Sep 17, 2023',
      submissionDate: 'Sep 10, 2023',
      reviewDate: 'Sep 20, 2023',
      estimatedCompletionDate: 'Jan 15, 2024',
      members: 4,
      submissions: 2,
      location: 'Georgetown, Penang',
      size: '45,000 sq ft',
      budget: 'RM 120 million',
      mainContractor: 'Heritage Builders Inc',
      architect: 'Historical Preservation Architects',
      documents: [
        { name: 'Heritage Impact Assessment', type: 'report', date: 'Sep 8, 2023', status: 'approved' },
        { name: 'Restoration Plans', type: 'plan', date: 'Sep 10, 2023', status: 'approved' },
        { name: 'BIM Model v2', type: 'model', date: 'Sep 15, 2023', status: 'approved' }
      ],
      timeline: [
        { event: 'Project Submission', date: 'Sep 10, 2023', status: 'completed' },
        { event: 'Initial Review', date: 'Sep 17, 2023', status: 'completed' },
        { event: 'Technical Compliance Check', date: 'Sep 25, 2023', status: 'completed' },
        { event: 'Final Approval', date: 'Oct 2, 2023', status: 'completed' }
      ],
      tasks: [
        { id: '9', title: 'Review heritage impact assessment', status: 'completed', assignee: 'Ahmad Ismail', dueDate: 'Sep 15, 2023' },
        { id: '10', title: 'Verify restoration plans', status: 'completed', assignee: 'You', dueDate: 'Sep 22, 2023' },
        { id: '11', title: 'Coordinate with heritage authorities', status: 'completed', assignee: 'Unassigned', dueDate: 'Sep 28, 2023' },
        { id: '12', title: 'Prepare final heritage compliance report', status: 'completed', assignee: 'You', dueDate: 'Oct 1, 2023' }
      ]
    },
    {
      id: '4',
      title: 'Kota Kinabalu Resort Complex',
      description: 'Luxury resort development with villas and amenities in Sabah.',
      detailedDescription: 'The Kota Kinabalu Resort Complex is a luxury development featuring private villas, a central hotel, spa facilities, and beachfront amenities. Located along the pristine shores of Sabah, the resort emphasizes eco-friendly design and integration with the natural environment.',
      status: 'rejected',
      date: 'Dec 5, 2023',
      submissionDate: 'Dec 1, 2023',
      reviewDate: 'Dec 7, 2023',
      estimatedCompletionDate: 'Not applicable',
      members: 6,
      submissions: 4,
      location: 'Kota Kinabalu, Sabah',
      size: '200,000 sq ft',
      budget: 'RM 320 million',
      mainContractor: 'East Malaysia Developments',
      architect: 'Tropical Resort Design Group',
      documents: [
        { name: 'Environmental Impact Assessment', type: 'report', date: 'Nov 28, 2023', status: 'rejected' },
        { name: 'BIM Model v1', type: 'model', date: 'Dec 1, 2023', status: 'rejected' },
        { name: 'Structural Analysis', type: 'report', date: 'Dec 1, 2023', status: 'rejected' }
      ],
      timeline: [
        { event: 'Project Submission', date: 'Dec 1, 2023', status: 'completed' },
        { event: 'Initial Review', date: 'Dec 5, 2023', status: 'completed' },
        { event: 'Technical Compliance Check', date: 'Dec 7, 2023', status: 'rejected' },
        { event: 'Resubmission', date: 'Jan 15, 2024', status: 'pending' }
      ],
      tasks: [
        { id: '13', title: 'Review environmental impact assessment', status: 'rejected', assignee: 'Ahmad Ismail', dueDate: 'Dec 5, 2023' },
        { id: '14', title: 'Verify structural analysis', status: 'rejected', assignee: 'You', dueDate: 'Dec 12, 2023' },
        { id: '15', title: 'Coordinate with environmental consultants', status: 'rejected', assignee: 'Unassigned', dueDate: 'Dec 19, 2023' },
        { id: '16', title: 'Prepare resubmission report', status: 'pending', assignee: 'You', dueDate: 'Jan 10, 2024' }
      ]
    }
  ];

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

  const handleUpdateTask = (taskId: string, newStatus: string) => {
    setProject(prev => {
      const updatedTasks = prev.tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      );
      return { ...prev, tasks: updatedTasks };
    });
    
    toast({
      title: "Task Updated",
      description: `Task status changed to ${newStatus}`,
    });
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-40 bg-gray-200 rounded"></div>
              </div>
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
            <Link to="/qp/dashboard">
              <Button variant="primary">
                Return to QP Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

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

  return (
    <MainLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Back button */}
          <Link to="/qp/dashboard" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to QP Dashboard
          </Link>
          
          {/* Project header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status]}`}>
                  {project.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <Link to={`/qp/collaboration/${project.id}`}>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<MessageSquare size={14} />}
                  >
                    Collaboration Hub
                  </Button>
                </Link>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{project.description}</p>
          </div>
          
          {/* Tasks and Action Items */}
          <QPTaskSection tasks={project.tasks} onUpdateTask={handleUpdateTask} />
          
          {/* Project documents and tools */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border shadow-sm p-6 h-full">
                <h2 className="text-xl font-semibold mb-4">Documents & Files</h2>
                <div className="space-y-4">
                  {project.documents.map((doc, index) => (
                    <div key={index} className="flex items-start justify-between border-b pb-3 last:border-0">
                      <div className="flex items-center">
                        <File className="h-4 w-4 mr-2 text-primary" />
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.date}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium ${documentStatusColors[doc.status] || 'text-gray-600'}`}>
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 space-y-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="w-full"
                    leftIcon={<Upload size={14} />}
                  >
                    Upload New Document
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="w-full"
                    leftIcon={<ListChecks size={14} />}
                  >
                    Generate Checklist
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border shadow-sm p-6 h-full">
                <h2 className="text-xl font-semibold mb-4">QP Notes & Comments</h2>
                <div className="mb-4">
                  <textarea 
                    className="w-full border rounded-md p-3 text-sm h-32 resize-none"
                    placeholder="Add your professional notes and observations here..."
                  ></textarea>
                </div>
                <div className="flex justify-between">
                  <Button 
                    variant="outline"
                    size="sm"
                    leftIcon={<Edit size={14} />}
                  >
                    Save as Draft
                  </Button>
                  <Button 
                    variant="primary"
                    size="sm"
                    leftIcon={<MessageSquare size={14} />}
                  >
                    Share with Team
                  </Button>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium mb-3">Previous Comments</h3>
                  <div className="space-y-4">
                    <div className="bg-secondary/30 rounded-lg p-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Ahmad Ismail</span>
                        <span className="text-xs text-muted-foreground">Oct 12, 2023</span>
                      </div>
                      <p className="text-sm">The structural design appears to meet all NBP requirements, but we should verify the load calculations for the upper floors.</p>
                    </div>
                    <div className="bg-secondary/30 rounded-lg p-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">You</span>
                        <span className="text-xs text-muted-foreground">Oct 10, 2023</span>
                      </div>
                      <p className="text-sm">Initial review of the foundation design looks promising. Will need to check compliance with new soil stability regulations.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QPProjectDetail;
