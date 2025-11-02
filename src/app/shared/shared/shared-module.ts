import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Navbar } from '../components/navbar/navbar';
import { Footer } from '../components/footer/footer';
import { ToastContainer } from '../components/toast-container/toast-container';



@NgModule({
  declarations: [Navbar, ToastContainer, Footer],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, Navbar, ToastContainer, Footer]
})
export class SharedModule { }
