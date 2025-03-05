
import { useState } from 'react';
import { DollarSign, Edit, Trash2, Save, X, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/components/ui/custom/Button';
import { toast } from 'sonner';

interface FeeStructure {
  id: number;
  name: string;
  description: string;
  amount: number;
  type: 'percentage' | 'fixed';
  isActive: boolean;
}

const FeeManagement = () => {
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([
    {
      id: 1,
      name: 'Processing Fee',
      description: 'Standard processing fee for all transactions',
      amount: 2.5,
      type: 'percentage',
      isActive: true
    },
    {
      id: 2,
      name: 'Expedited Review',
      description: 'Fee for expedited project reviews',
      amount: 50,
      type: 'fixed',
      isActive: true
    },
    {
      id: 3,
      name: 'International Transaction',
      description: 'Fee for international payments',
      amount: 1.5,
      type: 'percentage',
      isActive: false
    }
  ]);

  const [editingFee, setEditingFee] = useState<FeeStructure | null>(null);
  const [newFee, setNewFee] = useState<Partial<FeeStructure>>({
    name: '',
    description: '',
    amount: 0,
    type: 'fixed',
    isActive: true
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleEditFee = (fee: FeeStructure) => {
    setEditingFee(fee);
  };

  const handleCancelEdit = () => {
    setEditingFee(null);
  };

  const handleUpdateFee = () => {
    if (editingFee) {
      const updatedFees = feeStructures.map(fee => 
        fee.id === editingFee.id ? editingFee : fee
      );
      setFeeStructures(updatedFees);
      setEditingFee(null);
      toast.success('Fee structure updated successfully');
    }
  };

  const handleToggleFeeStatus = (id: number) => {
    const updatedFees = feeStructures.map(fee => 
      fee.id === id ? { ...fee, isActive: !fee.isActive } : fee
    );
    setFeeStructures(updatedFees);
    toast.success('Fee status updated');
  };

  const handleDeleteFee = (id: number) => {
    const updatedFees = feeStructures.filter(fee => fee.id !== id);
    setFeeStructures(updatedFees);
    toast.success('Fee structure removed');
  };

  const handleAddNew = () => {
    if (!newFee.name || !newFee.description || newFee.amount === undefined) {
      toast.error('Please complete all required fields');
      return;
    }

    const newFeeComplete = {
      ...newFee,
      id: Date.now(),
      isActive: newFee.isActive || true,
      type: newFee.type || 'fixed',
      amount: Number(newFee.amount)
    } as FeeStructure;

    setFeeStructures([...feeStructures, newFeeComplete]);
    setNewFee({
      name: '',
      description: '',
      amount: 0,
      type: 'fixed',
      isActive: true
    });
    setIsAddingNew(false);
    toast.success('New fee structure added');
  };

  const handleEditingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (editingFee) {
      setEditingFee({
        ...editingFee,
        [name]: type === 'number' ? Number(value) : value
      });
    }
  };

  const handleNewFeeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setNewFee({
      ...newFee,
      [name]: type === 'number' ? Number(value) : value
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fee Structures</CardTitle>
          <CardDescription>
            Configure and manage the fee structures for your projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feeStructures.map((fee) => (
              <div key={fee.id} className="p-4 border rounded-lg">
                {editingFee && editingFee.id === fee.id ? (
                  // Edit mode
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Fee Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={editingFee.name}
                          onChange={handleEditingChange}
                          className="input-base w-full"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="type" className="text-sm font-medium">
                          Fee Type
                        </label>
                        <select
                          id="type"
                          name="type"
                          value={editingFee.type}
                          onChange={handleEditingChange}
                          className="input-base w-full"
                        >
                          <option value="fixed">Fixed Amount</option>
                          <option value="percentage">Percentage</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="amount" className="text-sm font-medium">
                          Amount
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={editingFee.amount}
                            onChange={handleEditingChange}
                            className="input-base w-full pl-8"
                            step={editingFee.type === 'percentage' ? 0.1 : 1}
                          />
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            {editingFee.type === 'fixed' ? '$' : '%'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={editingFee.description}
                        onChange={handleEditingChange}
                        className="input-base w-full"
                        rows={2}
                      ></textarea>
                    </div>
                    
                    <div className="flex space-x-2 justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleCancelEdit}
                        leftIcon={<X size={16} />}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={handleUpdateFee}
                        leftIcon={<Save size={16} />}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  // View mode
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="mr-4 bg-primary/10 p-2 rounded-full">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{fee.name}</h3>
                          {!fee.isActive && (
                            <span className="ml-2 text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                              Inactive
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{fee.description}</p>
                        <p className="text-sm font-medium mt-1">
                          {fee.type === 'fixed' ? `$${fee.amount.toFixed(2)}` : `${fee.amount}%`}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleToggleFeeStatus(fee.id)}
                      >
                        {fee.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditFee(fee)}
                        leftIcon={<Edit size={16} />}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteFee(fee.id)}
                        leftIcon={<Trash2 size={16} />}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isAddingNew ? (
              <div className="p-4 border rounded-lg">
                <div className="space-y-4">
                  <h3 className="font-medium">Add New Fee Structure</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="newName" className="text-sm font-medium">
                        Fee Name
                      </label>
                      <input
                        type="text"
                        id="newName"
                        name="name"
                        value={newFee.name}
                        onChange={handleNewFeeChange}
                        className="input-base w-full"
                        placeholder="Enter fee name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="newType" className="text-sm font-medium">
                        Fee Type
                      </label>
                      <select
                        id="newType"
                        name="type"
                        value={newFee.type}
                        onChange={handleNewFeeChange}
                        className="input-base w-full"
                      >
                        <option value="fixed">Fixed Amount</option>
                        <option value="percentage">Percentage</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="newAmount" className="text-sm font-medium">
                        Amount
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="newAmount"
                          name="amount"
                          value={newFee.amount}
                          onChange={handleNewFeeChange}
                          className="input-base w-full pl-8"
                          step={newFee.type === 'percentage' ? 0.1 : 1}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          {newFee.type === 'fixed' ? '$' : '%'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="newDescription" className="text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      id="newDescription"
                      name="description"
                      value={newFee.description}
                      onChange={handleNewFeeChange}
                      className="input-base w-full"
                      rows={2}
                      placeholder="Brief description of this fee"
                    ></textarea>
                  </div>
                  
                  <div className="flex space-x-2 justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsAddingNew(false)}
                      leftIcon={<X size={16} />}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={handleAddNew}
                      leftIcon={<Save size={16} />}
                    >
                      Add Fee
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => setIsAddingNew(true)}
              >
                Add New Fee Structure
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-secondary/50 rounded-lg p-4 flex items-start">
        <Info className="h-5 w-5 text-muted-foreground mt-0.5 mr-3 shrink-0" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium mb-1">About Fee Management</p>
          <p>
            Fee structures defined here will automatically be applied to relevant transactions.
            You can create both percentage-based and fixed amount fees, and activate or deactivate
            them as needed without deleting the configuration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeeManagement;
