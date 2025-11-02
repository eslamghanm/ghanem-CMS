import { Component, OnInit } from '@angular/core';
import { Theme } from './core/services/theme';
import { Settings } from './core/services/settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ghanem-dental';
  constructor(private theme: Theme, private settings: Settings) {}
  ngOnInit(): void {
    // Apply saved theme on startup (limit to light/dark only)
    const saved = this.settings.get().theme as any;
    const normalized = saved === 'dark' ? 'dark' : 'light';
    this.theme.applyTheme(normalized);
  }
}
