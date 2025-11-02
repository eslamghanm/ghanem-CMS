import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Patients } from './patients';

const routes: Routes = [{ path: '', component: Patients }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
