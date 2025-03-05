
import { Briefcase, FileCheck, Users, Calendar } from 'lucide-react';

interface QPStatsSectionProps {
  isLoading: boolean;
}

const QPStatsSection = ({ isLoading }: QPStatsSectionProps) => {
  // Mock data
  const stats = [
    {
      title: 'Active Projects',
      value: '6',
      change: '+2',
      icon: Briefcase,
      changeType: 'positive'
    },
    {
      title: 'Pending Reviews',
      value: '8',
      change: '+3',
      icon: FileCheck,
      changeType: 'positive'
    },
    {
      title: 'Team Members',
      value: '12',
      change: '+0',
      icon: Users,
      changeType: 'neutral'
    },
    {
      title: 'Upcoming Deadlines',
      value: '4',
      change: '-1',
      icon: Calendar,
      changeType: 'negative'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {isLoading ? (
        [...Array(4)].map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-card/40 border shadow-sm animate-pulse"></div>
        ))
      ) : (
        stats.map((stat, i) => (
          <div key={i} className="bg-card rounded-xl border shadow-sm p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p className={`text-xs font-medium mt-1 ${
                  stat.changeType === 'positive' ? 'text-green-600' :
                  stat.changeType === 'negative' ? 'text-red-600' :
                  'text-gray-600'
                }`}>
                  {stat.change} this month
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default QPStatsSection;
