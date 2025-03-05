
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/custom/Button';
import { Link } from 'react-router-dom';

const NotFoundState = () => {
  return (
    <MainLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <p className="mb-6">The project you're looking for doesn't exist or has been removed.</p>
          <Link to="/dashboard">
            <Button variant="primary">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFoundState;
