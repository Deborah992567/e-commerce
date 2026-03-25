import React from 'react';
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
import { useNotifications } from '../contexts/NotificationContext';

interface PushNotificationsManagerProps {
  onBack?: () => void;
}

const PushNotificationsManager: React.FC<PushNotificationsManagerProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  const { settings, updateSettings } = useNotifications();

  const handleToggleOrderUpdates = async () => {
    await updateSettings({
      ...settings,
      orderUpdates: !settings.orderUpdates,
    });
  };

  const handleToggleNewProducts = async () => {
    await updateSettings({
      ...settings,
      newProducts: !settings.newProducts,
    });
  };

  const handleToggleDeals = async () => {
    await updateSettings({
      ...settings,
      specialDeals: !settings.specialDeals,
    });
  };

  const handleFrequencyChange = async (frequency: 'instant' | 'daily' | 'weekly') => {
    await updateSettings({
      ...settings,
      frequency,
    });
    Alert.alert('✅ Frequency Updated', `Notifications will be sent ${frequency}`);
  };

  const handleTestNotification = () => {
    Alert.alert('🔔 Test Notification', 'This is a sample notification from your store');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.emoji}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🔔 Notifications</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Notification Types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Types</Text>

          {/* Order Updates */}
          <View style={styles.notificationRow}>
            <View style={styles.notificationInfo}>
              <Text style={styles.notificationIcon}>📦</Text>
              <View style={styles.notificationTexts}>
                <Text style={styles.notificationTitle}>Order Updates</Text>
                <Text style={styles.notificationDesc}>Shipping, delivery confirmation</Text>
              </View>
            </View>
            <Switch
              value={settings.orderUpdates}
              onValueChange={handleToggleOrderUpdates}
              trackColor={{ false: '#3E3E4E', true: '#81C784' }}
              thumbColor={settings.orderUpdates ? '#E8C97A' : '#A0A0A0'}
            />
          </View>

          {/* New Products */}
          <View style={styles.notificationRow}>
            <View style={styles.notificationInfo}>
              <Text style={styles.notificationIcon}>✨</Text>
              <View style={styles.notificationTexts}>
                <Text style={styles.notificationTitle}>New Products</Text>
                <Text style={styles.notificationDesc}>Items in favorite categories</Text>
              </View>
            </View>
            <Switch
              value={settings.newProducts}
              onValueChange={handleToggleNewProducts}
              trackColor={{ false: '#3E3E4E', true: '#81C784' }}
              thumbColor={settings.newProducts ? '#E8C97A' : '#A0A0A0'}
            />
          </View>

          {/* Special Deals */}
          <View style={styles.notificationRow}>
            <View style={styles.notificationInfo}>
              <Text style={styles.notificationIcon}>🎁</Text>
              <View style={styles.notificationTexts}>
                <Text style={styles.notificationTitle}>Special Deals</Text>
                <Text style={styles.notificationDesc}>Exclusive offers & promotions</Text>
              </View>
            </View>
            <Switch
              value={settings.specialDeals}
              onValueChange={handleToggleDeals}
              trackColor={{ false: '#3E3E4E', true: '#81C784' }}
              thumbColor={settings.specialDeals ? '#E8C97A' : '#A0A0A0'}
            />
          </View>
        </View>

        {/* Frequency Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Frequency</Text>
          <Text style={styles.frequencyLabel}>How often would you like notifications?</Text>

          {(['instant', 'daily', 'weekly'] as const).map((freq) => (
            <TouchableOpacity
              key={freq}
              onPress={() => handleFrequencyChange(freq)}
              style={[
                styles.frequencyOption,
                settings.frequency === freq && styles.frequencyOptionActive,
              ]}
            >
              <View style={styles.frequencyRadio}>
                {settings.frequency === freq && <View style={styles.frequencyRadioDot} />}
              </View>
              <View style={styles.frequencyTexts}>
                <Text style={styles.frequencyTitle}>
                  {freq === 'instant' && '⚡ Instant'}
                  {freq === 'daily' && '📅 Daily'}
                  {freq === 'weekly' && '📆 Weekly'}
                </Text>
                <Text style={styles.frequencyDesc}>
                  {freq === 'instant' && 'Get notified right away'}
                  {freq === 'daily' && 'Receive daily digest'}
                  {freq === 'weekly' && 'Weekly summary'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Test & Actions */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={handleTestNotification}
            style={styles.testBtn}
          >
            <Text style={styles.testBtnText}>🔔 Send Test Notification</Text>
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoBoldText}>💡 Tip:</Text>
          <Text style={styles.infoText}>
            Keep order notifications enabled to track your purchases. Customize other preferences based on your interests.
          </Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D12' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2A',
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  emoji: { fontSize: 20, color: '#E8C97A' },
  title: { color: '#FFF', fontSize: 20, fontWeight: '700', flex: 1, textAlign: 'center' },
  spacer: { width: 40 },
  content: { paddingHorizontal: 14, paddingVertical: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { color: '#FFF', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#18181F',
    borderRadius: 8,
    marginBottom: 8,
  },
  notificationInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  notificationIcon: { fontSize: 24, marginRight: 12 },
  notificationTexts: { flex: 1 },
  notificationTitle: { color: '#FFF', fontSize: 14, fontWeight: '600', marginBottom: 2 },
  notificationDesc: { color: '#A0A0A0', fontSize: 12 },
  frequencyLabel: { color: '#A0A0A0', fontSize: 13, marginBottom: 12 },
  frequencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#18181F',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2A2A35',
  },
  frequencyOptionActive: { borderColor: '#E8C97A', backgroundColor: '#1F1F2A' },
  frequencyRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E8C97A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  frequencyRadioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E8C97A' },
  frequencyTexts: { flex: 1 },
  frequencyTitle: { color: '#FFF', fontSize: 14, fontWeight: '600', marginBottom: 2 },
  frequencyDesc: { color: '#A0A0A0', fontSize: 12 },
  testBtn: {
    backgroundColor: '#E8C97A',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  testBtnText: { color: '#000', fontSize: 14, fontWeight: '600' },
  infoBox: {
    backgroundColor: '#18181F',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#E8C97A',
  },
  infoBoldText: { color: '#E8C97A', fontSize: 13, fontWeight: '700', marginBottom: 6 },
  infoText: { color: '#A0A0A0', fontSize: 13, lineHeight: 18 },
  bottomSpacer: { height: 20 },
});

export default PushNotificationsManager;
