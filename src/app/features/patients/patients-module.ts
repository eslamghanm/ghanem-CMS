import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared/shared-module';

import { PatientsRoutingModule } from './patients-routing-module';
import { Patients } from './patients';
import { PatientList } from './components/patient-list/patient-list';
import { PatientForm } from './components/patient-form/patient-form';


@NgModule({
  declarations: [
    Patients,
    PatientList,
    PatientForm
  ],
  imports: [CommonModule, SharedModule, PatientsRoutingModule]
})
export class PatientsModule { }
