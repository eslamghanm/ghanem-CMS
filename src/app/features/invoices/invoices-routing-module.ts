import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Invoices } from './invoices';
import { InvoicePrint } from './components/invoice-print/invoice-print';

const routes: Routes = [
  { path: '', component: Invoices },
  { path: 'print/:id', component: InvoicePrint },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
