import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPhoneById, getSimilarPhones } from '../utils/phoneUtils';
import { Phone } from '../types/Phone';
import PhoneDetailContent from '../components/PhoneDetailContent';
import FeaturedPhones from '../components/FeaturedPhones';
import { ArrowLeft } from 'lucide-react';

const PhoneDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [phone, setPhone] = useState<Phone | null>(null);
  const [similarPhones, setSimilarPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const phoneData = getPhoneById(id);
      setLoading(true);
      
      // Simulate loading
      setTimeout(() => {
        setPhone(phoneData);
        if (phoneData) {
          setSimilarPhones(getSimilarPhones(phoneData, 4));
          document.title = `${phoneData.name} - Смартфон Сити`;
        } else {
          document.title = 'Телефон не найден - Смартфон Сити';
        }
        setLoading(false);
      }, 300);
    }
  }, [id]);
  
  if (loading) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 max-w-md mx-auto mb-6"></div>
          <div className="h-64 bg-gray-200 rounded-lg mb-4 max-w-lg mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
        </div>
      </div>
    );
  }
  
  if (!phone) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-3xl font-bold mb-6">Телефон не найден</h1>
        <p className="text-gray-600 mb-8">
          К сожалению, телефон с указанным идентификатором не найден в нашей базе данных.
        </p>
        <Link to="/catalog" className="btn-primary">
          Вернуться в каталог
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-3">
        <div className="container-custom">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-blue-600">Главная</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/catalog" className="text-gray-500 hover:text-blue-600">Каталог</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to={`/catalog?brand=${phone.brand}`} className="text-gray-500 hover:text-blue-600">{phone.brand}</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">{phone.name}</span>
          </div>
        </div>
      </div>
      
      {/* Back Button */}
      <div className="container-custom py-4">
        <Link to="/catalog" className="inline-flex items-center text-gray-600 hover:text-blue-600">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Назад в каталог
        </Link>
      </div>
      
      {/* Phone Details */}
      <PhoneDetailContent phone={phone} />
      
      {/* Similar Phones */}
      {similarPhones.length > 0 && (
        <FeaturedPhones 
          title="Похожие модели" 
          phones={similarPhones} 
        />
      )}
    </div>
  );
};

export default PhoneDetailPage;