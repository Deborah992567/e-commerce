import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
// Temporarily using in-memory storage instead of AsyncStorage
// import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * MOCK ADMIN CREDENTIALS:
 * Email: admin@ecommerce.com
 * Password: admin123
 * 
 * Any other email/password combination will work as a regular customer login.
 */

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
  
  // Simple in-memory storage for demo (replace with AsyncStorage later)
  const memoryStorage = useRef<{[key: string]: string}>({});
  
  const storage = {
    getItem: (key: string) => Promise.resolve(memoryStorage.current[key] || null),
    setItem: (key: string, value: string) => {
      memoryStorage.current[key] = value;
      return Promise.resolve();
    },
    removeItem: (key: string) => {
      delete memoryStorage.current[key];
      return Promise.resolve();
    }
  };

  // Check for stored token on app start
  useEffect(() => {
    const loadStoredAuth = async () => {
      try {
        const storedToken = await storage.getItem('auth_token');
        const storedUser = await storage.getItem('user_data');
        
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
      
      const MOCK_USERS = [
        { id: 1, email: 'admin@ecommerce.com', password: 'admin123', role: 'admin' as const },
        { id: 2, email: 'user1@ecommerce.com', password: 'user123', role: 'customer' as const },
        { id: 3, email: 'user2@ecommerce.com', password: 'user123', role: 'customer' as const },
      ];

      const matchedUser = MOCK_USERS.find((u) => u.email === email && u.password === password);

      if (!matchedUser) {
        return false;
      }
      
      const mockUser: User = {
        id: matchedUser.id,
        email: matchedUser.email,
        role: matchedUser.role,
      };
      const mockToken = `mock_${matchedUser.role}_token_${Date.now()}`;

      setUser(mockUser);
      setToken(mockToken);

      await storage.setItem('auth_token', mockToken);
      await storage.setItem('user_data', JSON.stringify(mockUser));

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await storage.removeItem('auth_token');
    await storage.removeItem('user_data');
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