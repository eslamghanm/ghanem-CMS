import { Component } from '@angular/core';
import { Patients } from '../../../../core/services/patients';
import { Patient } from '../../../../core/models/patient.model';
import { Toast } from '../../../../core/services/toast';

@Component({
  selector: 'app-patient-list',
  standalone: false,
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css'
})
export class PatientList {
  query = '';
  page = 1;
  pageSize = 8;

  constructor(public patients: Patients, private toast: Toast) {}

  get filtered(): Patient[] {
    const q = this.query.toLowerCase().trim();
    const list = this.patients.list();
    const filtered = q ? list.filter(p =>
      p.name.toLowerCase().includes(q) || (p.phone||'').toLowerCase().includes(q)
    ) : list;
    const start = (this.page - 1) * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    const q = this.query.toLowerCase().trim();
    const list = this.patients.list();
    const filtered = q ? list.filter(p => p.name.toLowerCase().includes(q) || (p.phone||'').toLowerCase().includes(q)) : list;
    return Math.max(1, Math.ceil(filtered.length / this.pageSize));
  }

  remove(id: string) {
    this.patients.remove(id);
    this.toast.success('Patient removed');
  }
}
