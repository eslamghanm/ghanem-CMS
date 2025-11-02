import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClinicSettings } from '../models/clinic-settings.model';
import { LocalStorageService } from './local-storage';

@Injectable({
  providedIn: 'root'
})
export class Settings {
  private readonly settings$ = new BehaviorSubject<ClinicSettings | null>(null);

  constructor(private storage: LocalStorageService) {
    this.settings$.next(this.storage.read('settings'));
  }

  stream() { return this.settings$.asObservable(); }
  get(): ClinicSettings { return this.settings$.getValue()!; }
  update(partial: Partial<ClinicSettings>) {
    const next = { ...this.get(), ...partial } as ClinicSettings;
    this.settings$.next(next);
    this.storage.write('settings', next);
  }
}
