import { Component } from '@angular/core';
import { Treatments } from '../../../../core/services/treatments';
import { Treatment } from '../../../../core/models/treatment.model';
import { Toast } from '../../../../core/services/toast';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-treatment-list',
  standalone: false,
  templateUrl: './treatment-list.html',
  styleUrl: './treatment-list.css'
})
export class TreatmentList {
  query = '';
  page = 1;
  pageSize = 8;

  constructor(public treatments: Treatments, private toast: Toast, private http: HttpClient) {}

  get filtered(): Treatment[] {
    const q = this.query.toLowerCase().trim();
    const list = this.treatments.list();
    const filtered = q ? list.filter(t => t.name.toLowerCase().includes(q) || (t.code||'').toLowerCase().includes(q)) : list;
    const start = (this.page - 1) * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }
  totalPages(): number {
    const q = this.query.toLowerCase().trim();
    const list = this.treatments.list();
    const filtered = q ? list.filter(t => t.name.toLowerCase().includes(q) || (t.code||'').toLowerCase().includes(q)) : list;
    return Math.max(1, Math.ceil(filtered.length / this.pageSize));
  }

  remove(id: string) { this.treatments.remove(id); this.toast.success('Treatment removed'); }

  async importFromSeed() {
    try {
      const data: any = await this.http.get('assets/seed/seed.json').toPromise();
      if (data?.treatments?.length) {
        this.treatments.bulkImport(data.treatments);
        this.toast.success('Imported sample treatments');
      }
    } catch {
      this.toast.error('Failed to load seed');
    }
  }
}
