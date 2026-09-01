import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, setTokens, ApiUser } from '../services/api';

interface User {
  id: number;
  email: string;
  role: string;
  full_name?: string | null;
  phone?: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, fullName?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateProfile: (data: { full_name?: string; phone?: string }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AUTH_KEY = 'dez_auth';

interface StoredAuth {
  access_token: string;
  refresh_token: string;
  user: User;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const applyAuth = (auth: StoredAuth) => {
    setTokens(auth.access_token, auth.refresh_token);
    setToken(auth.access_token);
    setUser(auth.user);
  };

  useEffect(() => {
    const loadStored = async () => {
      try {
        const raw = await AsyncStorage.getItem(AUTH_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as StoredAuth;
          applyAuth(parsed);
        }
      } catch (e) {
        console.error('Error loading stored auth:', e);
      }
    };
    loadStored();
  }, []);

  const persist = async (auth: StoredAuth) => {
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    applyAuth(auth);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await api.post<{
        access_token: string;
        refresh_token: string;
        user: ApiUser;
      }>('/auth/login', { email, password });

      const user = {
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
        full_name: data.user.full_name,
        phone: data.user.phone,
      };

      await persist({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        user,
      });
      return true;
    } catch (e) {
      console.error('Login error:', e);
      return false;
    }
  };

  const signup = async (
    email: string,
    password: string,
    fullName?: string
  ): Promise<boolean> => {
    try {
      await api.post('/auth/register', { email, password, full_name: fullName });
      return await login(email, password);
    } catch (e) {
      console.error('Signup error:', e);
      return false;
    }
  };

  const logout = async () => {
    setTokens(null, null);
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem(AUTH_KEY);
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const me = await api.get<ApiUser>('/auth/me');
      setUser((prev) => ({
        ...(prev ?? {}),
        id: me.id,
        email: me.email,
        role: me.role,
        full_name: me.full_name,
        phone: me.phone,
      }));
    } catch (e) {
      console.error('Refresh user error:', e);
    }
  };

  const updateProfile = async (data: {
    full_name?: string;
    phone?: string;
  }): Promise<boolean> => {
    try {
      await api.put('/profile/', data);
      await refreshUser();
      return true;
    } catch (e) {
      console.error('Update profile error:', e);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAdmin: user?.role === 'admin',
    login,
    signup,
    logout,
    refreshUser,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
