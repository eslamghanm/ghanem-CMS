import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Patient } from '../models/patient.model';
import { LocalStorageService } from './local-storage';
import { nowIso, uid } from '../utils/uid';

@Injectable({
  providedIn: 'root'
})
export class Patients {
  private readonly patients$ = new BehaviorSubject<Patient[]>([]);

  constructor(private storage: LocalStorageService) {
    this.patients$.next(this.storage.read('patients'));
  }

  stream() {
    return this.patients$.asObservable();
  }

  list(): Patient[] {
    return this.patients$.getValue();
  }

  get(id: string): Patient | undefined {
    return this.list().find(p => p.id === id);
  }

  upsert(input: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Patient {
    const current = this.list();
    const now = nowIso();
    let next: Patient[];
    let saved: Patient | undefined;
    if (input.id) {
      next = current.map(p => p.id === input.id ? (saved = { ...p, ...input, updatedAt: now } as Patient) : p);
    } else {
      saved = {
        ...(input as any),
        id: uid('pat'),
        createdAt: now,
        updatedAt: now,
      } as Patient;
      next = [saved, ...current];
    }
    this.commit(next);
    return saved!;
  }

  remove(id: string): void {
    const next = this.list().filter(p => p.id !== id);
    this.commit(next);
  }

  private commit(next: Patient[]) {
    this.patients$.next(next);
    this.storage.write('patients', next);
  }
}
