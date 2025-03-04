
import { Folder, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import StatsCard from '@/components/ui/custom/StatsCard';

interface StatsSectionProps {
  isLoading: boolean;
}

const StatsSection = ({ isLoading }: StatsSectionProps) => {
  return (
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
  );
};

export default StatsSection;
