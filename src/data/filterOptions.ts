import { Brand, MemoryOption, ScreenSize, Battery, PriceRange } from '../types/Filters';

export const BRANDS = [
  'Apple',
  'Samsung',
  'Xiaomi',
  'Google',
  'Huawei',
  'OnePlus',
  'Realme',
  'POCO',
  'Nothing',
  'Vivo'
];

export const MEMORY_OPTIONS: MemoryOption[] = [
  { ram: 4, storage: 64 },
  { ram: 4, storage: 128 },
  { ram: 6, storage: 128 },
  { ram: 8, storage: 128 },
  { ram: 8, storage: 256 },
  { ram: 12, storage: 256 },
  { ram: 12, storage: 512 },
  { ram: 16, storage: 512 },
  { ram: 16, storage: 1024 }
];

export const SCREEN_SIZES: { label: string; value: string }[] = [
  { label: 'до 5.5"', value: 'small' },
  { label: '5.5" - 6.3"', value: 'medium' },
  { label: '6.3" - 6.7"', value: 'large' },
  { label: 'более 6.7"', value: 'xlarge' }
];

export const BATTERIES: { label: string; value: string }[] = [
  { label: 'до 3000 мАч', value: 'small' },
  { label: '3000 - 4000 мАч', value: 'medium' },
  { label: '4000 - 5000 мАч', value: 'large' },
  { label: 'более 5000 мАч', value: 'xlarge' }
];

export const PRICE_RANGES: { label: string; value: string }[] = [
  { label: 'до 15 000 сом', value: 'under15k' },
  { label: '15 000 - 30 000 сом', value: '15k-30k' },
  { label: '30 000 - 50 000 сом', value: '30k-50k' },
  { label: '50 000 - 80 000 сом', value: '50k-80k' },
  { label: 'более 80 000 сом', value: 'over80k' }
];