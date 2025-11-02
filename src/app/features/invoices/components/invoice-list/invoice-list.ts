import { Component } from '@angular/core';
import { Invoices } from '../../../../core/services/invoices';
import { Patients } from '../../../../core/services/patients';
import { Invoice } from '../../../../core/models/invoice.model';

@Component({
  selector: 'app-invoice-list',
  standalone: false,
  templateUrl: './invoice-list.html',
  styleUrl: './invoice-list.css'
})
export class InvoiceList {
  query = '';
  constructor(public invoices: Invoices, public patients: Patients) {}

  get filtered(): Invoice[] {
    const q = this.query.toLowerCase().trim();
    const list = this.invoices.list();
    if (!q) return list;
    return list.filter(i => {
      const p = this.patients.get(i.patientId);
      return (p?.name||'').toLowerCase().includes(q) || i.id.toLowerCase().includes(q);
    });
  }

  markPaid(id: string) { this.invoices.markPaid(id); }

  exportJson() {
    const blob = new Blob([this.invoices.exportInvoicesJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'invoices.json'; a.click();
    URL.revokeObjectURL(url);
  }

  exportCsv() {
    const rows = [['id','patient','status','total','createdAt']];
    this.invoices.list().forEach(i => rows.push([i.id, this.patients.get(i.patientId)?.name||'', i.status, String(i.total), i.createdAt]));
    const csv = rows.map(r => r.map(v => '"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'invoices.csv'; a.click();
    URL.revokeObjectURL(url);
  }
}
