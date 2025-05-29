import { Phone } from '../types/Phone';
import { PHONES } from '../data/phones';

export const getAllPhones = (): Phone[] => {
  return PHONES;
};

export const getPhoneById = (id: string): Phone | null => {
  return PHONES.find(phone => phone.id === id) || null;
};

export const getPopularPhones = (limit: number = 8): Phone[] => {
  return [...PHONES]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

export const getNewPhones = (limit: number = 8): Phone[] => {
  return [...PHONES]
    .sort((a, b) => b.releaseYear - a.releaseYear)
    .slice(0, limit);
};

export const getSimilarPhones = (phone: Phone, limit: number = 4): Phone[] => {
  // Find phones with same brand or similar price range
  return PHONES
    .filter(p => p.id !== phone.id && (
      p.brand === phone.brand || 
      Math.abs(p.price - phone.price) < 15000 ||
      p.os === phone.os
    ))
    .sort((a, b) => {
      // Sort by brand match first, then price similarity
      if (a.brand === phone.brand && b.brand !== phone.brand) return -1;
      if (a.brand !== phone.brand && b.brand === phone.brand) return 1;
      
      const aPriceDiff = Math.abs(a.price - phone.price);
      const bPriceDiff = Math.abs(b.price - phone.price);
      return aPriceDiff - bPriceDiff;
    })
    .slice(0, limit);
};

export const searchPhones = (query: string): Phone[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return [];
  
  return PHONES.filter(phone => {
    const matchesName = phone.name.toLowerCase().includes(normalizedQuery);
    const matchesBrand = phone.brand.toLowerCase().includes(normalizedQuery);
    const matchesOS = phone.os.toLowerCase().includes(normalizedQuery);
    const matchesProcessor = phone.processor.name.toLowerCase().includes(normalizedQuery);
    const matchesDescription = phone.description.toLowerCase().includes(normalizedQuery);
    
    return matchesName || matchesBrand || matchesOS || matchesProcessor || matchesDescription;
  });
};

export const filterPhones = (
  phones: Phone[], 
  filters: Record<string, string | string[]>
): Phone[] => {
  return phones.filter(phone => {
    // Brand filter
    if (
      filters.brand && 
      Array.isArray(filters.brand) && 
      filters.brand.length > 0 &&
      !filters.brand.includes(phone.brand)
    ) {
      return false;
    }
    
    // OS filter
    if (
      filters.os && 
      Array.isArray(filters.os) && 
      filters.os.length > 0 &&
      !filters.os.includes(phone.os)
    ) {
      return false;
    }
    
    // Memory filter
    if (
      filters.memory && 
      Array.isArray(filters.memory) && 
      filters.memory.length > 0
    ) {
      const memoryMatch = filters.memory.some(memOption => {
        const [ram, storage] = memOption.split('-').map(Number);
        return phone.memory.ram === ram && phone.memory.storage === storage;
      });
      
      if (!memoryMatch) {
        return false;
      }
    }
    
    // Screen size filter
    if (
      filters.screenSize && 
      Array.isArray(filters.screenSize) && 
      filters.screenSize.length > 0
    ) {
      const screenMatch = filters.screenSize.some(sizeOption => {
        const size = phone.screen.size;
        
        switch (sizeOption) {
          case 'small':
            return size <= 5.5;
          case 'medium':
            return size > 5.5 && size <= 6.3;
          case 'large':
            return size > 6.3 && size <= 6.7;
          case 'xlarge':
            return size > 6.7;
          default:
            return false;
        }
      });
      
      if (!screenMatch) {
        return false;
      }
    }
    
    // Battery filter
    if (
      filters.battery && 
      Array.isArray(filters.battery) && 
      filters.battery.length > 0
    ) {
      const batteryMatch = filters.battery.some(batteryOption => {
        const capacity = phone.battery.capacity;
        
        switch (batteryOption) {
          case 'small':
            return capacity < 3000;
          case 'medium':
            return capacity >= 3000 && capacity < 4000;
          case 'large':
            return capacity >= 4000 && capacity < 5000;
          case 'xlarge':
            return capacity >= 5000;
          default:
            return false;
        }
      });
      
      if (!batteryMatch) {
        return false;
      }
    }
    
    // Price range filter
    if (filters.priceRange && typeof filters.priceRange === 'string') {
      const price = phone.price;
      
      switch (filters.priceRange) {
        case 'under15k':
          if (price >= 15000) return false;
          break;
        case '15k-30k':
          if (price < 15000 || price >= 30000) return false;
          break;
        case '30k-50k':
          if (price < 30000 || price >= 50000) return false;
          break;
        case '50k-80k':
          if (price < 50000 || price >= 80000) return false;
          break;
        case 'over80k':
          if (price < 80000) return false;
          break;
      }
    }
    
    return true;
  });
};