
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/custom/Button';

const DashboardHeader = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground">Welcome back, manage your building submissions and track progress</p>
    </div>
  );
};

export default DashboardHeader;
