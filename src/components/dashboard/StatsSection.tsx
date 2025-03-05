
import { Folder, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import StatsCard from '@/components/ui/custom/StatsCard';
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StatsSectionProps {
  isLoading: boolean;
}

const StatsSection = ({ isLoading }: StatsSectionProps) => {
  const navigate = useNavigate();

  const handleCardClick = (filter: string) => {
    navigate(`/dashboard?filter=${filter}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div onClick={() => handleCardClick('all')} className="cursor-pointer transition-transform hover:scale-105">
              <StatsCard
                title="Total Projects"
                value={isLoading ? '...' : '12'}
                description="Active projects"
                icon={Folder}
                trend={{ value: 8, direction: 'up' }}
                index={0}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>View all projects</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div onClick={() => handleCardClick('pending')} className="cursor-pointer transition-transform hover:scale-105">
              <StatsCard
                title="Pending Review"
                value={isLoading ? '...' : '5'}
                description="Awaiting approval"
                icon={Clock}
                trend={{ value: 2, direction: 'down' }}
                index={1}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>View pending projects</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div onClick={() => handleCardClick('approved')} className="cursor-pointer transition-transform hover:scale-105">
              <StatsCard
                title="Approved"
                value={isLoading ? '...' : '6'}
                description="Successfully approved"
                icon={CheckCircle}
                trend={{ value: 12, direction: 'up' }}
                index={2}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>View approved projects</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div onClick={() => handleCardClick('issues')} className="cursor-pointer transition-transform hover:scale-105">
              <StatsCard
                title="Compliance Issues"
                value={isLoading ? '...' : '3'}
                description="Require attention"
                icon={AlertCircle}
                trend={{ value: 5, direction: 'down' }}
                index={3}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>View compliance issues</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default StatsSection;
