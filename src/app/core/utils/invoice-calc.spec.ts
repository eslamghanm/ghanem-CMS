import { calculateBreakdown } from './invoice-calc';

describe('invoice calc', () => {
  it('calculates subtotal, discount, tax and total', () => {
    const items = [
      { treatmentId: 't1', name: 'A', unitPrice: 100, quantity: 2, subtotal: 200 },
      { treatmentId: 't2', name: 'B', unitPrice: 50, quantity: 1, subtotal: 50 },
    ];
    const r = calculateBreakdown(items as any, 0.1, 'percent', 10, 'nearest');
    expect(r.subtotal).toBe(250);
    expect(r.discountAmount).toBe(25);
    expect(r.tax).toBeCloseTo(22.5, 1);
    expect(r.total).toBeCloseTo(247.5, 1);
  });
});

