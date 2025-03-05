
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsSection from '@/components/dashboard/StatsSection';
import ProjectsSection from '@/components/dashboard/ProjectsSection';
import ActivitySection from '@/components/dashboard/ActivitySection';
import ProjectOverview from '@/components/dashboard/ProjectOverview';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const location = useLocation();
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    // Parse the filter parameter from the URL
    const queryParams = new URLSearchParams(location.search);
    const filter = queryParams.get('filter');
    
    if (filter) {
      setActiveFilter(filter);
      // Show a toast notification when filter is applied
      const filterLabels: Record<string, string> = {
        'all': 'All Projects',
        'pending': 'Pending Review',
        'approved': 'Approved Projects',
        'issues': 'Compliance Issues'
      };
      
      toast({
        title: "Filter Applied",
        description: `Showing ${filterLabels[filter] || filter}`,
      });
    }
    
    return () => clearTimeout(timer);
  }, [location.search]);
  
  return (
    <MainLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header */}
          <DashboardHeader />
          
          {/* Stats */}
          <StatsSection isLoading={isLoading} />
          
          {/* Tabs for filtering projects */}
          <Tabs defaultValue={activeFilter} className="mb-6" onValueChange={(value) => setActiveFilter(value)}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="pending">Pending Review</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="issues">Compliance Issues</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeFilter}>
              {/* Recent Projects - filtered by active tab */}
              <ProjectsSection isLoading={isLoading} filterStatus={activeFilter} />
            </TabsContent>
          </Tabs>
          
          {/* Activity and Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activity Feed */}
            <ActivitySection isLoading={isLoading} />
            
            {/* Summary */}
            <ProjectOverview isLoading={isLoading} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
