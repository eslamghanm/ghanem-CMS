import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  password: string; // demo only; do NOT store plain passwords in real apps
}

const USER_KEY = 'auth_user_v1';
const SESSION_KEY = 'auth_session_v1';

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly stateSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  readonly state$ = this.stateSubject.asObservable();

  constructor(private router: Router) {}

  register(input: { name: string; email: string; password: string }): void {
    const user: AuthUser = { id: Date.now().toString(36), ...input };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    // auto-login
    localStorage.setItem(SESSION_KEY, JSON.stringify({ uid: user.id }));
    this.stateSubject.next(true);
  }

  login(email: string, password: string): boolean {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return false;
    const user = JSON.parse(raw) as AuthUser;
    const ok = user.email === email && user.password === password;
    if (ok) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ uid: user.id }));
      this.stateSubject.next(true);
    }
    return ok;
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    this.stateSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    try {
      return !!localStorage.getItem(SESSION_KEY);
    } catch {
      return false;
    }
  }
}

