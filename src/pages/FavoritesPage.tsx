import React, { useEffect } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { getPhoneById } from '../utils/phoneUtils';
import { Phone } from '../types/Phone';
import PhoneCard from '../components/common/PhoneCard';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  
  // Get full phone objects for favorites
  const phones: Phone[] = favorites
    .map(id => getPhoneById(id))
    .filter((phone): phone is Phone => phone !== null);
  
  useEffect(() => {
    document.title = 'Избранное - Смартфон Сити';
  }, []);
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Избранное</h1>
      
      {phones.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Heart className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-3">В избранном пока нет телефонов</h2>
          <p className="text-gray-600 mb-6">
            Добавляйте понравившиеся модели в избранное, чтобы не потерять их из виду
          </p>
          <Link to="/catalog" className="btn-primary">
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <p className="flex items-center">
              <span className="mr-2">В избранном: {phones.length} {getPhoneCountText(phones.length)}</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {phones.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        </>
      )}
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

export default FavoritesPage;