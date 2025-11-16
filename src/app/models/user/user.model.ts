import { Address } from './address.model';

export interface User {
  id: string;
  name: string;
  email: string;
  dob: string;
  phone: string;
  gender?: 'male' | 'female' | 'other';
  profileImage?: string;
  isVerified: boolean;
  isActive: boolean;
  addresses?: Address[];
  createdAt?: string;
  updatedAt?: string;
}
