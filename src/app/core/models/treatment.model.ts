export interface Treatment {
  id: string;
  name: string;
  code?: string;
  duration?: number; // minutes
  basePrice: number;
  category?: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
