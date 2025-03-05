
import { Users } from 'lucide-react';
import Button from '@/components/ui/custom/Button';

interface TeamInfoProps {
  mainContractor: string;
  architect: string;
  members: number;
}

const TeamInfo = ({ mainContractor, architect, members }: TeamInfoProps) => {
  return (
    <div>
      <div className="bg-card rounded-xl border shadow-sm p-6 h-full">
        <h2 className="text-xl font-semibold mb-4">Team & Stakeholders</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Main Contractor</h3>
            <p className="text-sm">{mainContractor}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Architect</h3>
            <p className="text-sm">{architect}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Team Members</h3>
            <div className="flex -space-x-2">
              {[...Array(members)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-background">
                  <Users className="h-4 w-4 text-primary" />
                </div>
              ))}
              <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border border-background text-xs font-medium">
                +{members}
              </button>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              variant="outline"
              size="sm"
              className="w-full"
            >
              View Complete Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;
