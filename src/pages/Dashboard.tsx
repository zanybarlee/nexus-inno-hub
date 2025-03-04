
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsSection from '@/components/dashboard/StatsSection';
import ProjectsSection from '@/components/dashboard/ProjectsSection';
import ActivitySection from '@/components/dashboard/ActivitySection';
import ProjectOverview from '@/components/dashboard/ProjectOverview';

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
          <DashboardHeader />
          
          {/* Stats */}
          <StatsSection isLoading={isLoading} />
          
          {/* Recent Projects */}
          <ProjectsSection isLoading={isLoading} />
          
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
