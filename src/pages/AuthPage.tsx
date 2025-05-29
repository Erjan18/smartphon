import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, KeyRound, AtSign, UserPlus } from 'lucide-react';

type AuthMode = 'login' | 'register';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = mode === 'login' ? 'Вход - Смартфон Сити' : 'Регистрация - Смартфон Сити';
    
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate, mode]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (mode === 'login') {
      if (!email || !password) {
        setError('Пожалуйста, заполните все поля');
        return;
      }
      
      login(email, password);
    } else {
      if (!name || !email || !password) {
        setError('Пожалуйста, заполните все поля');
        return;
      }
      
      if (password.length < 6) {
        setError('Пароль должен содержать не менее 6 символов');
        return;
      }
      
      register(name, email, password);
    }
  };
  
  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
  };
  
  return (
    <div className="container-custom py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">{mode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}</h1>
              <p className="text-gray-600 mt-2">
                {mode === 'login' 
                  ? 'Войдите, чтобы получить доступ к избранному и другим функциям' 
                  : 'Создайте аккаунт, чтобы использовать все возможности сайта'}
              </p>
            </div>
            
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {mode === 'register' && (
                <div className="mb-4">
                  <label htmlFor="name\" className="block text-sm font-medium text-gray-700 mb-1">
                    Имя
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input-field pl-10"
                      placeholder="Ваше имя"
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-10"
                    placeholder="your@email.com"
                  />
                  <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Пароль
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-10"
                    placeholder={mode === 'register' ? 'Минимум 6 символов' : '••••••••'}
                  />
                  <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
              
              <button type="submit" className="btn-primary w-full">
                {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <button 
                onClick={toggleMode}
                className="text-blue-600 hover:underline inline-flex items-center"
              >
                {mode === 'login' ? (
                  <>
                    <UserPlus className="w-4 h-4 mr-1" />
                    Создать аккаунт
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 mr-1" />
                    Уже есть аккаунт? Войти
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;