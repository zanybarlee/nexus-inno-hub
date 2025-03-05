
import { Link } from 'react-router-dom';
import { Folder, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import StatsCard from '@/components/ui/custom/StatsCard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatsSectionProps {
  isLoading: boolean;
}

const StatsSection = ({ isLoading }: StatsSectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/dashboard" className="block">
            <StatsCard
              title="Total Projects"
              value={isLoading ? '...' : '12'}
              description="Active projects"
              icon={Folder}
              trend={{ value: 8, direction: 'up' }}
              index={0}
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>View all projects</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/dashboard?filter=pending" className="block">
            <StatsCard
              title="Pending Review"
              value={isLoading ? '...' : '5'}
              description="Awaiting approval"
              icon={Clock}
              trend={{ value: 2, direction: 'down' }}
              index={1}
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>View pending projects</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/dashboard?filter=approved" className="block">
            <StatsCard
              title="Approved"
              value={isLoading ? '...' : '6'}
              description="Successfully approved"
              icon={CheckCircle}
              trend={{ value: 12, direction: 'up' }}
              index={2}
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>View approved projects</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/dashboard?filter=issues" className="block">
            <StatsCard
              title="Compliance Issues"
              value={isLoading ? '...' : '3'}
              description="Require attention"
              icon={AlertCircle}
              trend={{ value: 5, direction: 'down' }}
              index={3}
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>View projects with issues</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default StatsSection;
