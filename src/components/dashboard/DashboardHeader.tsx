
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ShieldCheck, FileText, ClipboardCheck } from 'lucide-react';
import Button from '@/components/ui/custom/Button';
import UserAvatar from '@/components/ui/custom/UserAvatar';

type UserRole = 'developer' | 'qp' | 'authority' | '';

const DashboardHeader = () => {
  const [userRole, setUserRole] = useState<UserRole>('');
  const [userName, setUserName] = useState('John');
  
  useEffect(() => {
    const role = sessionStorage.getItem('userRole') as UserRole || '';
    setUserRole(role);
    // In a real app, you would fetch the user's name from an API
  }, []);
  
  const getRoleDisplay = () => {
    switch(userRole) {
      case 'developer':
        return 'Developer';
      case 'qp':
        return 'Qualified Person (QP)';
      case 'authority':
        return 'Local Authority';
      default:
        return 'User';
    }
  };

  const getWelcomeMessage = () => {
    switch(userRole) {
      case 'developer':
        return 'Track your projects and compliance status';
      case 'authority':
        return 'Review and approve building submissions';
      default:
        return 'Track your projects and compliance status';
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
        <p className="text-muted-foreground mt-1">
          {getWelcomeMessage()}
          {userRole && (
            <span className="ml-2 inline-flex items-center">
              <span className="text-xs font-medium bg-secondary rounded-full px-2 py-0.5 ml-1 flex items-center gap-1">
                <UserAvatar role={userRole} size={14} showBackground={false} />
                {getRoleDisplay()}
              </span>
            </span>
          )}
        </p>
      </div>
      <div className="flex gap-2 mt-4 md:mt-0">
        {userRole === 'developer' && (
          <>
            <Link to="/reports">
              <Button 
                variant="outline"
                size="sm"
                leftIcon={<FileText size={16} />}
              >
                View Reports
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
          </>
        )}
        
        {userRole === 'authority' && (
          <>
            <Link to="/reports">
              <Button 
                variant="outline"
                size="sm"
                leftIcon={<FileText size={16} />}
              >
                Analytics
              </Button>
            </Link>
            <Link to="/projects/1/review">
              <Button 
                variant="primary"
                size="sm"
                leftIcon={<ShieldCheck size={16} />}
              >
                Pending Reviews
              </Button>
            </Link>
          </>
        )}
        
        {userRole === 'qp' && (
          <>
            <Link to="/reports">
              <Button 
                variant="outline"
                size="sm"
                leftIcon={<FileText size={16} />}
              >
                View Reports
              </Button>
            </Link>
            <Link to="/qp/dashboard">
              <Button 
                variant="primary"
                size="sm"
                leftIcon={<ClipboardCheck size={16} />}
              >
                QP Dashboard
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
