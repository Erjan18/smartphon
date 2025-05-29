import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Страница не найдена - Смартфон Сити';
  }, []);
  
  return (
    <div className="container-custom py-20 text-center">
      <h1 className="text-7xl font-bold text-gray-800 mb-6">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Страница не найдена</h2>
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        Страница, которую вы ищете, не существует или была перемещена.
      </p>
      <div className="flex justify-center space-x-4">
        <Link to="/" className="btn-primary flex items-center">
          <Home className="w-5 h-5 mr-2" />
          На главную
        </Link>
        <Link to="/catalog" className="btn-secondary flex items-center">
          <Search className="w-5 h-5 mr-2" />
          Перейти в каталог
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;