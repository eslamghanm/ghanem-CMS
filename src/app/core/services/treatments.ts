import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Treatment } from '../models/treatment.model';
import { LocalStorageService } from './local-storage';
import { nowIso, uid } from '../utils/uid';

@Injectable({
  providedIn: 'root'
})
export class Treatments {
  private readonly treatments$ = new BehaviorSubject<Treatment[]>([]);

  constructor(private storage: LocalStorageService) {
    this.treatments$.next(this.storage.read('treatments'));
  }

  stream() { return this.treatments$.asObservable(); }
  list(): Treatment[] { return this.treatments$.getValue(); }
  get(id: string) { return this.list().find(t => t.id === id); }

  upsert(input: Omit<Treatment, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Treatment {
    const current = this.list();
    const now = nowIso();
    let saved: Treatment | undefined;
    let next: Treatment[];
    if (input.id) {
      next = current.map(t => t.id === input.id ? (saved = { ...t, ...input, updatedAt: now } as Treatment) : t);
    } else {
      saved = { ...(input as any), id: uid('trt'), createdAt: now, updatedAt: now } as Treatment;
      next = [saved, ...current];
    }
    this.commit(next);
    return saved!;
  }

  bulkImport(items: Omit<Treatment, 'id' | 'createdAt' | 'updatedAt'>[]): void {
    const now = nowIso();
    const prepared = items.map(i => ({ ...i, id: uid('trt'), createdAt: now, updatedAt: now } as Treatment));
    const next = [...prepared, ...this.list()];
    this.commit(next);
  }

  remove(id: string): void { this.commit(this.list().filter(t => t.id !== id)); }

  private commit(next: Treatment[]) {
    this.treatments$.next(next);
    this.storage.write('treatments', next);
  }
}
