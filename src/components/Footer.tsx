import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Смартфон Сити</h3>
            <p className="text-gray-300 mb-4">
              Ваш надежный помощник в выборе мобильных телефонов в Бишкеке.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-300 hover:text-white transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-gray-300 hover:text-white transition-colors">
                  Сравнение телефонов
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-300 hover:text-white transition-colors">
                  Избранное
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Категории</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog?brand=Apple" className="text-gray-300 hover:text-white transition-colors">
                  Apple
                </Link>
              </li>
              <li>
                <Link to="/catalog?brand=Samsung" className="text-gray-300 hover:text-white transition-colors">
                  Samsung
                </Link>
              </li>
              <li>
                <Link to="/catalog?brand=Xiaomi" className="text-gray-300 hover:text-white transition-colors">
                  Xiaomi
                </Link>
              </li>
              <li>
                <Link to="/catalog?brand=Huawei" className="text-gray-300 hover:text-white transition-colors">
                  Huawei
                </Link>
              </li>
              <li>
                <Link to="/catalog?brand=Google" className="text-gray-300 hover:text-white transition-colors">
                  Google
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-gray-300 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">г. Бишкек, ул. Киевская 95, ТЦ "Мобильный мир"</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-gray-300" />
                <span className="text-gray-300">+996 555 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-gray-300" />
                <span className="text-gray-300">info@mobibishkek.kg</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Смартфон Сити. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;