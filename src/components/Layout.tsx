import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext';
import Toast from './common/Toast';

const Layout: React.FC = () => {
  const { notification } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      {notification && (
        <Toast 
          message={notification.message} 
          type={notification.type} 
        />
      )}
    </div>
  );
};

export default Layout;