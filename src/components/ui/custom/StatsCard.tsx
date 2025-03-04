
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  index: number;
}

const StatsCard = ({ title, value, description, icon: Icon, trend, index }: StatsCardProps) => {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-muted-foreground'
  };
  
  return (
    <div 
      className="p-6 rounded-xl bg-card border shadow-sm animate-slide-in" 
      style={{ '--index': index } as React.CSSProperties}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h4 className="text-2xl md:text-3xl font-bold">{value}</h4>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      
      <div className="flex items-center">
        {trend && (
          <span className={`text-sm font-medium mr-2 ${trendColors[trend.direction]}`}>
            {trend.value}%
            {trend.direction === 'up' && ' ↑'}
            {trend.direction === 'down' && ' ↓'}
          </span>
        )}
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default StatsCard;
