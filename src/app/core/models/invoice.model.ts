export type InvoiceStatus = 'draft' | 'paid';

export interface InvoiceItem {
  treatmentId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  subtotal: number; // unitPrice * quantity
}

export interface Invoice {
  id: string;
  patientId: string;
  items: InvoiceItem[];
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
  status: InvoiceStatus;
  discountType?: 'percent' | 'fixed';
  discountValue?: number; // percent e.g. 10 for 10%, or fixed amount
  taxRate?: number; // e.g. 0.14
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  tax: number;
  total: number;
  paymentMethod?: string; // cash, card, etc.
  notes?: string;
}
