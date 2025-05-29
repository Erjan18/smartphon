export interface Brand {
  name: string;
  value: string;
}

export interface MemoryOption {
  ram: number;
  storage: number;
}

export interface ScreenSize {
  label: string;
  value: string;
  min: number;
  max?: number;
}

export interface Battery {
  label: string;
  value: string;
  min: number;
  max?: number;
}

export interface PriceRange {
  label: string;
  value: string;
  min: number;
  max?: number;
}