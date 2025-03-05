
import { useState } from 'react';
import { CreditCard, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/components/ui/custom/Button';
import { toast } from 'sonner';

const cardTypeOptions = [
  { id: 'visa', name: 'Visa', icon: '💳' },
  { id: 'mastercard', name: 'Mastercard', icon: '💳' },
  { id: 'amex', name: 'American Express', icon: '💳' },
];

const PaymentMethodForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    cardType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedCards, setSavedCards] = useState([
    { id: 1, type: 'visa', last4: '4242', expiry: '04/25', isDefault: true }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to payment gateway
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Add the new card to saved cards
      const newCard = {
        id: Date.now(),
        type: formData.cardType || 'visa',
        last4: formData.cardNumber.slice(-4),
        expiry: formData.expiryDate,
        isDefault: savedCards.length === 0
      };
      
      setSavedCards([...savedCards, newCard]);
      
      // Reset form
      setFormData({
        cardNumber: '',
        cardholderName: '',
        expiryDate: '',
        cvv: '',
        cardType: '',
      });
      
      toast.success('Payment method added successfully');
    }, 1500);
  };

  const setDefaultCard = (id: number) => {
    const updatedCards = savedCards.map(card => ({
      ...card,
      isDefault: card.id === id
    }));
    setSavedCards(updatedCards);
    toast.success('Default payment method updated');
  };

  const deleteCard = (id: number) => {
    const updatedCards = savedCards.filter(card => card.id !== id);
    setSavedCards(updatedCards);
    toast.success('Payment method removed');
  };

  return (
    <div className="space-y-6">
      {/* Saved Cards */}
      {savedCards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Saved Payment Methods</CardTitle>
            <CardDescription>
              Manage your saved payment methods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {savedCards.map((card) => (
                <div key={card.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <div className="mr-4 bg-primary/10 p-2 rounded-full">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {card.type.charAt(0).toUpperCase() + card.type.slice(1)} •••• {card.last4}
                        {card.isDefault && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">Expires {card.expiry}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!card.isDefault && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setDefaultCard(card.id)}
                      >
                        Set Default
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteCard(card.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Add New Card Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add Payment Method</CardTitle>
          <CardDescription>
            Add a new credit or debit card for faster payment processing
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="cardType" className="text-sm font-medium">
                Card Type
              </label>
              <select
                id="cardType"
                name="cardType"
                value={formData.cardType}
                onChange={handleChange}
                className="input-base w-full"
                required
              >
                <option value="" disabled>Select card type</option>
                {cardTypeOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="cardNumber" className="text-sm font-medium">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className="input-base w-full"
                required
                maxLength={19}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="cardholderName" className="text-sm font-medium">
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleChange}
                placeholder="John Doe"
                className="input-base w-full"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="expiryDate" className="text-sm font-medium">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="input-base w-full"
                  required
                  maxLength={5}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="cvv" className="text-sm font-medium">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  className="input-base w-full"
                  required
                  maxLength={4}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              leftIcon={isSubmitting ? undefined : <Check size={18} />}
            >
              {isSubmitting ? 'Saving...' : 'Save Payment Method'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default PaymentMethodForm;
