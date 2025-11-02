export interface Patient {
  id: string;
  name: string;
  phone?: string;
  dob?: string; // ISO date string
  notes?: string;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}
