
import { BarChart3, ClipboardCheck, TrendingUp, Clock, Calendar, BarChart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface PerformanceData {
  approvalRate: {
    currentRate: number;
    previousRate: number;
    change: number;
  };
  reviewTime: {
    average: string;
    fastestProject: string;
    slowestProject: string;
  };
  monthlyApprovals: {
    month: string;
    count: number;
  }[];
  projectTypePerformance: {
    type: string;
    approvalRate: number;
    count: number;
  }[];
  isLoading?: boolean;
}

const PerformanceAnalytics = ({
  approvalRate,
  reviewTime,
  monthlyApprovals,
  projectTypePerformance,
  isLoading = false,
}: PerformanceData) => {
  // Helper to get trend direction
  const getTrendClass = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  // Get the max value for creating relative bar heights
  const maxMonthlyCount = Math.max(...monthlyApprovals.map(item => item.count), 1);

  return (
    <div className="space-y-6">
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Approval Rate */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <ClipboardCheck className="mr-2 h-4 w-4 text-primary" />
              Approval Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-16 bg-muted animate-pulse rounded" />
            ) : (
              <div className="space-y-2">
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-bold">{approvalRate.currentRate}%</h3>
                  <div className={`flex items-center text-sm ${getTrendClass(approvalRate.change)}`}>
                    <span>{approvalRate.change > 0 ? '+' : ''}{approvalRate.change}%</span>
                    <TrendingUp className="ml-1 h-4 w-4" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Previous period: {approvalRate.previousRate}%
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Review Time */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4 text-primary" />
              Average Review Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-16 bg-muted animate-pulse rounded" />
            ) : (
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{reviewTime.average}</h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>
                    <p>Fastest review:</p>
                    <p className="font-medium">{reviewTime.fastestProject}</p>
                  </div>
                  <div>
                    <p>Slowest review:</p>
                    <p className="font-medium">{reviewTime.slowestProject}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Monthly Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-64 bg-muted animate-pulse rounded" />
            ) : (
              <div className="h-64 flex items-end space-x-2">
                {monthlyApprovals.map((item, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-primary/80 rounded-t hover:bg-primary transition-colors"
                      style={{ height: `${(item.count / maxMonthlyCount) * 100}%` }}
                    >
                      <span className="sr-only">{item.count} approvals in {item.month}</span>
                    </div>
                    <div className="pt-2 text-xs w-full text-center">
                      <span className="block truncate">{item.month}</span>
                      <span className="font-medium">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project Type Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-primary" />
              Performance by Project Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-64 bg-muted animate-pulse rounded" />
            ) : (
              <div className="space-y-6 h-64 overflow-y-auto pr-2">
                {projectTypePerformance.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="font-medium">{item.type}</span>
                        <span className="text-xs text-muted-foreground ml-2">({item.count} projects)</span>
                      </div>
                      <span className="font-medium">{item.approvalRate}%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${item.approvalRate}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
