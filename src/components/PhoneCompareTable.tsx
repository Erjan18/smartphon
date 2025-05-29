import React from 'react';
import { X } from 'lucide-react';
import { Phone } from '../types/Phone';
import { useCompare } from '../contexts/CompareContext';
import { Link } from 'react-router-dom';

interface PhoneCompareTableProps {
  phones: Phone[];
}

const PhoneCompareTable: React.FC<PhoneCompareTableProps> = ({ phones }) => {
  const { removeFromCompare } = useCompare();

  if (!phones.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Нет телефонов для сравнения</h2>
        <p className="text-gray-600 mb-6">Добавьте телефоны для сравнения из каталога</p>
        <Link to="/catalog" className="btn-primary">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  // Highlight differences
  const isDifferent = (property: string, index: number) => {
    if (phones.length <= 1) return false;
    
    const values = phones.map(phone => {
      if (property.includes('.')) {
        const [key1, key2] = property.split('.');
        return (phone as any)[key1][key2];
      }
      return (phone as any)[property];
    });
    
    return !values.every(val => val === values[0]);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-4 text-left bg-gray-50 border-b border-gray-200 w-40"></th>
            {phones.map((phone) => (
              <th key={phone.id} className="p-4 text-left bg-gray-50 border-b border-gray-200 min-w-[250px]">
                <div className="relative">
                  <button
                    onClick={() => removeFromCompare(phone.id)}
                    className="absolute top-0 right-0 p-1 text-gray-500 hover:text-red-500"
                    aria-label="Удалить из сравнения"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex flex-col items-center mb-4">
                    <img 
                      src={phone.images[0]} 
                      alt={phone.name} 
                      className="w-28 h-28 object-contain mb-2"
                    />
                    <Link 
                      to={`/phone/${phone.id}`} 
                      className="text-lg font-medium text-center hover:text-blue-600 transition-colors"
                    >
                      {phone.name}
                    </Link>
                    <div className="text-xl font-bold text-blue-600 mt-2">
                      {phone.price.toLocaleString()} сом
                    </div>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Основные */}
          <tr className="bg-gray-100">
            <td colSpan={phones.length + 1} className="p-3 font-semibold">
              Основные характеристики
            </td>
          </tr>
          <tr>
            <td className="p-4 border-b border-gray-200 bg-gray-50">Бренд</td>
            {phones.map((phone, idx) => (
              <td 
                key={phone.id} 
                className={`p-4 border-b border-gray-200 ${isDifferent('brand', idx) ? 'bg-blue-50' : ''}`}
              >
                {phone.brand}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b border-gray-200 bg-gray-50">Операционная система</td>
            {phones.map((phone, idx) => (
              <td 
                key={phone.id} 
                className={`p-4 border-b border-gray-200 ${isDifferent('os', idx) ? 'bg-blue-50' : ''}`}
              >
                {phone.os}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b border-gray-200 bg-gray-50">Год выпуска</td>
            {phones.map((phone, idx) => (
              <td 
                key={phone.id} 
                className={`p-4 border-b border-gray-200 ${isDifferent('releaseYear', idx) ? 'bg-blue-50' : ''}`}
              >
                {phone.releaseYear}
              </td>
            ))}
          </tr>
          
          {/* Дисплей */}
          <tr className="bg-gray-100">
            <td colSpan={phones.length + 1} className="p-3 font-semibold">
              Дисплей
            </td>
          </tr>
          <tr>
            <td className="p-4 border-b border-gray-200 bg-gray-50">Диагональ</td>
            {phones.map((phone, idx) => (
              <td 
                key={phone.id} 
                className={`p-4 border-b border-gray-200 ${isDifferent('screen.size', idx) ? 'bg-blue-50' : ''}`}
              >
                {phone.screen.size}"
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b border-gray-200 bg-gray-50">Тип дисплея</td>
            {phones.map((phone, idx) => (
              <td 
                key={phone.id} 
                className={`p-4 border-b border-gray-200 ${isDifferent('screen.type', idx) ? 'bg-blue-50' : ''}`}
              >
                {phone.screen.type}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b border-gray-200 bg-gray-50">Разрешение</td>
            {phones.map((phone, idx) => (
              <td 
                key={phone.id} 
                className={`p-4 border-b border-gray-200 ${isDifferent('screen.resolution', idx) ? 'bg-blue-50' : ''}`}
              >
                {phone.screen.resolution}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b border-gray-200 bg-gray-50">Частота обновления</td>
            {phones.map((phone, idx) => (
              <td 
                key={phone.id} 
                className={`p-4 border-b border-gray-200 ${isDifferent('screen.refreshRate', idx) ? 'bg-blue-50' : ''}`}
              >
                {phone.screen.refreshRate} Гц
              </td>
            ))}
          </tr>
          
          {/* Память и процессор */}
          <tr className="bg-gray-100">
            <td colSpan={phones.length + 1} className="p-3 font-semibold">
              Память и процессор
            </td>
          </tr>
          <tr>
            <td className="p-4 border-b border-gray-200 bg-gray-50">Оперативная память</td>
            {phones.map((phone, idx) => (
              <td 
                key={phone.id} 
                className={`p-4 border-b border-gray-200 ${isDifferent('memory.ram', idx) ? 'bg-blue-50' : ''}`}
              >
                {phone.memory.ram} ГБ
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b border-gray-200 bg-gray-50">Встроенная память</td>
            {phones.map((phone, idx) => (
              <td 
                key={phone.id} 
                className={`p-4 border-b border-gray-200 ${isDifferent('memory.storage', idx) ? 'bg-blue-50' : ''}`}
              >
                {phone.memory.storage} ГБ
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b border-gray-200 bg-gray-50">Процессор</td>
            {phones.map((phone, idx) => (
              <td 
                key={phone.id} 
                className={`p-4 border-b border-gray-200 ${isDifferent('processor.name', idx) ? 'bg-blue-50' : ''}`}
              >
                {phone.processor.name}
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b border-gray-200 bg-gray-50">Количество ядер</td>
            {phones.map((phone, idx) => (
              <td 
                key={phone.id} 
                className={`p-4 border-b border-gray-200 ${isDifferent('processor.cores', idx) ? 'bg-blue-50' : ''}`}
              >
                {phone.processor.cores}
              </td>
            ))}
          </tr>
          
          {/* Камеры */}
          <tr className="bg-gray-100">
            <td colSpan={phones.length + 1} className="p-3 font-semibold">
              Камеры
            </td>
          </tr>
          <tr>
            <td className="p-4 border-b border-gray-200 bg-gray-50">Основная камера</td>
            {phones.map((phone, idx) => (
              <td 
                key={phone.id} 
                className={`p-4 border-b border-gray-200 ${isDifferent('cameras.main', idx) ? 'bg-blue-50' : ''}`}
              >
                {phone.cameras.main} Мп
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b border-gray-200 bg-gray-50">Фронтальная камера</td>
            {phones.map((phone, idx) => (
              <td 
                key={phone.id} 
                className={`p-4 border-b border-gray-200 ${isDifferent('cameras.front', idx) ? 'bg-blue-50' : ''}`}
              >
                {phone.cameras.front} Мп
              </td>
            ))}
          </tr>
          
          {/* Аккумулятор и зарядка */}
          <tr className="bg-gray-100">
            <td colSpan={phones.length + 1} className="p-3 font-semibold">
              Аккумулятор и зарядка
            </td>
          </tr>
          <tr>
            <td className="p-4 border-b border-gray-200 bg-gray-50">Емкость аккумулятора</td>
            {phones.map((phone, idx) => (
              <td 
                key={phone.id} 
                className={`p-4 border-b border-gray-200 ${isDifferent('battery.capacity', idx) ? 'bg-blue-50' : ''}`}
              >
                {phone.battery.capacity} мАч
              </td>
            ))}
          </tr>
          <tr>
            <td className="p-4 border-b border-gray-200 bg-gray-50">Быстрая зарядка</td>
            {phones.map((phone, idx) => (
              <td 
                key={phone.id} 
                className={`p-4 border-b border-gray-200 ${isDifferent('battery.fastCharging', idx) ? 'bg-blue-50' : ''}`}
              >
                {phone.battery.fastCharging}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PhoneCompareTable;