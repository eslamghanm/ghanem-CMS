import { TestBed } from '@angular/core/testing';

import { Treatments } from './treatments';

describe('Treatments', () => {
  let service: Treatments;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Treatments);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
