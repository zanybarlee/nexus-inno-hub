
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/custom/Button';
import UserAvatar from '@/components/ui/custom/UserAvatar';

type UserRole = 'developer' | 'qp' | 'authority' | '';

const DashboardHeader = () => {
  const [userRole, setUserRole] = useState<UserRole>('');
  
  useEffect(() => {
    const role = sessionStorage.getItem('userRole') as UserRole || '';
    setUserRole(role);
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

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <UserAvatar role={userRole} size={32} />
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, <span className="font-medium">{getRoleDisplay()}</span>. Manage your building submissions and track progress.
            </p>
          </div>
        </div>
        
        {userRole === 'developer' && (
          <Link to="/projects/create" className="mt-4 sm:mt-0">
            <Button 
              variant="primary"
              size="sm"
              leftIcon={<Plus size={16} />}
            >
              New Project
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
