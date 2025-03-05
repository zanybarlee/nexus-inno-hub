
import { useState } from 'react';
import { CreditCard, DollarSign, Receipt, ChevronRight, Shield } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/components/ui/custom/Button';
import PaymentMethodForm from '@/components/payment/PaymentMethodForm';
import FeeManagement from '@/components/payment/FeeManagement';
import PaymentHistory from '@/components/payment/PaymentHistory';
import { toast } from 'sonner';

const Payments = () => {
  const [activeTab, setActiveTab] = useState('methods');

  return (
    <MainLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Payment Management</h1>
            <p className="text-muted-foreground">Manage payment methods, view transaction history, and handle fees</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Payment Summary Card */}
            <Card className="lg:col-span-4">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <DollarSign className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Current Balance</p>
                      <p className="text-2xl font-bold">$1,250.00</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Receipt className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Paid</p>
                      <p className="text-2xl font-bold">$5,680.00</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-orange-100 p-2 rounded-full">
                      <CreditCard className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold">$320.00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    fullWidth 
                    className="justify-between" 
                    onClick={() => {
                      setActiveTab('methods');
                      toast.success('Add a new payment method to make transactions');
                    }}
                  >
                    <span className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    fullWidth 
                    className="justify-between"
                    onClick={() => {
                      setActiveTab('fees');
                      toast.success('Configure your fee structure');
                    }}
                  >
                    <span className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Manage Fees
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    fullWidth 
                    className="justify-between"
                    onClick={() => {
                      setActiveTab('history');
                      toast.success('View your transaction history');
                    }}
                  >
                    <span className="flex items-center">
                      <Receipt className="h-4 w-4 mr-2" />
                      View Payments
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Your payment information is secured
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span>Payment data encryption</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full border-b rounded-none justify-start mb-6">
                  <TabsTrigger value="methods">Payment Methods</TabsTrigger>
                  <TabsTrigger value="fees">Fee Management</TabsTrigger>
                  <TabsTrigger value="history">Payment History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="methods">
                  <PaymentMethodForm />
                </TabsContent>
                
                <TabsContent value="fees">
                  <FeeManagement />
                </TabsContent>
                
                <TabsContent value="history">
                  <PaymentHistory />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Payments;
