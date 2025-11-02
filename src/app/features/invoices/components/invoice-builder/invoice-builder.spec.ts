import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceBuilder } from './invoice-builder';

describe('InvoiceBuilder', () => {
  let component: InvoiceBuilder;
  let fixture: ComponentFixture<InvoiceBuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceBuilder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
