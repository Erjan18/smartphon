import React, { useState } from 'react';
import { Phone, PhoneCall as PhoneGallery, InspectionPanelIcon as PhoneSpecifications } from 'lucide-react';
import { Phone as PhoneType } from '../types/Phone';
import { useCompare } from '../contexts/CompareContext';
import { useFavorites } from '../contexts/FavoritesContext';

interface PhoneDetailContentProps {
  phone: PhoneType;
}

const PhoneDetailContent: React.FC<PhoneDetailContentProps> = ({ phone }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'description'>('specs');
  
  const { addToCompare, isInCompare } = useCompare();
  const { toggleFavorite, favorites } = useFavorites();
  
  const isFavorite = favorites.includes(phone.id);
  const isComparing = isInCompare(phone.id);

  return (
    <div className="container-custom py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Gallery */}
          <div>
            <div className="mb-4 h-80 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
              <img 
                src={phone.images[activeImage]} 
                alt={phone.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {phone.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 w-16 h-16 border rounded-md overflow-hidden ${
                    activeImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${phone.name} - фото ${index + 1}`} 
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Info */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{phone.name}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <span className="mr-2">Бренд: {phone.brand}</span>
              <span className="mx-2">|</span>
              <span>ОС: {phone.os}</span>
            </div>
            
            <div className="flex items-baseline mb-6">
              <div className="text-3xl font-bold text-blue-600">{phone.price.toLocaleString()} сом</div>
              {phone.oldPrice && (
                <div className="ml-2 text-base text-gray-500 line-through">{phone.oldPrice.toLocaleString()} сом</div>
              )}
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Экран</div>
                    <div className="font-medium">{phone.screen.size}", {phone.screen.type}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                      <path d="M6 12h4" />
                      <path d="M14 12h4" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Память</div>
                    <div className="font-medium">{phone.memory.ram} ГБ / {phone.memory.storage} ГБ</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 8V4h4" />
                      <path d="M20 8V4h-4" />
                      <path d="M4 16v4h4" />
                      <path d="M20 16v4h-4" />
                      <rect x="9" y="8" width="6" height="8" rx="1" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Процессор</div>
                    <div className="font-medium">{phone.processor.name}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Камера</div>
                    <div className="font-medium">{phone.cameras.main} Мп</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => toggleFavorite(phone.id)}
                className={`btn flex-1 min-w-[150px] ${
                  isFavorite 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isFavorite ? 'В избранном' : 'В избранное'}
              </button>
              <button 
                onClick={() => addToCompare(phone.id)}
                disabled={isComparing}
                className={`btn flex-1 min-w-[150px] ${
                  isComparing
                    ? 'bg-green-100 text-green-600 cursor-not-allowed'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                {isComparing ? 'В сравнении' : 'Добавить к сравнению'}
              </button>
              
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-t border-gray-200">
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'specs' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <PhoneSpecifications className="w-4 h-4 inline-block mr-2" />
              Характеристики
            </button>
            <button 
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'description' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <PhoneGallery className="w-4 h-4 inline-block mr-2" />
              Описание
            </button>
          </div>
          
          <div className="p-6">
            {activeTab === 'specs' ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Основные характеристики</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Бренд</span>
                      <span className="font-medium">{phone.brand}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Модель</span>
                      <span className="font-medium">{phone.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Операционная система</span>
                      <span className="font-medium">{phone.os}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Год выпуска</span>
                      <span className="font-medium">{phone.releaseYear}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Дисплей</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Диагональ</span>
                      <span className="font-medium">{phone.screen.size}"</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Тип дисплея</span>
                      <span className="font-medium">{phone.screen.type}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Разрешение</span>
                      <span className="font-medium">{phone.screen.resolution}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Частота обновления</span>
                      <span className="font-medium">{phone.screen.refreshRate} Гц</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Память и процессор</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Оперативная память</span>
                      <span className="font-medium">{phone.memory.ram} ГБ</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Встроенная память</span>
                      <span className="font-medium">{phone.memory.storage} ГБ</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Процессор</span>
                      <span className="font-medium">{phone.processor.name}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Количество ядер</span>
                      <span className="font-medium">{phone.processor.cores}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Камеры</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Основная камера</span>
                      <span className="font-medium">{phone.cameras.main} Мп</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Фронтальная камера</span>
                      <span className="font-medium">{phone.cameras.front} Мп</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Функции камеры</span>
                      <span className="font-medium">{phone.cameras.features.join(', ')}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Аккумулятор и зарядка</h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600">Емкость аккумулятора</span>
                      <span className="font-medium">{phone.battery.capacity} мАч</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Быстрая зарядка</span>
                      <span className="font-medium">{phone.battery.fastCharging}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="prose max-w-none">
                <p className="mb-4">{phone.description}</p>
                {phone.features.map((feature, index) => (
                  <div key={index} className="mb-4">
                    <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDetailContent;