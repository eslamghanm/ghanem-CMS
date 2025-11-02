import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Treatments } from './treatments';

describe('Treatments', () => {
  let component: Treatments;
  let fixture: ComponentFixture<Treatments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Treatments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Treatments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
