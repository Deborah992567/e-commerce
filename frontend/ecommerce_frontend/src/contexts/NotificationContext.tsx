import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NotificationSettings {
  orderUpdates: boolean;
  newProducts: boolean;
  specialDeals: boolean;
  frequency: 'instant' | 'daily' | 'weekly'; // Frequency of notifications
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'product' | 'deal';
  timestamp: string;
  read: boolean;
}

interface NotificationContextType {
  settings: NotificationSettings;
  notifications: Notification[];
  updateSettings: (settings: NotificationSettings) => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  clearNotifications: () => Promise<void>;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const DEFAULT_SETTINGS: NotificationSettings = {
  orderUpdates: true,
  newProducts: true,
  specialDeals: true,
  frequency: 'instant',
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_SETTINGS);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load settings and notifications from AsyncStorage on app start
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem('notificationSettings');
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings));
        }

        const savedNotifications = await AsyncStorage.getItem('notifications');
        if (savedNotifications) {
          setNotifications(JSON.parse(savedNotifications));
        }
      } catch (error) {
        console.error('Error loading notification data:', error);
      }
    };
    loadData();
  }, []);

  const updateSettings = async (newSettings: NotificationSettings) => {
    try {
      setSettings(newSettings);
      await AsyncStorage.setItem('notificationSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error updating notification settings:', error);
    }
  };

  const addNotification = async (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    try {
      const newNotification: Notification = {
        ...notification,
        id: `notif_${Date.now()}`,
        timestamp: new Date().toISOString(),
        read: false,
      };

      const updatedNotifications = [newNotification, ...notifications];
      setNotifications(updatedNotifications);
      await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const updatedNotifications = notifications.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      );
      setNotifications(updatedNotifications);
      await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const clearNotifications = async () => {
    try {
      setNotifications([]);
      await AsyncStorage.removeItem('notifications');
    } catch (error) {
      console.error('Error clearing notifications:', error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value: NotificationContextType = {
    settings,
    notifications,
    updateSettings,
    addNotification,
    markAsRead,
    clearNotifications,
    unreadCount,
  };

  return (
    <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
