import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './login';
import { Register } from './register';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}

