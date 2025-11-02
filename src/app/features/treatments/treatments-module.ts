import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared/shared-module';

import { TreatmentsRoutingModule } from './treatments-routing-module';
import { Treatments } from './treatments';
import { TreatmentList } from './components/treatment-list/treatment-list';
import { TreatmentForm } from './components/treatment-form/treatment-form';


@NgModule({
  declarations: [
    Treatments,
    TreatmentList,
    TreatmentForm
  ],
  imports: [CommonModule, SharedModule, TreatmentsRoutingModule]
})
export class TreatmentsModule { }
