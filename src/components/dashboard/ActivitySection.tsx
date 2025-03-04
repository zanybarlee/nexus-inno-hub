
import { FileText, CheckCircle, AlertCircle, Users } from 'lucide-react';

interface ActivitySectionProps {
  isLoading: boolean;
}

const ActivitySection = ({ isLoading }: ActivitySectionProps) => {
  const activities = [
    {
      icon: FileText,
      title: 'BIM model submitted',
      project: 'Kuala Lumpur Tower Development',
      time: '2 hours ago'
    },
    {
      icon: CheckCircle,
      title: 'Project approved',
      project: 'Penang Heritage Renovation',
      time: '4 hours ago'
    },
    {
      icon: AlertCircle,
      title: 'Compliance issues detected',
      project: 'Kota Kinabalu Resort Complex',
      time: '1 day ago'
    },
    {
      icon: Users,
      title: 'New team member added',
      project: 'Johor Bahru Waterfront Project',
      time: '2 days ago'
    },
    {
      icon: FileText,
      title: 'Revision submitted',
      project: 'Kota Kinabalu Resort Complex',
      time: '3 days ago'
    }
  ];

  return (
    <div className="lg:col-span-2 bg-card rounded-xl border shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <button className="text-primary text-sm font-medium hover:underline">
          View All
        </button>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 rounded-md bg-secondary/40 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className="p-4 border-l-2 border-primary bg-secondary/30 rounded-r-md animate-slide-in"
              style={{ '--index': index } as React.CSSProperties}
            >
              <div className="flex items-start">
                <div className="p-2 rounded-md bg-primary/10 mr-3">
                  <activity.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.project}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivitySection;
