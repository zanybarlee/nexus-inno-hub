
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Clock, CheckCircle, AlertCircle, Plus, BarChart3, Users, Folder } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import StatsCard from '@/components/ui/custom/StatsCard';
import ProjectCard from '@/components/ui/custom/ProjectCard';
import Button from '@/components/ui/custom/Button';

// Mock data
const projects = [
  {
    id: '1',
    title: 'Kuala Lumpur Tower Development',
    description: 'Mixed-use development with residential and commercial spaces in central KL.',
    status: 'in-review' as const,
    date: 'Oct 12, 2023',
    members: 5,
    submissions: 3
  },
  {
    id: '2',
    title: 'Johor Bahru Waterfront Project',
    description: 'Coastal development with residential units and a marina in JB.',
    status: 'pending' as const,
    date: 'Nov 3, 2023',
    members: 3,
    submissions: 1
  },
  {
    id: '3',
    title: 'Penang Heritage Renovation',
    description: 'Restoration of heritage buildings in Georgetown with modern amenities.',
    status: 'approved' as const,
    date: 'Sep 17, 2023',
    members: 4,
    submissions: 2
  },
  {
    id: '4',
    title: 'Kota Kinabalu Resort Complex',
    description: 'Luxury resort development with villas and amenities in Sabah.',
    status: 'rejected' as const,
    date: 'Dec 5, 2023',
    members: 6,
    submissions: 4
  }
];

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <MainLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, manage your building submissions and track progress</p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <StatsCard
              title="Total Projects"
              value={isLoading ? '...' : '12'}
              description="Active projects"
              icon={Folder}
              trend={{ value: 8, direction: 'up' }}
              index={0}
            />
            <StatsCard
              title="Pending Review"
              value={isLoading ? '...' : '5'}
              description="Awaiting approval"
              icon={Clock}
              trend={{ value: 2, direction: 'down' }}
              index={1}
            />
            <StatsCard
              title="Approved"
              value={isLoading ? '...' : '6'}
              description="Successfully approved"
              icon={CheckCircle}
              trend={{ value: 12, direction: 'up' }}
              index={2}
            />
            <StatsCard
              title="Compliance Issues"
              value={isLoading ? '...' : '3'}
              description="Require attention"
              icon={AlertCircle}
              trend={{ value: 5, direction: 'down' }}
              index={3}
            />
          </div>
          
          {/* Recent Projects */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Projects</h2>
              <Link to="/projects/create">
                <Button 
                  variant="primary"
                  size="sm"
                  leftIcon={<Plus size={16} />}
                >
                  New Project
                </Button>
              </Link>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-64 rounded-xl bg-card/40 border shadow-sm animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    status={project.status}
                    date={project.date}
                    members={project.members}
                    submissions={project.submissions}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Activity and Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activity Feed */}
            <div className="lg:col-span-2 bg-card rounded-xl border shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
                <button className="text-primary text-sm font-medium hover:underline">
                  View All
                </button>
              </div>
              
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 rounded-md bg-secondary/40 animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {[
                    {
                      icon: FileText,
                      title: 'BIM model submitted',
                      project: 'Kuala Lumpur Tower Development',
                      time: '2 hours ago'
                    },
                    {
                      icon: CheckCircle,
                      title: 'Project approved',
                      project: 'Penang Heritage Renovation',
                      time: '4 hours ago'
                    },
                    {
                      icon: AlertCircle,
                      title: 'Compliance issues detected',
                      project: 'Kota Kinabalu Resort Complex',
                      time: '1 day ago'
                    },
                    {
                      icon: Users,
                      title: 'New team member added',
                      project: 'Johor Bahru Waterfront Project',
                      time: '2 days ago'
                    },
                    {
                      icon: FileText,
                      title: 'Revision submitted',
                      project: 'Kota Kinabalu Resort Complex',
                      time: '3 days ago'
                    }
                  ].map((activity, index) => (
                    <div 
                      key={index} 
                      className="p-4 border-l-2 border-primary bg-secondary/30 rounded-r-md animate-slide-in"
                      style={{ '--index': index } as React.CSSProperties}
                    >
                      <div className="flex items-start">
                        <div className="p-2 rounded-md bg-primary/10 mr-3">
                          <activity.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.project}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Summary */}
            <div className="bg-card rounded-xl border shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Project Overview</h2>
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
              </div>
              
              {isLoading ? (
                <div className="space-y-4">
                  <div className="h-40 rounded-md bg-secondary/40 animate-pulse"></div>
                  <div className="h-24 rounded-md bg-secondary/40 animate-pulse"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4">
                    {[
                      { label: 'In Progress', value: 40, color: 'bg-blue-500' },
                      { label: 'Under Review', value: 25, color: 'bg-yellow-500' },
                      { label: 'Approved', value: 30, color: 'bg-green-500' },
                      { label: 'Rejected', value: 5, color: 'bg-red-500' }
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.label}</span>
                          <span className="font-medium">{item.value}%</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.color} animate-slide-in`} 
                            style={{ 
                              width: `${item.value}%`, 
                              '--index': index 
                            } as React.CSSProperties
                          }></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-sm font-medium mb-4">Upcoming Deadlines</h3>
                    <div className="space-y-3">
                      {[
                        { project: 'Johor Bahru Waterfront', date: 'Oct 28, 2023' },
                        { project: 'Kuala Lumpur Tower', date: 'Nov 15, 2023' }
                      ].map((deadline, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="truncate">{deadline.project}</span>
                          <span className="text-muted-foreground">{deadline.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
