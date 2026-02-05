// Tüketici Hakem Heyeti (Consumer Arbitration) TypeScript Types

export interface WizardField {
  id: string;
  type: 'text' | 'textarea' | 'number' | 'date' | 'select' | 'tel' | 'boolean';
  label: string;
  placeholder?: string;
  required: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
  };
  help_text?: string;
  rows?: number;
  options?: FieldOption[];
}

export interface FieldOption {
  value: string;
  label: string;
}

export interface WizardStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  fields: WizardField[];
}

export interface ArbitrationFormData {
  // Step 1: Firm Info
  firm_name?: string;
  firm_address?: string;
  firm_phone?: string;
  firm_tax_no?: string;
  
  // Step 2: Product Info
  product_type?: 'product' | 'service';
  product_name?: string;
  product_brand?: string;
  invoice_number?: string;
  purchase_date?: string;
  purchase_place?: string;
  product_price?: number;
  warranty_status?: 'under_warranty' | 'warranty_expired' | 'no_warranty';
  
  // Step 3: Complaint Details
  complaint_type?: string;
  defect_description?: string;
  defect_date?: string;
  previous_contact?: string;
  contact_date?: string;
  company_response?: string;
  
  // Step 4: Demand
  demand_type?: string;
  demand_amount?: number;
  demand_explanation?: string;
  
  // Step 5: Documents
  has_invoice?: boolean;
  has_warranty?: boolean;
  has_correspondence?: boolean;
  has_photos?: boolean;
  has_expert_report?: boolean;
  document_notes?: string;
}

export interface DocumentChecklist {
  has_invoice: boolean;
  has_warranty: boolean;
  has_correspondence: boolean;
  has_photos: boolean;
  has_expert_report: boolean;
  document_notes?: string;
}

export interface ArbitrationApplication {
  id: string;
  formData: ArbitrationFormData;
  status: 'draft' | 'completed' | 'submitted';
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
  thh_file_number?: string;
  thh_submission_date?: string;
}
