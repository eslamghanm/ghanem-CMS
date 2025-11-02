import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  error = '';
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {}

  submit() {
    this.error = '';
    if (this.form.invalid) return;
    const { email, password } = this.form.value as any;
    const ok = this.auth.login(email, password);
    if (ok) {
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'بيانات الدخول غير صحيحة';
    }
  }
}

