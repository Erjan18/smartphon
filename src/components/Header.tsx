import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, Heart, Menu, X, ShoppingCart, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { favorites } = useFavorites();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Phone className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">СмартфонСити</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-blue-600 transition-colors">Главная</Link>
            <Link to="/catalog" className="font-medium hover:text-blue-600 transition-colors">Каталог</Link>
            <Link to="/compare" className="font-medium hover:text-blue-600 transition-colors">Сравнение</Link>
            <a href="https://wa.me/996707379957">Купить</a> 
          </nav>
          
          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleSearch} 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Поиск"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <Link 
              to="/favorites" 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              aria-label="Избранное"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <button 
                    onClick={logout} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="btn-primary"
              >
                Войти
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="py-4 space-y-4">
            <Link to="/" className="block py-2 font-medium hover:text-blue-600">Главная</Link>
            <Link to="/catalog" className="block py-2 font-medium hover:text-blue-600">Каталог</Link>
            <Link to="/compare" className="block py-2 font-medium hover:text-blue-600">Сравнение</Link>
            <Link to="/favorites" className="block py-2 font-medium hover:text-blue-600">
              Избранное {favorites.length > 0 && `(${favorites.length})`}
            </Link>
            
            {isAuthenticated ? (
              <>
                <div className="py-2 font-medium">
                  {user?.name}
                </div>
                <button 
                  onClick={logout} 
                  className="block py-2 text-red-600 font-medium"
                >
                  Выйти
                </button>
              </>
            ) : (
              <Link to="/auth" className="block py-2 font-medium text-blue-600">
                Войти / Зарегистрироваться
              </Link>
            )}
            
            <button 
              onClick={toggleSearch} 
              className="flex items-center py-2 font-medium hover:text-blue-600"
            >
              <Search className="w-5 h-5 mr-2" />
              Поиск
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className={`transition-all duration-300 overflow-hidden ${isSearchOpen ? 'max-h-20 py-4' : 'max-h-0 py-0'}`}>
          <SearchBar onClose={toggleSearch} />
        </div>
      </div>
    </header>
  );
};

export default Header;