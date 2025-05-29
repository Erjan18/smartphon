import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface CartItem {
  id: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (id: string, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { isAuthenticated, user } = useAuth();

  // Calculate total items
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Load cart from localStorage on mount and when auth state changes
  useEffect(() => {
    let storageKey = 'cart_guest';
    
    if (isAuthenticated && user) {
      storageKey = `cart_${user.id}`;
    }
    
    const storedCart = localStorage.getItem(storageKey);
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
        setCartItems([]);
      }
    }
  }, [isAuthenticated, user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    let storageKey = 'cart_guest';
    
    if (isAuthenticated && user) {
      storageKey = `cart_${user.id}`;
    }
    
    localStorage.setItem(storageKey, JSON.stringify(cartItems));
  }, [cartItems, isAuthenticated, user]);

  const addToCart = (id: string, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === id);
      
      if (existingItem) {
        return prev.map(item => 
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      
      return [...prev, { id, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};