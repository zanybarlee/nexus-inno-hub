
import { useState } from 'react';
import { Download, Filter, Search, Eye, ArrowUpDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/components/ui/custom/Button';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: 'completed' | 'pending' | 'failed';
  type: 'payment' | 'refund' | 'fee';
  projectId?: string;
  projectName?: string;
}

const PaymentHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'txn_10001',
      date: '2023-09-12',
      amount: 550,
      description: 'Project submission fee',
      status: 'completed',
      type: 'payment',
      projectId: 'PROJ-001',
      projectName: 'Riverside Towers'
    },
    {
      id: 'txn_10002',
      date: '2023-09-18',
      amount: 50,
      description: 'Expedited review fee',
      status: 'completed',
      type: 'fee',
      projectId: 'PROJ-001',
      projectName: 'Riverside Towers'
    },
    {
      id: 'txn_10003',
      date: '2023-10-05',
      amount: 750,
      description: 'Project submission fee',
      status: 'completed',
      type: 'payment',
      projectId: 'PROJ-002',
      projectName: 'Central Business Complex'
    },
    {
      id: 'txn_10004',
      date: '2023-10-15',
      amount: -150,
      description: 'Partial refund',
      status: 'completed',
      type: 'refund',
      projectId: 'PROJ-001',
      projectName: 'Riverside Towers'
    },
    {
      id: 'txn_10005',
      date: '2023-11-01',
      amount: 320,
      description: 'Review revision fee',
      status: 'pending',
      type: 'payment',
      projectId: 'PROJ-003',
      projectName: 'Harbor View Residences'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleTypeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeFilter(e.target.value);
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Apply filters and sorting
  const filteredTransactions = transactions
    .filter(transaction => {
      // Search filter
      if (searchTerm && !transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !transaction.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !transaction.id.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Status filter
      if (statusFilter !== 'all' && transaction.status !== statusFilter) {
        return false;
      }
      
      // Type filter
      if (typeFilter !== 'all' && transaction.type !== typeFilter) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by date
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            View and filter your payment history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="input-base w-full pl-9"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={statusFilter}
                  onChange={handleStatusFilter}
                  className="input-base"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                
                <select
                  value={typeFilter}
                  onChange={handleTypeFilter}
                  className="input-base"
                >
                  <option value="all">All Types</option>
                  <option value="payment">Payments</option>
                  <option value="refund">Refunds</option>
                  <option value="fee">Fees</option>
                </select>
                
                <Button
                  variant="outline"
                  leftIcon={<ArrowUpDown size={16} />}
                  onClick={toggleSortDirection}
                >
                  {sortDirection === 'desc' ? 'Newest First' : 'Oldest First'}
                </Button>
              </div>
            </div>
            
            {/* Transactions Table */}
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium">ID</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Date</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Description</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Project</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Amount</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Status</th>
                    <th className="whitespace-nowrap px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="border-t">
                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                          {transaction.id}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          {transaction.description}
                        </td>
                        <td className="px-4 py-3">
                          {transaction.projectName || '-'}
                        </td>
                        <td className={`whitespace-nowrap px-4 py-3 font-medium ${
                          transaction.type === 'refund' ? 'text-green-600' : ''
                        }`}>
                          {transaction.type === 'refund' ? '-' : ''}
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            transaction.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : transaction.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <span className="sr-only">View details</span>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <span className="sr-only">Download receipt</span>
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">
                        No transactions match your filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Export */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                leftIcon={<Download size={16} />}
              >
                Export Transactions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentHistory;
