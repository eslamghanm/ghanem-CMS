import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Invoice, InvoiceItem } from '../models/invoice.model';
import { LocalStorageService } from './local-storage';
import { Settings } from './settings';
import { nowIso, uid } from '../utils/uid';
import { calculateBreakdown } from '../utils/invoice-calc';

@Injectable({
  providedIn: 'root'
})
export class Invoices {
  private readonly invoices$ = new BehaviorSubject<Invoice[]>([]);

  constructor(private storage: LocalStorageService, private settings: Settings) {
    this.invoices$.next(this.storage.read('invoices'));
  }

  stream() { return this.invoices$.asObservable(); }
  list(): Invoice[] { return this.invoices$.getValue(); }
  byId(id: string) { return this.list().find(i => i.id === id); }

  createDraft(params: {
    patientId: string;
    items: InvoiceItem[];
    discountType?: 'percent'|'fixed';
    discountValue?: number;
    taxRate?: number;
    paymentMethod?: string;
    notes?: string;
  }): Invoice {
    const now = nowIso();
    const s = this.settings.get();
    const tax = 0; // taxes disabled
    const breakdown = calculateBreakdown(
      params.items,
      tax,
      params.discountType,
      params.discountValue,
      s.rounding
    );
    const inv: Invoice = {
      id: uid('inv'),
      patientId: params.patientId,
      items: params.items.map(it => ({
        ...it,
        subtotal: it.unitPrice * it.quantity,
      })),
      createdAt: now,
      updatedAt: now,
      status: 'draft',
      discountType: params.discountType,
      discountValue: params.discountValue,
      taxRate: tax,
      subtotal: breakdown.subtotal,
      discountAmount: breakdown.discountAmount,
      taxableAmount: breakdown.taxableAmount,
      tax: breakdown.tax,
      total: breakdown.total,
      paymentMethod: params.paymentMethod,
      notes: params.notes,
    };
    const next = [inv, ...this.list()];
    this.commit(next);
    return inv;
  }

  markPaid(id: string): void {
    const now = nowIso();
    const next: Invoice[] = this.list().map((i): Invoice =>
      i.id === id ? { ...i, status: 'paid' as const, updatedAt: now } : i
    );
    this.commit(next);
  }

  update(inv: Invoice): void {
    const next = this.list().map(i => i.id === inv.id ? { ...inv, updatedAt: nowIso() } : i);
    this.commit(next);
  }

  remove(id: string): void { this.commit(this.list().filter(i => i.id !== id)); }

  exportInvoicesJson(): string {
    return JSON.stringify(this.list(), null, 2);
  }

  private commit(next: Invoice[]) {
    this.invoices$.next(next);
    this.storage.write('invoices', next);
  }
}
