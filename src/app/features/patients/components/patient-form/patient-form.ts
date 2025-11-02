import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Patients } from '../../../../core/services/patients';
import { Toast } from '../../../../core/services/toast';

@Component({
  selector: 'app-patient-form',
  standalone: false,
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.css'
})
export class PatientForm {
  form = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: [''],
    dob: [''],
    notes: ['']
  });

  constructor(private fb: FormBuilder, private patients: Patients, private toast: Toast) {}

  submit() {
    if (this.form.invalid) return;
    const v = this.form.value as any;
    this.patients.upsert({ id: v.id || undefined, name: v.name!, phone: v.phone||undefined, dob: v.dob||undefined, notes: v.notes||undefined });
    this.toast.success('Patient saved');
    this.form.reset();
  }
}
