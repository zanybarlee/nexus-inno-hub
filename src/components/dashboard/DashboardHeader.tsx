
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
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
        <p className="text-muted-foreground mt-1">Track your projects and compliance status</p>
      </div>
      <div className="flex gap-2 mt-4 md:mt-0">
        <Link to="/reports">
          <Button 
            variant="outline"
            size="sm"
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
      </div>
    </div>
  );
};

export default DashboardHeader;
