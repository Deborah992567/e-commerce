import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NotificationPreference {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: string;
  category: 'orders' | 'products' | 'deals' | 'system';
}

interface PushNotificationsManagerProps {
  onBack?: () => void;
  onPreferencesChange?: (prefs: NotificationPreference[]) => void;
}

const PushNotificationsManager: React.FC<PushNotificationsManagerProps> = ({
  onBack,
  onPreferencesChange,
}) => {
  const insets = useSafeAreaInsets();
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    // Order Notifications
    {
      id: 'order_placed',
      title: 'Order Placed',
      description: 'Get notified when your order is confirmed',
      enabled: true,
      icon: '📦',
      category: 'orders',
    },
    {
      id: 'order_shipped',
      title: 'Order Shipped',
      description: 'Notifications when your package ships',
      enabled: true,
      icon: '🚚',
      category: 'orders',
    },
    {
      id: 'order_delivered',
      title: 'Order Delivered',
      description: 'Get notified when package is delivered',
      enabled: true,
      icon: '✅',
      category: 'orders',
    },
    {
      id: 'order_updates',
      title: 'Order Updates',
      description: 'Any changes or issues with your order',
      enabled: true,
      icon: '⚠️',
      category: 'orders',
    },

    // Product Notifications
    {
      id: 'back_in_stock',
      title: 'Back in Stock',
      description: 'Notify when wishlist items are back in stock',
      enabled: true,
      icon: '📦',
      category: 'products',
    },
    {
      id: 'price_drop',
      title: 'Price Drops',
      description: 'Alert when items you follow get cheaper',
      enabled: true,
      icon: '💰',
      category: 'products',
    },
    {
      id: 'new_arrivals',
      title: 'New Arrivals',
      description: 'Notifications about new products in your favorite categories',
      enabled: false,
      icon: '✨',
      category: 'products',
    },
    {
      id: 'reviews',
      title: 'Product Reviews',
      description: 'New reviews and ratings on products you bought',
      enabled: false,
      icon: '⭐',
      category: 'products',
    },

    // Deals & Promotions
    {
      id: 'flash_sales',
      title: 'Flash Sales',
      description: 'Limited-time offers and flash sales',
      enabled: true,
      icon: '🔥',
      category: 'deals',
    },
    {
      id: 'exclusive_deals',
      title: 'Exclusive Deals',
      description: 'Special offers just for you',
      enabled: true,
      icon: '🎁',
      category: 'deals',
    },
    {
      id: 'coupon_codes',
      title: 'Coupon Codes',
      description: 'New coupon codes and discount codes',
      enabled: false,
      icon: '🎟️',
      category: 'deals',
    },
    {
      id: 'seasonal',
      title: 'Seasonal Sales',
      description: 'Seasonal promotions and sales events',
      enabled: false,
      icon: '🎄',
      category: 'deals',
    },

    // System Notifications
    {
      id: 'security_alerts',
      title: 'Security Alerts',
      description: 'Important security and account updates',
      enabled: true,
      icon: '🔒',
      category: 'system',
    },
    {
      id: 'payment_reminders',
      title: 'Payment Reminders',
      description: 'Reminders for pending payments',
      enabled: true,
      icon: '💳',
      category: 'system',
    },
  ]);

  const handleToggle = (id: string) => {
    const updated = preferences.map((pref) =>
      pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
    );
    setPreferences(updated);
    onPreferencesChange?.(updated);
  };

  const handleEnableAll = () => {
    const updated = preferences.map((pref) => ({ ...pref, enabled: true }));
    setPreferences(updated);
    onPreferencesChange?.(updated);
    Alert.alert('Success', 'All notifications enabled');
  };

  const handleDisableAll = () => {
    Alert.alert(
      'Disable All',
      'Are you sure? You will miss important updates.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disable All',
          style: 'destructive',
          onPress: () => {
            const updated = preferences.map((pref) => ({ ...pref, enabled: false }));
            setPreferences(updated);
            onPreferencesChange?.(updated);
          },
        },
      ]
    );
  };

  const categories = [
    { key: 'orders', label: 'Orders & Shipping', icon: '📦' },
    { key: 'products', label: 'Products & Updates', icon: '📱' },
    { key: 'deals', label: 'Deals & Promotions', icon: '🎁' },
    { key: 'system', label: 'Account & Security', icon: '🔒' },
  ];

  const enabledCount = preferences.filter((p) => p.enabled).length;
  const totalCount = preferences.length;

  const renderCategory = (
    categoryKey: 'orders' | 'products' | 'deals' | 'system',
    categoryLabel: string,
    categoryIcon: string
  ) => {
    const categoryPrefs = preferences.filter((p) => p.category === categoryKey);
    const categoryEnabled = categoryPrefs.filter((p) => p.enabled).length;

    return (
      <View key={categoryKey} style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryIcon}>{categoryIcon}</Text>
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryTitle}>{categoryLabel}</Text>
            <Text style={styles.categoryCount}>
              {categoryEnabled} of {categoryPrefs.length} enabled
            </Text>
          </View>
        </View>

        {categoryPrefs.map((pref) => (
          <View key={pref.id} style={styles.prefRow}>
            <View style={styles.prefInfo}>
              <Text style={styles.prefIcon}>{pref.icon}</Text>
              <View style={styles.prefTexts}>
                <Text style={styles.prefTitle}>{pref.title}</Text>
                <Text style={styles.prefDesc}>{pref.description}</Text>
              </View>
            </View>
            <Switch
              value={pref.enabled}
              onValueChange={() => handleToggle(pref.id)}
              trackColor={{ false: '#3E3E4E', true: '#81C784' }}
              thumbColor={pref.enabled ? '#E8C97A' : '#A0A0A0'}
            />
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            <Text style={styles.summaryLabel}>Notifications Enabled</Text>
            <Text style={styles.summaryValue}>
              {enabledCount} of {totalCount}
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(enabledCount / totalCount) * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            onPress={handleEnableAll}
            style={[styles.actionBtn, styles.enableBtn]}
          >
            <Text style={styles.enableBtnText}>✓ Enable All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDisableAll}
            style={[styles.actionBtn, styles.disableBtn]}
          >
            <Text style={styles.disableBtnText}>✕ Disable All</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        {categories.map((cat) =>
          renderCategory(
            cat.key as 'orders' | 'products' | 'deals' | 'system',
            cat.label,
            cat.icon
          )
        )}

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoBoldText}>💡 Pro Tip:</Text>
          <Text style={styles.infoText}>
            Enable order and security notifications to stay updated on important events. Customize other notifications based on your preferences.
          </Text>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D12',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2A',
  },
  backBtn: {
    padding: 8,
  },
  backText: {
    fontSize: 24,
    color: '#E8C97A',
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  summaryCard: {
    backgroundColor: '#18181F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  summaryContent: {
    marginBottom: 12,
  },
  summaryLabel: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 4,
  },
  summaryValue: {
    color: '#E8C97A',
    fontSize: 24,
    fontWeight: '700',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#2A2A35',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E8C97A',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  enableBtn: {
    backgroundColor: '#4CAF50',
  },
  enableBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  disableBtn: {
    backgroundColor: '#FF6B6B',
  },
  disableBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2A',
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  categoryCount: {
    color: '#A0A0A0',
    fontSize: 12,
    marginTop: 2,
  },
  prefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#18181F',
  },
  prefInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: 12,
  },
  prefIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  prefTexts: {
    flex: 1,
  },
  prefTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  prefDesc: {
    color: '#A0A0A0',
    fontSize: 12,
    lineHeight: 16,
  },
  infoBox: {
    backgroundColor: '#18181F',
    borderRadius: 8,
    padding: 12,
    marginTop: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#E8C97A',
  },
  infoBoldText: {
    color: '#E8C97A',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  infoText: {
    color: '#A0A0A0',
    fontSize: 13,
    lineHeight: 18,
  },
  spacer: {
    height: 20,
  },
});

export default PushNotificationsManager;
