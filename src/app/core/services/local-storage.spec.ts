import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('persists and reads root data', () => {
    const root = service.getRoot();
    expect(root.version).toBeGreaterThan(0);
    service.write('patients', []);
    const patients = service.read('patients');
    expect(Array.isArray(patients)).toBeTrue();
  });
});
