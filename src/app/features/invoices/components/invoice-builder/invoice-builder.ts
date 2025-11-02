import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Patients } from '../../../../core/services/patients';
import { Treatments } from '../../../../core/services/treatments';
import { Invoices } from '../../../../core/services/invoices';
import { Toast } from '../../../../core/services/toast';
import { InvoiceItem } from '../../../../core/models/invoice.model';
import { Settings } from '../../../../core/services/settings';

@Component({
  selector: 'app-invoice-builder',
  standalone: false,
  templateUrl: './invoice-builder.html',
  styleUrl: './invoice-builder.css'
})
export class InvoiceBuilder {
  items: InvoiceItem[] = [];
  showPreview = false;

  form = this.fb.group({
    patientId: [''],
    paymentMethod: ['Cash'],
    discountType: ['percent' as 'percent'|'fixed'],
    discountValue: [0],
  });

  constructor(
    private fb: FormBuilder,
    public patients: Patients,
    public treatments: Treatments,
    private invoices: Invoices,
    private toast: Toast,
    public settings: Settings,
  ) {}

  addTreatment(treatmentId: string) {
    const t = this.treatments.get(treatmentId);
    if (!t) return;
    const existing = this.items.find(i => i.treatmentId === t.id);
    if (existing) { existing.quantity += 1; existing.subtotal = existing.quantity * existing.unitPrice; }
    else this.items.unshift({ treatmentId: t.id, name: t.name, unitPrice: t.basePrice, quantity: 1, subtotal: t.basePrice });
  }

  removeItem(idx: number) { this.items.splice(idx, 1); }

  save(status: 'draft'|'paid') {
    const v = this.form.value as any;
    if (!v.patientId) { this.toast.error('Please select a patient'); return; }
    if (!this.items.length) { this.toast.error('Please add at least one treatment'); return; }
    const inv = this.invoices.createDraft({
      patientId: v.patientId,
      items: this.items,
      discountType: v.discountType,
      discountValue: Number(v.discountValue)||0,
      paymentMethod: v.paymentMethod,
    });
    if (status === 'paid') this.invoices.markPaid(inv.id);
    this.toast.success(`Invoice saved as ${status}`);
    this.items = [];
    this.form.reset({ paymentMethod: 'Cash', discountType: 'percent', discountValue: 0, patientId: '' });
  }
}
