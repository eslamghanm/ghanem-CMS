import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {}

  submit() {
    if (this.form.invalid) return;
    const { name, email, password } = this.form.value as any;
    this.auth.register({ name, email, password });
    this.router.navigate(['/dashboard']);
  }
}

