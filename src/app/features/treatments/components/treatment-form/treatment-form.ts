import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Treatments } from '../../../../core/services/treatments';
import { Toast } from '../../../../core/services/toast';

@Component({
  selector: 'app-treatment-form',
  standalone: false,
  templateUrl: './treatment-form.html',
  styleUrl: './treatment-form.css'
})
export class TreatmentForm {
  form = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    code: [''],
    duration: [30],
    basePrice: [0, [Validators.required, Validators.min(0)]],
    category: [''],
    description: ['']
  });

  constructor(private fb: FormBuilder, private treatments: Treatments, private toast: Toast) {}

  submit() {
    if (this.form.invalid) return;
    const v = this.form.value as any;
    this.treatments.upsert({
      id: v.id || undefined,
      name: v.name!,
      code: v.code || undefined,
      duration: v.duration || undefined,
      basePrice: Number(v.basePrice) || 0,
      category: v.category || undefined,
      description: v.description || undefined,
    });
    this.toast.success('Treatment saved');
    this.form.reset({ duration: 30, basePrice: 0 });
  }
}
