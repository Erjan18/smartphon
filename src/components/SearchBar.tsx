import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchPhones } from '../utils/phoneUtils';
import { Phone } from '../types/Phone';

interface SearchBarProps {
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Phone[]>([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
    
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node) && 
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsResultsVisible(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = searchPhones(query);
      setResults(searchResults);
      setIsResultsVisible(true);
    } else {
      setResults([]);
      setIsResultsVisible(false);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(query.trim())}`);
      setQuery('');
      setIsResultsVisible(false);
      onClose && onClose();
    }
  };

  const handleResultClick = (id: string) => {
    navigate(`/phone/${id}`);
    setQuery('');
    setIsResultsVisible(false);
    onClose && onClose();
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex items-center">
        <div className="relative flex-grow">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setIsResultsVisible(true)}
            placeholder="Поиск телефонов..."
            className="input-field pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <button
          type="submit"
          className="ml-2 btn-primary py-2"
        >
          Найти
        </button>
      </form>

      {isResultsVisible && results.length > 0 && (
        <div 
          ref={resultsRef}
          className="absolute z-50 top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg overflow-hidden animate-fadeIn"
        >
          <ul className="max-h-96 overflow-y-auto">
            {results.map((phone) => (
              <li 
                key={phone.id}
                onClick={() => handleResultClick(phone.id)}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center">
                  <img 
                    src={phone.images[0]} 
                    alt={phone.name} 
                    className="w-10 h-10 object-contain mr-3"
                  />
                  <div>
                    <div className="font-medium">{phone.name}</div>
                    <div className="text-sm text-gray-600">{phone.price.toLocaleString()} сом</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;