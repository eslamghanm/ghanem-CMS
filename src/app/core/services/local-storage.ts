import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';
import { Treatment } from '../models/treatment.model';
import { ClinicSettings } from '../models/clinic-settings.model';
import { Invoice } from '../models/invoice.model';

export interface RootDataV1 {
  version: number;
  patients: Patient[];
  treatments: Treatment[];
  invoices: Invoice[];
  settings: ClinicSettings;
}

const STORAGE_KEY = 'gh_dental_v1';
const CURRENT_VERSION = 1;

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private isAvailable = this.storageAvailable('localStorage');

  private get storage(): Storage | null {
    try {
      if (typeof window !== 'undefined' && this.isAvailable) {
        return window.localStorage;
      }
    } catch {
      // no-op
    }
    return null;
  }

  getRoot(): RootDataV1 {
    const storage = this.storage;
    if (!storage) {
      return this.defaultRoot();
    }
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) {
        const d = this.defaultRoot();
        this.setRoot(d);
        return d;
      }
      const parsed = JSON.parse(raw) as RootDataV1;
      if (!parsed.version || parsed.version < CURRENT_VERSION) {
        const migrated = this.migrate(parsed);
        this.setRoot(migrated);
        return migrated;
      }
      return parsed;
    } catch {
      return this.defaultRoot();
    }
  }

  setRoot(data: RootDataV1): void {
    const storage = this.storage;
    if (!storage) return;
    const toStore: RootDataV1 = { ...data, version: CURRENT_VERSION };
    storage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  }

  read<K extends keyof RootDataV1>(key: K): RootDataV1[K] {
    const root = this.getRoot();
    return root[key];
  }

  write<K extends keyof RootDataV1>(key: K, value: RootDataV1[K]): void {
    const root = this.getRoot();
    const next: RootDataV1 = { ...root, [key]: value } as RootDataV1;
    this.setRoot(next);
  }

  exportJson(): string {
    const root = this.getRoot();
    return JSON.stringify(root, null, 2);
  }

  importJson(json: string, opts: { overwrite: boolean } = { overwrite: true }): void {
    try {
      const parsed = JSON.parse(json) as Partial<RootDataV1>;
      const current = this.getRoot();
      const merged: RootDataV1 = opts.overwrite
        ? { ...(current as any), ...(parsed as any) }
        : { ...(parsed as any), ...(current as any) };
      merged.version = CURRENT_VERSION;
      this.setRoot(merged);
    } catch {
      throw new Error('Invalid JSON for import');
    }
  }

  clear(): void {
    const storage = this.storage;
    if (!storage) return;
    storage.removeItem(STORAGE_KEY);
  }

  private defaultRoot(): RootDataV1 {
    return {
      version: CURRENT_VERSION,
      patients: [],
      treatments: [],
      invoices: [],
      settings: {
        clinicName: 'Ghanem Dental Clinic',
        currency: 'EGP',
        taxRate: 0,
        rounding: 'nearest',
        theme: 'light',
      },
    };
  }

  private migrate(input: Partial<RootDataV1> | undefined): RootDataV1 {
    const base = this.defaultRoot();
    return {
      ...base,
      ...(input || {}),
      version: CURRENT_VERSION,
    } as RootDataV1;
  }

  private storageAvailable(type: 'localStorage' | 'sessionStorage'): boolean {
    try {
      const storage = (window as any)[type] as Storage;
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch {
      return false;
    }
  }
}
