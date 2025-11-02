import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoices } from '../../../../core/services/invoices';
import { Patients } from '../../../../core/services/patients';
import { Settings } from '../../../../core/services/settings';
import { Invoice } from '../../../../core/models/invoice.model';

@Component({
  selector: 'app-invoice-print',
  standalone: false,
  templateUrl: './invoice-print.html',
  styleUrl: './invoice-print.css'
})
export class InvoicePrint implements OnInit {
  invoice?: Invoice;
  constructor(private route: ActivatedRoute, public invoices: Invoices, public patients: Patients, public settings: Settings) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.invoice = this.invoices.byId(id);
    setTimeout(() => window.print(), 200);
  }
}
