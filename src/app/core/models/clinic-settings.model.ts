export interface ClinicSettings {
  clinicName: string;
  currency: string; // e.g., 'EGP'
  taxRate: number; // e.g., 0.14
  rounding: 'nearest' | 'up' | 'down';
  theme: 'light' | 'dark';
}
