import { Injectable } from '@angular/core';
import { Settings } from './settings';

@Injectable({
  providedIn: 'root'
})
export class Theme {
  constructor(private settings: Settings) {}

  applyTheme(theme: 'light'|'dark') {
    const html = document.documentElement;
    html.classList.toggle('dark', theme === 'dark');
    this.settings.update({ theme });
  }
}
