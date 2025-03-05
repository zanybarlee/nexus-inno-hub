
export interface ProjectFormData {
  projectName: string;
  description: string;
  location: string;
  projectType: string;
  startDate: string;
  estimatedCompletion: string;
  developerName: string;
  qpName: string;
  qpLicense: string;
  teamMembers: string;
  paymentStatus?: 'pending' | 'paid' | 'partial';
  submissionFee?: number;
}

export interface SubmissionPayment {
  id: string;
  amount: number;
  status: 'pending' | 'paid';
  paymentMethod: string;
  paymentDate?: string;
}
