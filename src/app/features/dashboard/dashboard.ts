import { Component, OnInit } from '@angular/core';
import { Invoices } from '../../core/services/invoices';
import { Patients } from '../../core/services/patients';
import { Treatments } from '../../core/services/treatments';
import { Invoice } from '../../core/models/invoice.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  totalRevenue = 0;
  outstanding = 0;
  patientsCount = 0;
  mostCommonTreatment = '-';
  lastTotals: number[] = [];

  // Chart state
  chartWidth = 240;
  chartHeight = 60;
  chartPadding = 8;
  linePath = '';
  areaPath = '';
  pts: { x: number; y: number; value: number }[] = [];
  minVal = 0;
  maxVal = 0;
  gridY: number[] = [];
  hoverIndex: number | null = null;

  constructor(private inv: Invoices, private pats: Patients, private trts: Treatments) {}

  ngOnInit(): void {
    const invoices = this.inv.list();
    const patients = this.pats.list();
    const treatments = this.trts.list();
    this.patientsCount = patients.length;
    this.totalRevenue = invoices.filter(i => i.status==='paid').reduce((s,i)=>s+i.total,0);
    this.outstanding = invoices.filter(i => i.status!=='paid').reduce((s,i)=>s+i.total,0);
    const treatmentCount: Record<string, number> = {};
    invoices.forEach(i => i.items.forEach(it => {
      treatmentCount[it.treatmentId] = (treatmentCount[it.treatmentId]||0)+it.quantity;
    }));
    const topId = Object.entries(treatmentCount).sort((a,b)=>b[1]-a[1])[0]?.[0];
    this.mostCommonTreatment = treatments.find(t=>t.id===topId)?.name || '-';
    this.lastTotals = invoices.slice(0, 10).map(i => i.total).reverse();
    this.computeSpark();
  }

  private computeSpark(): void {
    const width = this.chartWidth;
    const height = this.chartHeight;
    const padding = this.chartPadding;
    const values = this.lastTotals.length ? this.lastTotals : [0];
    this.maxVal = Math.max(...values);
    this.minVal = Math.min(...values);
    const range = Math.max(1, this.maxVal - this.minVal);
    const step = (width - padding * 2) / (values.length - 1 || 1);
    this.pts = values.map((v, idx) => {
      const x = padding + idx * step;
      const y = height - padding - ((v - this.minVal) / range) * (height - padding * 2);
      return { x, y, value: v };
    });
    this.linePath = this.pts
      .map((p, i) => (i === 0 ? 'M' : 'L') + p.x.toFixed(2) + ',' + p.y.toFixed(2))
      .join(' ');
    if (this.pts.length) {
      const first = this.pts[0];
      const last = this.pts[this.pts.length - 1];
      const baseY = (height - padding).toFixed(2);
      const midPath = this.pts.map(p => p.x.toFixed(2) + ',' + p.y.toFixed(2)).join(' L ');
      this.areaPath = `M ${first.x.toFixed(2)},${baseY} L ${midPath} L ${last.x.toFixed(2)},${baseY} Z`;
    } else {
      this.areaPath = '';
    }
    // gridlines at 25%, 50%, 75%
    const usable = height - padding * 2;
    this.gridY = [0.25, 0.5, 0.75].map(f => height - padding - f * usable);
  }

  setHover(i: number | null) { this.hoverIndex = i; }
}
