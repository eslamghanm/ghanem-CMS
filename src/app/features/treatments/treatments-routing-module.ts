import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Treatments } from './treatments';

const routes: Routes = [{ path: '', component: Treatments }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentsRoutingModule { }
