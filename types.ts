export enum ServiceType {
  WEDDING = 'Düğün & Hikaye',
  REAL_ESTATE = 'Emlak & Arsa',
  COMMERCIAL = 'Reklam & Tanıtım',
  EVENT = 'Etkinlik & Konser',
  INSPECTION = 'Endüstriyel Denetim',
  TOURISM = 'Turizm & Otel'
}

export interface GalleryItem {
  id: number;
  imageUrl: string;
  title: string;
  category: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface AIPlanningResponse {
  suggestion: string;
  technicalTips: string;
  bestTime: string;
}
