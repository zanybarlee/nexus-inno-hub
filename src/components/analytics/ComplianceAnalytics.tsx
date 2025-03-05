
import { BarChart, FileWarning, CheckCircle, AlertTriangle, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ComplianceAnalyticsProps {
  complianceScore: number;
  complianceByCategory: {
    category: string;
    score: number;
    total: number;
  }[];
  recentIssues: {
    project: string;
    issue: string;
    severity: 'low' | 'medium' | 'high';
    date: string;
  }[];
  isLoading?: boolean;
}

const ComplianceAnalytics = ({
  complianceScore,
  complianceByCategory,
  recentIssues,
  isLoading = false,
}: ComplianceAnalyticsProps) => {
  // Function to determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Function to determine severity icon and color
  const getSeverityDetails = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high':
        return { icon: AlertTriangle, color: 'text-red-500' };
      case 'medium':
        return { icon: AlertTriangle, color: 'text-yellow-500' };
      case 'low':
        return { icon: AlertTriangle, color: 'text-blue-500' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Overall Compliance Score */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overall Compliance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-16 bg-muted animate-pulse rounded" />
            ) : (
              <div className="flex items-center">
                <div className="mr-4 h-14 w-14 rounded-full border-4 flex items-center justify-center">
                  <span className={`text-2xl font-bold ${getScoreColor(complianceScore)}`}>
                    {complianceScore}%
                  </span>
                </div>
                <div>
                  <div className="flex items-center">
                    {complianceScore >= 90 ? (
                      <CheckCircle className="h-5 w-5 mr-1 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 mr-1 text-yellow-500" />
                    )}
                    <span className="text-sm font-medium">
                      {complianceScore >= 90
                        ? 'Good Standing'
                        : complianceScore >= 70
                        ? 'Needs Attention'
                        : 'Critical Issues'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on {complianceByCategory.reduce((acc, item) => acc + item.total, 0)} checkpoints
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Compliance by Category */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Compliance by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 bg-muted animate-pulse rounded" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {complianceByCategory.map((category, index) => {
                  const percentage = Math.round((category.score / category.total) * 100);
                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{category.category}</span>
                        <span className={`font-medium ${getScoreColor(percentage)}`}>
                          {category.score}/{category.total} ({percentage}%)
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" 
                        indicators={[
                          { value: 70, variant: "warning" },
                          { value: 90, variant: "success" },
                        ]}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Compliance Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <FileWarning className="mr-2 h-5 w-5 text-primary" />
            Recent Compliance Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-muted animate-pulse rounded" />
              ))}
            </div>
          ) : recentIssues.length > 0 ? (
            <div className="space-y-4">
              {recentIssues.map((issue, index) => {
                const { icon: SeverityIcon, color } = getSeverityDetails(issue.severity);
                
                return (
                  <div key={index} className="flex items-start space-x-4 p-3 rounded-lg bg-muted/50">
                    <div className={cn("h-8 w-8 rounded-full flex items-center justify-center bg-background", color)}>
                      <SeverityIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">{issue.project}</h4>
                        <span className="text-xs text-muted-foreground">{issue.date}</span>
                      </div>
                      <p className="text-sm mt-1">{issue.issue}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="rounded-full bg-green-50 p-3 mb-4">
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <h4 className="text-sm font-medium mb-1">No Issues Found</h4>
              <p className="text-xs text-muted-foreground">All projects are currently compliant</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceAnalytics;
