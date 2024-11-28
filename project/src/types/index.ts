export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: {
    city: string;
    state: string;
  };
  role: 'client' | 'professional';
  preferredLanguage: 'pt-BR' | 'en' | 'es';
}

export interface Professional extends User {
  services: Service[];
  description: string;
  specialties: string[];
  pricing: {
    currency: string;
    baseRate: number;
    hourlyRate?: number;
  };
  availability: Availability[];
  photos: string[];
  rating: number;
  reviews: Review[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

export interface Availability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
}