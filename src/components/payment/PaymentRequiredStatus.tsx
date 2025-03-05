
import React from 'react';
import { CreditCard, DollarSign, Check } from 'lucide-react';
import Button from '@/components/ui/custom/Button';
import { useNavigate } from 'react-router-dom';

interface PaymentRequiredStatusProps {
  onProcessPayment: () => void;
}

const PaymentRequiredStatus: React.FC<PaymentRequiredStatusProps> = ({ onProcessPayment }) => {
  const navigate = useNavigate();
  
  // Mock submission fee
  const submissionFee = 750;
  
  return (
    <div className="border rounded-lg p-6 bg-card">
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
          <DollarSign className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-medium">Payment Required</h3>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4 bg-card/50">
            <p className="text-sm text-muted-foreground mb-1">Submission Fee</p>
            <p className="text-2xl font-bold">${submissionFee.toFixed(2)}</p>
          </div>
          
          <div className="border rounded-md p-4 bg-card/50">
            <p className="text-sm text-muted-foreground mb-1">Payment Status</p>
            <div className="flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
              <span className="text-lg font-medium">Pending Payment</span>
            </div>
          </div>
        </div>
        
        <div className="bg-secondary/50 rounded-lg p-4 flex items-start">
          <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5 mr-3 shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="mb-1">Payment is required to proceed with your submission.</p>
            <p>You can pay now using a saved payment method or manage your payment options.</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
          <Button
            variant="outline"
            leftIcon={<CreditCard size={18} />}
            onClick={() => navigate('/payments')}
          >
            Manage Payment Methods
          </Button>
          
          <Button
            variant="primary"
            leftIcon={<Check size={18} />}
            onClick={onProcessPayment}
          >
            Pay ${submissionFee.toFixed(2)} Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentRequiredStatus;
