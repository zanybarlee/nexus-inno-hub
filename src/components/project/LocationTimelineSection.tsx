
import { MapPin } from 'lucide-react';
import { ProjectFormData } from '@/types/project';

interface LocationTimelineSectionProps {
  formData: ProjectFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  errors: Record<string, string>;
}

const LocationTimelineSection = ({ formData, handleChange, errors }: LocationTimelineSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <MapPin className="h-5 w-5 text-primary mr-2" />
        <h2 className="text-xl font-semibold">Location & Timeline</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`input-base w-full ${errors.location ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            placeholder="Project location/address"
          />
          {errors.location && (
            <p className="text-xs text-red-500 mt-1">{errors.location}</p>
          )}
        </div>
        
        <div></div>
        
        <div className="space-y-2">
          <label htmlFor="startDate" className="text-sm font-medium">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`input-base w-full ${errors.startDate ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
          />
          {errors.startDate && (
            <p className="text-xs text-red-500 mt-1">{errors.startDate}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="estimatedCompletion" className="text-sm font-medium">
            Estimated Completion
          </label>
          <input
            type="date"
            id="estimatedCompletion"
            name="estimatedCompletion"
            value={formData.estimatedCompletion}
            onChange={handleChange}
            className="input-base w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LocationTimelineSection;
