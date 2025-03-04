
import { useState } from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  status: 'pass' | 'fail' | 'na';
}

interface ComplianceChecklistProps {
  items: ChecklistItem[];
  onItemStatusChange: (id: string, status: 'pass' | 'fail' | 'na') => void;
}

const ComplianceChecklist = ({ items, onItemStatusChange }: ComplianceChecklistProps) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = ['all', ...new Set(items.map(item => item.category))];
  
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center mb-4">
          <ShieldCheck className="h-5 w-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold">Compliance Checklist</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1 text-sm rounded-full ${
                activeCategory === category 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary/80'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-3">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    className={`w-16 py-1 text-xs font-medium rounded ${
                      item.status === 'pass' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 hover:bg-green-50'
                    }`}
                    onClick={() => onItemStatusChange(item.id, 'pass')}
                  >
                    Pass
                  </button>
                  <button
                    className={`w-16 py-1 text-xs font-medium rounded ${
                      item.status === 'fail' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-gray-100 hover:bg-red-50'
                    }`}
                    onClick={() => onItemStatusChange(item.id, 'fail')}
                  >
                    Fail
                  </button>
                  <button
                    className={`w-16 py-1 text-xs font-medium rounded ${
                      item.status === 'na' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 hover:bg-blue-50'
                    }`}
                    onClick={() => onItemStatusChange(item.id, 'na')}
                  >
                    N/A
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-secondary/30 flex items-start">
        <Info className="h-5 w-5 text-muted-foreground mt-0.5 mr-3 shrink-0" />
        <p className="text-sm text-muted-foreground">
          Complete this checklist to ensure the BIM model complies with all regulations.
          Use the Pass/Fail/N/A buttons to mark each item's status.
        </p>
      </div>
    </div>
  );
};

export default ComplianceChecklist;
