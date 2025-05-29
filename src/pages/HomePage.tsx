import React, { useEffect } from 'react';
import HomeBanner from '../components/HomeBanner';
import FeaturedPhones from '../components/FeaturedPhones';
import { Phone } from '../types/Phone';
import { getAllPhones, getPopularPhones, getNewPhones } from '../utils/phoneUtils';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, BarChart3, Repeat } from 'lucide-react';

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'Смартфон Сити - Каталог мобильных телефонов';
  }, []);

  const popularPhones = getPopularPhones(4);
  const newPhones = getNewPhones(4);
  
  return (
    <div>
      <HomeBanner />
      
      {/* Feature Boxes */}
      <div className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Огромный выбор</h3>
              <p className="text-gray-600 mb-4">Более 100 моделей телефонов от ведущих производителей в нашем каталоге</p>
              <Link to="/catalog" className="text-blue-600 hover:underline flex items-center">
                В каталог <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Подробные характеристики</h3>
              <p className="text-gray-600 mb-4">Детальное описание всех параметров каждой модели для осознанного выбора</p>
              <Link to="/catalog" className="text-blue-600 hover:underline flex items-center">
                Смотреть характеристики <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Repeat className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Умное сравнение</h3>
              <p className="text-gray-600 mb-4">Сравнивайте до 4 моделей одновременно и выбирайте лучший вариант</p>
              <Link to="/compare" className="text-blue-600 hover:underline flex items-center">
                Сравнить телефоны <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popular Phones */}
      <FeaturedPhones 
        title="Популярные модели" 
        phones={popularPhones} 
        viewAllLink="/catalog?sort=popularity"
      />
      
      {/* New Arrivals */}
      <FeaturedPhones 
        title="Новинки" 
        phones={newPhones}
        viewAllLink="/catalog?sort=newest" 
      />
      
      {/* Call to Action */}
      <div className="py-12 bg-blue-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Не можете определиться с выбором?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Воспользуйтесь нашим сервисом сравнения телефонов, чтобы найти идеальную модель для ваших потребностей
          </p>
          <Link to="/compare" className="btn bg-white text-blue-600 hover:bg-gray-100 text-lg py-3 px-8">
            Сравнить телефоны
          </Link>
        </div>
      </div>
      
      {/* Brands */}
      <div className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8 text-center">Популярные бренды</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {['Apple', 'Samsung', 'Xiaomi', 'Google', 'Huawei', 'OnePlus'].map(brand => (
              <Link 
                key={brand} 
                to={`/catalog?brand=${brand}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-center"
              >
                <span className="font-medium text-lg">{brand}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;