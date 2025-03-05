
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsSection from '@/components/dashboard/StatsSection';
import ProjectsSection from '@/components/dashboard/ProjectsSection';
import ActivitySection from '@/components/dashboard/ActivitySection';
import ProjectOverview from '@/components/dashboard/ProjectOverview';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter');
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (filter) {
      const filterName = filter === 'issues' ? 'compliance issues' : filter;
      toast({
        title: `Showing ${filterName} projects`,
        description: "Filtered view of your projects"
      });
    }
  }, [filter]);
  
  return (
    <MainLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header */}
          <DashboardHeader />
          
          {/* Stats */}
          <StatsSection isLoading={isLoading} />
          
          {/* Recent Projects */}
          <ProjectsSection isLoading={isLoading} filter={filter || undefined} />
          
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
