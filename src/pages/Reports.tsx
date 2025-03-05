
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/components/layout/MainLayout';
import ReportsSection from '@/components/analytics/ReportsSection';
import ComplianceAnalytics from '@/components/analytics/ComplianceAnalytics';
import PerformanceAnalytics from '@/components/analytics/PerformanceAnalytics';

const Reports = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('performance');

  // Mock data for demonstration
  const performanceData = {
    approvalRate: {
      currentRate: 84,
      previousRate: 78,
      change: 6
    },
    reviewTime: {
      average: '5.2 days',
      fastestProject: 'KL Residential (1.5 days)',
      slowestProject: 'Johor Industrial (12 days)'
    },
    monthlyApprovals: [
      { month: 'Jan', count: 12 },
      { month: 'Feb', count: 15 },
      { month: 'Mar', count: 10 },
      { month: 'Apr', count: 18 },
      { month: 'May', count: 22 },
      { month: 'Jun', count: 19 }
    ],
    projectTypePerformance: [
      { type: 'Residential', approvalRate: 92, count: 24 },
      { type: 'Commercial', approvalRate: 76, count: 18 },
      { type: 'Mixed-use', approvalRate: 88, count: 12 },
      { type: 'Industrial', approvalRate: 68, count: 8 },
      { type: 'Infrastructure', approvalRate: 82, count: 5 }
    ]
  };

  const complianceData = {
    complianceScore: 87,
    complianceByCategory: [
      { category: 'Structural', score: 45, total: 50 },
      { category: 'Electrical', score: 28, total: 30 },
      { category: 'Plumbing', score: 18, total: 20 },
      { category: 'Fire Safety', score: 25, total: 30 },
      { category: 'Accessibility', score: 15, total: 20 }
    ],
    recentIssues: [
      {
        project: 'Penang Heritage Renovation',
        issue: 'Fire escape routes not clearly marked in model',
        severity: 'high',
        date: '2 days ago'
      },
      {
        project: 'KL Tower Development',
        issue: 'Electrical load calculations need revision',
        severity: 'medium',
        date: '4 days ago'
      },
      {
        project: 'Johor Bahru Waterfront',
        issue: 'Minor accessibility ramp grade issues',
        severity: 'low',
        date: '1 week ago'
      }
    ]
  };

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <MainLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-1">Analyze performance metrics and compliance statistics</p>
          </div>

          {/* Tabs */}
          <Tabs 
            defaultValue={activeTab} 
            onValueChange={setActiveTab}
            className="mb-8"
          >
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>
            <TabsContent value="performance" className="mt-6">
              <ReportsSection
                title="Performance Analytics"
                description="Track approval rates, review times, and project outcomes"
                onRefresh={handleRefresh}
                reportTypes={['Overview', 'Detailed Performance', 'Team Efficiency']}
                isLoading={isLoading}
              >
                <PerformanceAnalytics 
                  approvalRate={performanceData.approvalRate}
                  reviewTime={performanceData.reviewTime}
                  monthlyApprovals={performanceData.monthlyApprovals}
                  projectTypePerformance={performanceData.projectTypePerformance}
                  isLoading={isLoading}
                />
              </ReportsSection>
            </TabsContent>
            <TabsContent value="compliance" className="mt-6">
              <ReportsSection
                title="Compliance Analytics"
                description="Monitor regulatory compliance and identify potential issues"
                onRefresh={handleRefresh}
                reportTypes={['Overview', 'Detailed Compliance', 'Issue Tracking']}
                isLoading={isLoading}
              >
                <ComplianceAnalytics 
                  complianceScore={complianceData.complianceScore}
                  complianceByCategory={complianceData.complianceByCategory}
                  recentIssues={complianceData.recentIssues}
                  isLoading={isLoading}
                />
              </ReportsSection>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
