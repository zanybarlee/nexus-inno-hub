
import { Users } from 'lucide-react';
import { ProjectFormData } from '@/types/project';

interface TeamInfoSectionProps {
  formData: ProjectFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  errors: Record<string, string>;
}

const TeamInfoSection = ({ formData, handleChange, errors }: TeamInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Users className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-xl font-semibold">Team Information</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="developerName" className="text-sm font-medium">
            Developer Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="developerName"
            name="developerName"
            value={formData.developerName}
            onChange={handleChange}
            className={`input-base w-full ${errors.developerName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            placeholder="Enter developer name"
          />
          {errors.developerName && (
            <p className="text-xs text-red-500 mt-1">{errors.developerName}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="teamMembers" className="text-sm font-medium">
            Team Members
          </label>
          <input
            type="text"
            id="teamMembers"
            name="teamMembers"
            value={formData.teamMembers}
            onChange={handleChange}
            className="input-base w-full"
            placeholder="Enter team members (comma separated)"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="qpName" className="text-sm font-medium">
            QP Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="qpName"
            name="qpName"
            value={formData.qpName}
            onChange={handleChange}
            className={`input-base w-full ${errors.qpName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            placeholder="Enter QP name"
          />
          {errors.qpName && (
            <p className="text-xs text-red-500 mt-1">{errors.qpName}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="qpLicense" className="text-sm font-medium">
            QP License Number
          </label>
          <input
            type="text"
            id="qpLicense"
            name="qpLicense"
            value={formData.qpLicense}
            onChange={handleChange}
            className="input-base w-full"
            placeholder="Enter QP license number"
          />
        </div>
      </div>
    </div>
  );
};

export default TeamInfoSection;
