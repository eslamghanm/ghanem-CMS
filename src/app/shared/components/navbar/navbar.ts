import { Component } from '@angular/core';
import { Theme } from '../../../core/services/theme';
import { Settings } from '../../../core/services/settings';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  loggedIn = false;
  mobileOpen = false;

  constructor(private theme: Theme, private settings: Settings, private auth: Auth) {
    this.loggedIn = this.auth.isLoggedIn();
    this.auth.state$.subscribe(() => {
      this.loggedIn = this.auth.isLoggedIn();
    });
  }

  toggleTheme() {
    const current = this.settings.get().theme;
    const next = current === 'light' ? 'dark' : 'light';
    this.theme.applyTheme(next);
  }

  get dark(): boolean { return this.settings.get().theme === 'dark'; }

  logout() {
    this.auth.logout();
  }
}

