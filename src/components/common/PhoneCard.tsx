import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Phone } from '../../types/Phone';
import { useFavorites } from '../../contexts/FavoritesContext';

interface PhoneCardProps {
  phone: Phone;
}

const PhoneCard: React.FC<PhoneCardProps> = ({ phone }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some(id => id === phone.id);
  
  return (
    <div className="card group h-full flex flex-col">
      <div className="relative overflow-hidden">
        <Link to={`/phone/${phone.id}`}>
          <img 
            src={phone.images[0]} 
            alt={phone.name}
            className="w-full h-48 object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <button
          onClick={() => toggleFavorite(phone.id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
          aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
          />
        </button>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/phone/${phone.id}`} className="block mb-2">
          <h3 className="font-medium text-lg hover:text-blue-600 transition-colors">{phone.name}</h3>
        </Link>
        
        <div className="text-sm text-gray-600 mb-4 flex-grow">
          <div className="flex justify-between mb-1">
            <span>Экран:</span>
            <span className="font-medium">{phone.screen.size}", {phone.screen.resolution}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Память:</span>
            <span className="font-medium">{phone.memory.ram} ГБ / {phone.memory.storage} ГБ</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Процессор:</span>
            <span className="font-medium">{phone.processor.name}</span>
          </div>
          <div className="flex justify-between">
            <span>Камера:</span>
            <span className="font-medium">{phone.cameras.main} Мп</span>
          </div>
        </div>
        
        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="text-xl font-bold text-blue-600">{phone.price.toLocaleString()} сом</div>
            {phone.oldPrice && (
              <div className="text-sm text-gray-500 line-through">{phone.oldPrice.toLocaleString()} сом</div>
            )}
          </div>
          <Link to={`/phone/${phone.id}`} className="btn-primary text-sm py-1.5">
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;