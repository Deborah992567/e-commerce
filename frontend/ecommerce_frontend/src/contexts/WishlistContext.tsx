import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  addedAt: string; // ISO date string
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load wishlist from AsyncStorage on app start
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const savedWishlist = await AsyncStorage.getItem('wishlist');
        if (savedWishlist) {
          setWishlist(JSON.parse(savedWishlist));
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    };
    loadWishlist();
  }, []);

  // Save wishlist to AsyncStorage whenever it changes
  const saveToStorage = async (items: WishlistItem[]) => {
    try {
      await AsyncStorage.setItem('wishlist', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving wishlist:', error);
    }
  };

  const addToWishlist = async (item: WishlistItem) => {
    // Check if item already exists
    if (!wishlist.find((w) => w.id === item.id)) {
      const newItem = {
        ...item,
        addedAt: new Date().toISOString(),
      };
      const updatedWishlist = [...wishlist, newItem];
      setWishlist(updatedWishlist);
      await saveToStorage(updatedWishlist);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
    await saveToStorage(updatedWishlist);
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearWishlist = async () => {
    setWishlist([]);
    await AsyncStorage.removeItem('wishlist');
  };

  const value: WishlistContextType = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
