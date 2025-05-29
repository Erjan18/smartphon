import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Brand, MemoryOption, PriceRange } from '../types/Filters';
import { BRANDS, MEMORY_OPTIONS, SCREEN_SIZES, BATTERIES, PRICE_RANGES } from '../data/filterOptions';

interface FiltersProps {
  onApplyFilters: (filters: Record<string, string | string[]>) => void;
  activeFilters: Record<string, string | string[]>;
}

const Filters: React.FC<FiltersProps> = ({ onApplyFilters, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState<Record<string, string | string[]>>(activeFilters);
  
  const handleFilterChange = (
    category: string, 
    value: string | string[], 
    isMultiple: boolean = false
  ) => {
    setFilters(prev => {
      if (isMultiple) {
        const currentValues = Array.isArray(prev[category]) ? prev[category] as string[] : [];
        
        if (Array.isArray(value)) {
          return { ...prev, [category]: value };
        }
        
        if (currentValues.includes(value)) {
          return { 
            ...prev, 
            [category]: currentValues.filter(v => v !== value) 
          };
        } else {
          return { 
            ...prev, 
            [category]: [...currentValues, value] 
          };
        }
      } else {
        return { ...prev, [category]: value };
      }
    });
  };
  
  const applyFilters = () => {
    onApplyFilters(filters);
    if (isSmallScreen) {
      setIsExpanded(false);
    }
  };
  
  const resetFilters = () => {
    setFilters({});
    onApplyFilters({});
  };
  
  const isFilterActive = (category: string, value: string): boolean => {
    const filterValue = filters[category];
    
    if (Array.isArray(filterValue)) {
      return filterValue.includes(value);
    }
    
    return filterValue === value;
  };
  
  // For mobile view
  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <Filter className="w-5 h-5 mr-2 text-blue-600" />
          <h2 className="text-lg font-medium">Фильтры</h2>
        </div>
        
        {/* Mobile toggle */}
        {isSmallScreen && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-500 hover:text-gray-700"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        )}
      </div>
      
      {/* Filters */}
      <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
        <div className="p-4 space-y-6">
          {/* Brands */}
          <div>
            <h3 className="font-medium mb-3">Производитель</h3>
            <div className="space-y-2">
              {BRANDS.map(brand => (
                <label key={brand} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isFilterActive('brand', brand)}
                    onChange={() => handleFilterChange('brand', brand, true)}
                    className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* OS */}
          <div>
            <h3 className="font-medium mb-3">Операционная система</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isFilterActive('os', 'iOS')}
                  onChange={() => handleFilterChange('os', 'iOS', true)}
                  className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                />
                <span>iOS</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isFilterActive('os', 'Android')}
                  onChange={() => handleFilterChange('os', 'Android', true)}
                  className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Android</span>
              </label>
            </div>
          </div>
          
          {/* Memory */}
          <div>
            <h3 className="font-medium mb-3">Память (RAM / ROM)</h3>
            <div className="space-y-2">
              {MEMORY_OPTIONS.map(option => (
                <label key={`${option.ram}-${option.storage}`} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isFilterActive('memory', `${option.ram}-${option.storage}`)}
                    onChange={() => handleFilterChange('memory', `${option.ram}-${option.storage}`, true)}
                    className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{option.ram} ГБ / {option.storage} ГБ</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Screen Size */}
          <div>
            <h3 className="font-medium mb-3">Диагональ экрана</h3>
            <div className="space-y-2">
              {SCREEN_SIZES.map(size => (
                <label key={size.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isFilterActive('screenSize', size.value)}
                    onChange={() => handleFilterChange('screenSize', size.value, true)}
                    className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{size.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Battery */}
          <div>
            <h3 className="font-medium mb-3">Ёмкость аккумулятора</h3>
            <div className="space-y-2">
              {BATTERIES.map(battery => (
                <label key={battery.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isFilterActive('battery', battery.value)}
                    onChange={() => handleFilterChange('battery', battery.value, true)}
                    className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{battery.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3">Цена</h3>
            <div className="space-y-2">
              {PRICE_RANGES.map(range => (
                <label key={range.value} className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={isFilterActive('priceRange', range.value)}
                    onChange={() => handleFilterChange('priceRange', range.value)}
                    className="mr-2 rounded-full text-blue-600 focus:ring-blue-500"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <button 
              onClick={applyFilters}
              className="btn-primary flex-1"
            >
              Применить
            </button>
            <button 
              onClick={resetFilters}
              className="btn-secondary flex-1"
            >
              Сбросить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;