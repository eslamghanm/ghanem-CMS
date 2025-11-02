import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LocalStorageService } from './local-storage';
import { Patient } from '../models/patient.model';
import { Treatment } from '../models/treatment.model';
import { Invoice } from '../models/invoice.model';
import { ClinicSettings } from '../models/clinic-settings.model';

@Injectable({
  providedIn: 'root'
})
export class Seed {
  constructor(private http: HttpClient, private storage: LocalStorageService) {}

  async loadIfEmpty(): Promise<void> {
    const root = this.storage.getRoot();
    const empty = !root.patients.length && !root.treatments.length && !root.invoices.length;
    if (!empty) return;
    try {
      const data = await firstValueFrom(this.http.get<any>('assets/seed/seed.json'));
      const seeded = {
        version: 1,
        patients: (data.patients as Patient[]) || [],
        treatments: (data.treatments as Treatment[]) || [],
        invoices: (data.invoices as Invoice[]) || [],
        settings: (data.settings as ClinicSettings) || root.settings,
      };
      this.storage.setRoot(seeded);
    } catch {
      // ignore
    }
  }
}
