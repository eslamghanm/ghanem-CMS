import { Invoice, InvoiceItem } from '../models/invoice.model';

export function round(value: number, mode: 'nearest'|'up'|'down' = 'nearest'): number {
  const f = 100; // round to 2 decimals
  if (mode === 'up') return Math.ceil(value * f) / f;
  if (mode === 'down') return Math.floor(value * f) / f;
  return Math.round(value * f) / f;
}

export function calculateBreakdown(
  items: InvoiceItem[],
  taxRate: number,
  discountType: 'percent'|'fixed'|undefined,
  discountValue: number|undefined,
  rounding: 'nearest'|'up'|'down' = 'nearest',
) {
  const subtotal = round(items.reduce((s, it) => s + it.unitPrice * it.quantity, 0), rounding);
  const discountAmount = round(
    !discountType || !discountValue ? 0 : discountType === 'percent' ? subtotal * (discountValue / 100) : discountValue,
    rounding
  );
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = round(taxableAmount * (taxRate || 0), rounding);
  const total = round(taxableAmount + tax, rounding);
  return { subtotal, discountAmount, taxableAmount, tax, total };
}

