import { Component } from '@angular/core';
import { Settings as SettingsService } from '../../core/services/settings';
import { LocalStorageService } from '../../core/services/local-storage';
import { Toast } from '../../core/services/toast';
import { ClinicSettings } from '../../core/models/clinic-settings.model';

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  cfg: ClinicSettings;
  constructor(public settings: SettingsService, private storage: LocalStorageService, private toast: Toast) {
    this.cfg = settings.get();
  }

  save() {
    this.settings.update(this.cfg);
    this.toast.success('Settings saved');
  }

  exportAll() {
    const blob = new Blob([this.storage.exportJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='gh_dental_export.json'; a.click(); URL.revokeObjectURL(url);
  }

  importAll(ev: Event) {
    const input = ev.target as HTMLInputElement; const file = input.files?.[0]; if (!file) return;
    const reader = new FileReader(); reader.onload = () => {
      try { this.storage.importJson(String(reader.result)); this.toast.success('Data imported'); location.reload(); }
      catch { this.toast.error('Invalid JSON'); }
    }; reader.readAsText(file);
  }

  clearAll() {
    if (!confirm('This will delete all local data. Continue?')) return;
    this.storage.clear();
    location.reload();
  }
}
