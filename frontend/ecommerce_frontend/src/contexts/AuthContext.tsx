import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  email: string;
  role: 'customer' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Check for stored token on app start
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('auth_token');
        const storedUser = await AsyncStorage.getItem('user_data');
        
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading stored auth:', error);
      }
    };
    
    loadStoredAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Replace with real API call
      // const response = await fetch('http://localhost:8000/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();
      
      // Mock authentication - check if email contains 'admin'
      if (email.toLowerCase().includes('admin')) {
        const mockUser: User = {
          id: 1,
          email: email,
          role: 'admin'
        };
        const mockToken = 'mock_admin_token_' + Date.now();
        
        setUser(mockUser);
        setToken(mockToken);
        
        // Store in AsyncStorage
        await AsyncStorage.setItem('auth_token', mockToken);
        await AsyncStorage.setItem('user_data', JSON.stringify(mockUser));
        
        return true;
      } else {
        // Regular user login
        const mockUser: User = {
          id: 2,
          email: email,
          role: 'customer'
        };
        const mockToken = 'mock_customer_token_' + Date.now();
        
        setUser(mockUser);
        setToken(mockToken);
        
        await AsyncStorage.setItem('auth_token', mockToken);
        await AsyncStorage.setItem('user_data', JSON.stringify(mockUser));
        
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user_data');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};