import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { Login } from './features/auth/login';
import { Register } from './features/auth/register';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: () => import('./features/dashboard/dashboard-module').then(m => m.DashboardModule) },
  { path: 'patients', canActivate: [AuthGuard], loadChildren: () => import('./features/patients/patients-module').then(m => m.PatientsModule) },
  { path: 'treatments', canActivate: [AuthGuard], loadChildren: () => import('./features/treatments/treatments-module').then(m => m.TreatmentsModule) },
  { path: 'invoices', canActivate: [AuthGuard], loadChildren: () => import('./features/invoices/invoices-module').then(m => m.InvoicesModule) },
  { path: 'settings', canActivate: [AuthGuard], loadChildren: () => import('./features/settings/settings-module').then(m => m.SettingsModule) },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
