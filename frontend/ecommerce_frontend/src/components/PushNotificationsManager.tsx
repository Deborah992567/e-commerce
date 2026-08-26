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
import {
  BellIcon,
  ChevronLeftIcon,
  PackageIcon,
  StarIcon,
  GiftIcon,
  DealsIcon,
  ClockIcon,
  TagIcon,
  CheckIcon,
  HelpIcon,
} from './Icons';

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
    Alert.alert('Frequency Updated', `Notifications will be sent ${frequency}`);
  };

  const handleTestNotification = () => {
    Alert.alert('Test Notification', 'This is a sample notification from your store');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <ChevronLeftIcon size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Types</Text>

          <View style={styles.notificationRow}>
            <View style={styles.notificationInfo}>
              <View style={styles.iconWrap}>
                <PackageIcon size={20} color="#FF5722" />
              </View>
              <View style={styles.notificationTexts}>
                <Text style={styles.notificationTitle}>Order Updates</Text>
                <Text style={styles.notificationDesc}>Shipping, delivery confirmation</Text>
              </View>
            </View>
            <Switch
              value={settings.orderUpdates}
              onValueChange={handleToggleOrderUpdates}
              trackColor={{ false: '#2D2D38', true: '#FF5722' }}
              thumbColor={settings.orderUpdates ? '#FFF' : '#6B6B7B'}
            />
          </View>

          <View style={styles.notificationRow}>
            <View style={styles.notificationInfo}>
              <View style={styles.iconWrap}>
                <StarIcon size={20} color="#FF5722" filled />
              </View>
              <View style={styles.notificationTexts}>
                <Text style={styles.notificationTitle}>New Products</Text>
                <Text style={styles.notificationDesc}>Items in favorite categories</Text>
              </View>
            </View>
            <Switch
              value={settings.newProducts}
              onValueChange={handleToggleNewProducts}
              trackColor={{ false: '#2D2D38', true: '#FF5722' }}
              thumbColor={settings.newProducts ? '#FFF' : '#6B6B7B'}
            />
          </View>

          <View style={styles.notificationRow}>
            <View style={styles.notificationInfo}>
              <View style={styles.iconWrap}>
                <GiftIcon size={20} color="#FF5722" />
              </View>
              <View style={styles.notificationTexts}>
                <Text style={styles.notificationTitle}>Special Deals</Text>
                <Text style={styles.notificationDesc}>Exclusive offers & promotions</Text>
              </View>
            </View>
            <Switch
              value={settings.specialDeals}
              onValueChange={handleToggleDeals}
              trackColor={{ false: '#2D2D38', true: '#FF5722' }}
              thumbColor={settings.specialDeals ? '#FFF' : '#6B6B7B'}
            />
          </View>
        </View>

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
                <View style={styles.frequencyTitleRow}>
                  {freq === 'instant' && <DealsIcon size={16} color="#FF5722" />}
                  {freq === 'daily' && <ClockIcon size={16} color="#FF5722" />}
                  {freq === 'weekly' && <TagIcon size={16} color="#FF5722" />}
                  <Text style={styles.frequencyTitle}>
                    {freq === 'instant' && 'Instant'}
                    {freq === 'daily' && 'Daily'}
                    {freq === 'weekly' && 'Weekly'}
                  </Text>
                </View>
                <Text style={styles.frequencyDesc}>
                  {freq === 'instant' && 'Get notified right away'}
                  {freq === 'daily' && 'Receive daily digest'}
                  {freq === 'weekly' && 'Weekly summary'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            onPress={handleTestNotification}
            style={styles.testBtn}
          >
            <BellIcon size={18} color="#FFF" />
            <Text style={styles.testBtnText}>Send Test Notification</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoBox}>
          <View style={styles.infoHeader}>
            <HelpIcon size={16} color="#FF5722" />
            <Text style={styles.infoBoldText}>Tip</Text>
          </View>
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
    borderBottomColor: '#2D2D38',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#23232B',
    borderRadius: 20,
  },
  title: { color: '#FFF', fontSize: 20, fontWeight: '700', flex: 1, textAlign: 'center' },
  spacer: { width: 40 },
  content: { paddingHorizontal: 14, paddingVertical: 16 },
  section: { marginBottom: 24 },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#23232B',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  notificationInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,87,34,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationTexts: { flex: 1 },
  notificationTitle: { color: '#FFF', fontSize: 14, fontWeight: '600', marginBottom: 2 },
  notificationDesc: { color: '#6B6B7B', fontSize: 12 },
  frequencyLabel: { color: '#6B6B7B', fontSize: 13, marginBottom: 12 },
  frequencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#23232B',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  frequencyOptionActive: { borderColor: '#FF5722', backgroundColor: '#23232B' },
  frequencyRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  frequencyRadioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF5722' },
  frequencyTexts: { flex: 1 },
  frequencyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  frequencyTitle: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  frequencyDesc: { color: '#6B6B7B', fontSize: 12 },
  testBtn: {
    backgroundColor: '#FF5722',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  testBtnText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  infoBox: {
    backgroundColor: '#23232B',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#FF5722',
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  infoBoldText: { color: '#FF5722', fontSize: 13, fontWeight: '700' },
  infoText: { color: '#6B6B7B', fontSize: 13, lineHeight: 18 },
  bottomSpacer: { height: 20 },
});

export default PushNotificationsManager;
