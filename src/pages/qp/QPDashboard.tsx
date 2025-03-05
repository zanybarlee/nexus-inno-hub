
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, FileCheck, Clock, MessageSquare, Plus, CheckSquare, Filter } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/custom/Button';
import { toast } from '@/hooks/use-toast';
import QPProjectsList from '@/components/qp/QPProjectsList';
import QPStatsSection from '@/components/qp/QPStatsSection';

const QPDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleStatusFilter = (status: string) => {
    setFilterStatus(status);
    toast({
      title: "Filter Applied",
      description: `Showing ${status === 'all' ? 'all' : status} projects`,
    });
  };

  return (
    <MainLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">QP Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage your projects and collaborations</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Link to="/dashboard">
                <Button 
                  variant="outline"
                  size="sm"
                >
                  Back to Main Dashboard
                </Button>
              </Link>
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
          </div>

          {/* Stats */}
          <QPStatsSection isLoading={isLoading} />
          
          {/* Filters */}
          <div className="flex items-center mb-6 space-x-2 overflow-x-auto pb-2">
            <Filter size={16} className="text-muted-foreground mr-1" />
            <button
              className={`px-3 py-1 text-sm rounded-full ${
                filterStatus === 'all' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
              }`}
              onClick={() => handleStatusFilter('all')}
            >
              All
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full ${
                filterStatus === 'in-review' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
              }`}
              onClick={() => handleStatusFilter('in-review')}
            >
              In Review
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full ${
                filterStatus === 'pending' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
              }`}
              onClick={() => handleStatusFilter('pending')}
            >
              Pending
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full ${
                filterStatus === 'approved' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
              }`}
              onClick={() => handleStatusFilter('approved')}
            >
              Approved
            </button>
            <button
              className={`px-3 py-1 text-sm rounded-full ${
                filterStatus === 'rejected' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
              }`}
              onClick={() => handleStatusFilter('rejected')}
            >
              Rejected
            </button>
          </div>
          
          {/* Projects List */}
          <QPProjectsList isLoading={isLoading} filterStatus={filterStatus} />
          
          {/* Recent Activity */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-6">Recent Collaborations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="h-40 rounded-xl bg-card/40 border shadow-sm animate-pulse"></div>
                ))
              ) : (
                <>
                  <Link to="/qp/collaboration/1" className="block">
                    <div className="bg-card rounded-xl border shadow-sm p-6 h-full card-hover">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">KL Tower Development</h3>
                        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Active</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">3 new messages from stakeholders</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1.5" />
                        <span>Last activity: 2 hours ago</span>
                      </div>
                    </div>
                  </Link>
                  <Link to="/qp/collaboration/2" className="block">
                    <div className="bg-card rounded-xl border shadow-sm p-6 h-full card-hover">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Johor Bahru Waterfront</h3>
                        <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Active</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">1 new document for review</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1.5" />
                        <span>Last activity: 5 hours ago</span>
                      </div>
                    </div>
                  </Link>
                  <Link to="/qp/collaboration/3" className="block">
                    <div className="bg-card rounded-xl border shadow-sm p-6 h-full card-hover">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Penang Heritage Renovation</h3>
                        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Completed</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Final approvals received</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1.5" />
                        <span>Last activity: 2 days ago</span>
                      </div>
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QPDashboard;
