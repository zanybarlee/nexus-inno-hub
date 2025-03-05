
import { useState } from 'react';
import { FileDown, Printer, Filter, RefreshCw } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import Button from '@/components/ui/custom/Button';
import { toast } from '@/hooks/use-toast';

interface ReportsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onRefresh?: () => void;
  dateRanges?: string[];
  reportTypes?: string[];
  isLoading?: boolean;
}

const ReportsSection = ({
  title,
  description,
  children,
  onRefresh,
  dateRanges = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'This year', 'All time'],
  reportTypes = [],
  isLoading = false,
}: ReportsSectionProps) => {
  const [dateRange, setDateRange] = useState(dateRanges[1]); // Default to 30 days
  const [reportType, setReportType] = useState(reportTypes.length > 0 ? reportTypes[0] : '');

  const handleExport = () => {
    toast({
      title: 'Report Exported',
      description: `${title} report for ${dateRange} has been exported as CSV.`,
    });
  };

  const handlePrint = () => {
    toast({
      title: 'Printing Report',
      description: `Preparing ${title} report for printing.`,
    });
    window.print();
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
      toast({
        title: 'Data Refreshed',
        description: 'The report data has been updated.',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<RefreshCw size={16} />}
            onClick={handleRefresh}
            disabled={isLoading}
          >
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<FileDown size={16} />}
            onClick={handleExport}
          >
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<Printer size={16} />}
            onClick={handlePrint}
          >
            Print
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-muted/50 rounded-lg">
        <Filter size={16} className="text-muted-foreground" />
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm whitespace-nowrap">Time period:</span>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateRanges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {reportTypes.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm whitespace-nowrap">Report type:</span>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-[180px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* Report content */}
      <div className={isLoading ? 'opacity-60' : ''}>
        {children}
      </div>
    </div>
  );
};

export default ReportsSection;
