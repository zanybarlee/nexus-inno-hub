
import { useState } from 'react';
import { Check, Clock, AlertCircle, UserPlus } from 'lucide-react';
import Button from '@/components/ui/custom/Button';

interface Task {
  id: string;
  title: string;
  status: string;
  assignee: string;
  dueDate: string;
}

interface QPTaskSectionProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, newStatus: string) => void;
}

const QPTaskSection = ({ tasks, onUpdateTask }: QPTaskSectionProps) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredTasks = selectedFilter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === selectedFilter);

  const statusIcon = {
    'completed': <Check className="h-4 w-4 text-green-600" />,
    'in-progress': <Clock className="h-4 w-4 text-blue-600" />,
    'pending': <AlertCircle className="h-4 w-4 text-yellow-600" />
  };

  const statusColors = {
    'completed': 'bg-green-100 border-green-200',
    'in-progress': 'bg-blue-100 border-blue-200',
    'pending': 'bg-yellow-100 border-yellow-200'
  };

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden mb-8">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold mb-4">QP Tasks & Action Items</h2>
        
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              selectedFilter === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
            onClick={() => setSelectedFilter('all')}
          >
            All Tasks
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              selectedFilter === 'in-progress' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
            onClick={() => setSelectedFilter('in-progress')}
          >
            In Progress
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              selectedFilter === 'pending' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
            onClick={() => setSelectedFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-full ${
              selectedFilter === 'completed' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
            onClick={() => setSelectedFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {filteredTasks.length === 0 ? (
          <div className="text-center p-4">
            <p className="text-muted-foreground">No tasks match the selected filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div 
                key={task.id} 
                className={`border rounded-lg p-4 ${statusColors[task.status] || 'bg-card'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {statusIcon[task.status]}
                    </div>
                    <div>
                      <h3 className="font-medium">{task.title}</h3>
                      <div className="flex flex-wrap mt-2 space-x-4 text-sm">
                        <span className="text-muted-foreground">Assignee: {task.assignee}</span>
                        <span className="text-muted-foreground">Due: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {task.status !== 'completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateTask(task.id, 'completed')}
                        className="border-green-500 text-green-600 hover:bg-green-50"
                      >
                        Mark Complete
                      </Button>
                    )}
                    {task.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateTask(task.id, 'in-progress')}
                        className="border-blue-500 text-blue-600 hover:bg-blue-50"
                      >
                        Start Task
                      </Button>
                    )}
                    {task.assignee === 'Unassigned' && (
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<UserPlus size={14} />}
                      >
                        Assign
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-6 text-center">
          <Button variant="outline" size="sm">
            + Add New Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QPTaskSection;
