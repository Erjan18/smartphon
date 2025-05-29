import React, { useEffect } from 'react';
import { useCompare } from '../contexts/CompareContext';
import PhoneCompareTable from '../components/PhoneCompareTable';
import { getPhoneById } from '../utils/phoneUtils';
import { Phone } from '../types/Phone';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ComparePage: React.FC = () => {
  const { compareItems } = useCompare();
  
  // Get full phone objects for comparison
  const phones: Phone[] = compareItems
    .map(id => getPhoneById(id))
    .filter((phone): phone is Phone => phone !== null);
  
  useEffect(() => {
    document.title = 'Сравнение телефонов - Смартфон Сити';
  }, []);
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">Сравнение телефонов</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {phones.length === 0 ? (
          <div className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-3">В сравнении пока нет телефонов</h2>
            <p className="text-gray-600 mb-6">
              Добавьте телефоны для сравнения из каталога, чтобы увидеть их характеристики в удобной таблице
            </p>
            <Link to="/catalog" className="btn-primary">
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <>
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Сравниваем {phones.length} {getPhoneCountText(phones.length)}</h2>
                <Link to="/catalog" className="text-blue-600 hover:underline flex items-center">
                  Добавить еще <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="overflow-auto">
              <PhoneCompareTable phones={phones} />
            </div>
          </>
        )}
      </div>
      
      {/* Call to Action */}
      {phones.length > 0 && (
        <div className="mt-12 p-8 bg-blue-50 rounded-lg border border-blue-100 text-center">
          <h2 className="text-2xl font-bold mb-3">Определились с выбором?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Теперь вы можете выбрать наиболее подходящую модель из сравнения и узнать о ней подробнее
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {phones.map(phone => (
              <Link 
                key={phone.id}
                to={`/phone/${phone.id}`}
                className="btn-primary"
              >
                Выбрать {phone.name}
              </Link>
            ))}
          </div>
        </div>
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

export default ComparePage;