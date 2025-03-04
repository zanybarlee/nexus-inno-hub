
import { BarChart3 } from 'lucide-react';

interface ProjectOverviewProps {
  isLoading: boolean;
}

const ProjectOverview = ({ isLoading }: ProjectOverviewProps) => {
  const statusItems = [
    { label: 'In Progress', value: 40, color: 'bg-blue-500' },
    { label: 'Under Review', value: 25, color: 'bg-yellow-500' },
    { label: 'Approved', value: 30, color: 'bg-green-500' },
    { label: 'Rejected', value: 5, color: 'bg-red-500' }
  ];

  const deadlines = [
    { project: 'Johor Bahru Waterfront', date: 'Oct 28, 2023' },
    { project: 'Kuala Lumpur Tower', date: 'Nov 15, 2023' }
  ];

  return (
    <div className="bg-card rounded-xl border shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Project Overview</h2>
        <BarChart3 className="h-5 w-5 text-muted-foreground" />
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          <div className="h-40 rounded-md bg-secondary/40 animate-pulse"></div>
          <div className="h-24 rounded-md bg-secondary/40 animate-pulse"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            {statusItems.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} animate-slide-in`} 
                    style={{ 
                      width: `${item.value}%`, 
                      '--index': index 
                    } as React.CSSProperties
                  }></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium mb-4">Upcoming Deadlines</h3>
            <div className="space-y-3">
              {deadlines.map((deadline, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="truncate">{deadline.project}</span>
                  <span className="text-muted-foreground">{deadline.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectOverview;
