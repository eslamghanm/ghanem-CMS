import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared/shared-module';

import { InvoicesRoutingModule } from './invoices-routing-module';
import { Invoices } from './invoices';
import { InvoicePrint } from './components/invoice-print/invoice-print';
import { InvoiceList } from './components/invoice-list/invoice-list';
import { InvoiceBuilder } from './components/invoice-builder/invoice-builder';


@NgModule({
  declarations: [
    Invoices,
    InvoicePrint,
    InvoiceList,
    InvoiceBuilder
  ],
  imports: [CommonModule, SharedModule, InvoicesRoutingModule]
})
export class InvoicesModule { }
