import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PhoneCard from '../components/common/PhoneCard';
import Filters from '../components/Filters';
import { getAllPhones, filterPhones, searchPhones } from '../utils/phoneUtils';
import { Phone } from '../types/Phone';
import { ArrowDownAZ, ArrowUpAZ, Clock, TrendingUp, DollarSign } from 'lucide-react';

const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [phones, setPhones] = useState<Phone[]>([]);
  const [filteredPhones, setFilteredPhones] = useState<Phone[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, string | string[]>>({});
  const [sortOption, setSortOption] = useState<string>('popularity');
  
  // Parse search params
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    const brand = searchParams.getAll('brand');
    const os = searchParams.getAll('os');
    const memory = searchParams.getAll('memory');
    const screenSize = searchParams.getAll('screenSize');
    const battery = searchParams.getAll('battery');
    const priceRange = searchParams.get('priceRange');
    const sort = searchParams.get('sort');
    
    const filters: Record<string, string | string[]> = {};
    
    if (brand.length) filters.brand = brand;
    if (os.length) filters.os = os;
    if (memory.length) filters.memory = memory;
    if (screenSize.length) filters.screenSize = screenSize;
    if (battery.length) filters.battery = battery;
    if (priceRange) filters.priceRange = priceRange;
    
    setActiveFilters(filters);
    
    if (sort) {
      setSortOption(sort);
    }
    
    let allPhones = getAllPhones();
    
    if (searchQuery) {
      allPhones = searchPhones(searchQuery);
    }
    
    setPhones(allPhones);
    
    const filtered = filterPhones(allPhones, filters);
    setFilteredPhones(sortPhones(filtered, sort || sortOption));
    
    document.title = `Каталог телефонов - Смартфон Сити${searchQuery ? ` - Поиск: ${searchQuery}` : ''}`;
  }, [searchParams]);
  
  const handleApplyFilters = (filters: Record<string, string | string[]>) => {
    const newSearchParams = new URLSearchParams();
    
    // Add existing search query if present
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      newSearchParams.set('search', searchQuery);
    }
    
    // Add sort option
    newSearchParams.set('sort', sortOption);
    
    // Add filters
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => newSearchParams.append(key, v));
      } else if (value) {
        newSearchParams.set(key, value);
      }
    });
    
    setSearchParams(newSearchParams);
  };
  
  const handleSortChange = (sortValue: string) => {
    setSortOption(sortValue);
    
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', sortValue);
    setSearchParams(newSearchParams);
    
    setFilteredPhones(sortPhones(filteredPhones, sortValue));
  };
  
  const sortPhones = (phonesToSort: Phone[], sortBy: string): Phone[] => {
    const sorted = [...phonesToSort];
    
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'newest':
        return sorted.sort((a, b) => b.releaseYear - a.releaseYear);
      case 'popularity':
      default:
        return sorted.sort((a, b) => b.popularity - a.popularity);
    }
  };
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Каталог телефонов</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
          <Filters 
            onApplyFilters={handleApplyFilters}
            activeFilters={activeFilters}
          />
        </div>
        
        {/* Products */}
        <div className="flex-grow">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                Найдено {filteredPhones.length} {getPhoneCountText(filteredPhones.length)}
              </h2>
              {searchParams.get('search') && (
                <p className="text-gray-600 mt-1">
                  Результаты поиска по запросу: «{searchParams.get('search')}»
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 whitespace-nowrap">Сортировать:</span>
              <select
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
                className="input-field py-1 pl-3 pr-8 text-sm"
              >
                <option value="popularity">По популярности</option>
                <option value="price-asc">По цене (возр.)</option>
                <option value="price-desc">По цене (убыв.)</option>
                <option value="name-asc">По названию (А-Я)</option>
                <option value="name-desc">По названию (Я-А)</option>
                <option value="newest">По новизне</option>
              </select>
            </div>
          </div>
          
          {filteredPhones.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPhones.map((phone) => (
                <PhoneCard key={phone.id} phone={phone} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Телефоны не найдены</h3>
              <p className="text-gray-600 mb-6">
                По заданным параметрам не найдено ни одного телефона. Попробуйте изменить фильтры.
              </p>
              <button
                onClick={() => handleApplyFilters({})}
                className="btn-primary"
              >
                Сбросить все фильтры
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to format phone count text
function getPhoneCountText(count: number): string {
  if (count === 0) return 'телефонов';
  
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return 'телефонов';
  }
  
  if (lastDigit === 1) {
    return 'телефон';
  }
  
  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'телефона';
  }
  
  return 'телефонов';
}

export default CatalogPage;