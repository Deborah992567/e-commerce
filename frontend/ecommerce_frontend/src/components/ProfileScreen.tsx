import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { UserIcon, PackageIcon, HeartIcon, BellIcon, UsersIcon, MailIcon, ShieldIcon, PhoneIcon, HelpIcon, ScaleIcon, LogOutIcon, CreditCardIcon, CheckIcon, TruckIcon, TagIcon, GiftIcon } from './Icons';
import AnimatedAvatar from './AnimatedAvatar';
import BouncyText from './BouncyText';

interface ProfileScreenProps {
  onBack?: () => void;
  onGoToOrderHistory?: () => void;
  onGoToWishlist?: () => void;
  onGoToNotifications?: () => void;
  onGoToReferral?: () => void;
  onGoToContact?: () => void;
  onGoToFaq?: () => void;
  onGoToTerms?: () => void;
  onLogin?: () => void;
  onSignup?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack, onGoToOrderHistory, onGoToWishlist, onGoToNotifications, onGoToReferral, onGoToContact, onGoToFaq, onGoToTerms, onLogin, onSignup }) => {
  const { user, logout } = useAuth();
  const insets = useSafeAreaInsets();
  const [deliveryAddress, setDeliveryAddress] = useState({ street: '123 Main Street', city: 'New York', state: 'NY', zipCode: '10001', country: 'USA' });
  const [notifications, setNotifications] = useState({ orderUpdates: true, promotions: false, newArrivals: true, securityAlerts: true });
  const [totalOrders, setTotalOrders] = useState<number | null>(null);

  useEffect(() => {
    if (!user) return;
    let active = true;
    api
      .get<{ TOTAL?: number }>('/orders/summary')
      .then((data) => {
        if (active && data && typeof data.TOTAL === 'number') setTotalOrders(data.TOTAL);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [user]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout }
    ]);
  };

  if (!user) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Account</Text>
          <View style={{ width: 32 }} />
        </View>
        <View style={styles.guestContainer}>
          <AnimatedAvatar size={72} borderColor="#FF5722" />
          <Text style={styles.guestTitle}>Welcome to Dez Collection</Text>
          <Text style={styles.guestSubtitle}>
            Sign in to view your orders, wishlist and manage your profile.
          </Text>
          <TouchableOpacity style={styles.guestLoginBtn} onPress={onLogin}>
            <Text style={styles.guestLoginText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.guestSignupBtn} onPress={onSignup}>
            <Text style={styles.guestSignupText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <View style={styles.header}>
        <BouncyText style={styles.title}>Account</BouncyText>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.userInfo}>
            <AnimatedAvatar size={56} borderColor="#FF5722" />
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user?.email.split('@')[0]}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              <Text style={styles.userRole}>{user?.role === 'admin' ? 'Administrator' : 'Customer'}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onGoToOrderHistory} style={styles.orderHistoryBtn}>
            <View style={styles.orderHistoryRow}>
              <View style={styles.orderHistoryLeft}>
                <PackageIcon size={18} color="#0D0D12" />
                <Text style={styles.orderHistoryBtnText}>View Order History</Text>
              </View>
              {totalOrders !== null && (
                <View style={styles.orderCountBadge}>
                  <Text style={styles.orderCountText}>{totalOrders}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity onPress={onGoToWishlist} style={styles.quickActionBtn}>
              <HeartIcon size={18} color="#FF2D55" />
              <Text style={styles.quickActionBtnText}>Wishlist</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onGoToNotifications} style={styles.quickActionBtn}>
              <BellIcon size={18} color="#4ECDC4" />
              <Text style={styles.quickActionBtnText}>Notifications</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onGoToReferral} style={styles.referralBtn}>
            <View style={styles.referralRow}>
              <UsersIcon size={18} color="#0D0D12" />
              <Text style={styles.referralBtnText}>Refer & Earn</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <TruckIcon size={18} color="#4ECDC4" />
            <Text style={styles.sectionTitle}>Delivery Address</Text>
          </View>
          <View style={styles.inputGroup}>
            <TextInput style={styles.input} value={deliveryAddress.street} onChangeText={(text) => setDeliveryAddress({...deliveryAddress, street: text})} placeholder="Street Address" placeholderTextColor="#888" />
            <TextInput style={styles.input} value={deliveryAddress.city} onChangeText={(text) => setDeliveryAddress({...deliveryAddress, city: text})} placeholder="City" placeholderTextColor="#888" />
            <View style={styles.row}>
              <TextInput style={[styles.input, { flex: 1, marginRight: 8 }]} value={deliveryAddress.state} onChangeText={(text) => setDeliveryAddress({...deliveryAddress, state: text})} placeholder="State" placeholderTextColor="#888" />
              <TextInput style={[styles.input, { flex: 1, marginLeft: 8 }]} value={deliveryAddress.zipCode} onChangeText={(text) => setDeliveryAddress({...deliveryAddress, zipCode: text})} placeholder="ZIP" placeholderTextColor="#888" keyboardType="numeric" />
            </View>
            <TextInput style={styles.input} value={deliveryAddress.country} onChangeText={(text) => setDeliveryAddress({...deliveryAddress, country: text})} placeholder="Country" placeholderTextColor="#888" />
          </View>
          <TouchableOpacity style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Save Address</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <CreditCardIcon size={18} color="#FFD700" />
            <Text style={styles.sectionTitle}>Payment Methods</Text>
          </View>
          <View style={styles.paymentCard}>
            <CreditCardIcon size={20} color="#FFD700" />
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentType}>Credit Card</Text>
              <Text style={styles.paymentDetail}>•••• •••• •••• 1234</Text>
            </View>
            <View style={styles.defaultBadge}><Text style={styles.defaultBadgeText}>Default</Text></View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <BellIcon size={18} color="#4ECDC4" />
            <Text style={styles.sectionTitle}>Notification Preferences</Text>
          </View>
          <View style={styles.notificationGroup}>
            {[
              { key: 'orderUpdates', label: 'Order Updates', icon: <PackageIcon size={18} color="#E8C97A" /> },
              { key: 'promotions', label: 'Promotions & Offers', icon: <TagIcon size={18} color="#FF5722" /> },
              { key: 'newArrivals', label: 'New Arrivals', icon: <GiftIcon size={18} color="#4ECDC4" /> },
              { key: 'securityAlerts', label: 'Security Alerts', icon: <ShieldIcon size={18} color="#4ECDC4" /> },
            ].map((item) => (
              <TouchableOpacity key={item.key} style={styles.notificationItem} onPress={() => setNotifications({...notifications, [item.key]: !(notifications as any)[item.key]})}>
                <View style={styles.notificationContent}>
                  {item.icon}
                  <Text style={styles.notificationText}>{item.label}</Text>
                </View>
                {(notifications as any)[item.key] ? <CheckIcon size={18} color="#FF5722" /> : <View style={styles.emptyCheck} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <HelpIcon size={18} color="#A78BFA" />
            <Text style={styles.sectionTitle}>Help & Support</Text>
          </View>
          {[
            { label: 'Contact Us', icon: <PhoneIcon size={18} color="#A0A0A0" />, onPress: onGoToContact },
            { label: 'FAQ', icon: <HelpIcon size={18} color="#A78BFA" />, onPress: onGoToFaq },
            { label: 'Terms & Conditions', icon: <ScaleIcon size={18} color="#A0A0A0" />, onPress: onGoToTerms },
          ].map((item) => (
            <TouchableOpacity key={item.label} style={styles.helpItem} onPress={item.onPress}>
              {item.icon}
              <Text style={styles.helpItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <LogOutIcon size={20} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D12' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, marginBottom: 20 },
  title: { color: '#FFF', fontSize: 22, fontWeight: '700' },
  scrollContainer: { flex: 1, paddingHorizontal: 14 },
  section: { marginBottom: 24 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '600' },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  userInfo: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#18181F', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#2D2D38' },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#1F1F2A', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  userDetails: { flex: 1 },
  userName: { color: '#FFF', fontSize: 18, fontWeight: '600', marginBottom: 4 },
  userEmail: { color: '#A0A0A0', fontSize: 14, marginBottom: 2 },
  userRole: { color: '#FF5722', fontSize: 12, fontWeight: '500' },
  orderHistoryBtn: { marginTop: 12, backgroundColor: '#FF5722', paddingVertical: 12, borderRadius: 10, paddingHorizontal: 14 },
  orderHistoryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  orderHistoryLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  orderCountBadge: { backgroundColor: '#0D0D12', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  orderCountText: { color: '#FF5722', fontSize: 13, fontWeight: '700' },
  orderHistoryBtnText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  quickActionsRow: { flexDirection: 'row', marginTop: 12, gap: 12 },
  quickActionBtn: { flex: 1, backgroundColor: '#18181F', paddingVertical: 12, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#2D2D38', flexDirection: 'row', justifyContent: 'center', gap: 6 },
  quickActionBtnText: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  referralBtn: { marginTop: 12, backgroundColor: '#4ECDC4', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  referralRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  referralBtnText: { color: '#0D0D12', fontSize: 14, fontWeight: '700' },
  inputGroup: { marginBottom: 16 },
  input: { backgroundColor: '#23232B', color: '#FFF', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 8, borderWidth: 1, borderColor: '#2D2D38' },
  row: { flexDirection: 'row' },
  saveBtn: { backgroundColor: '#FF5722', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  saveBtnText: { color: '#FFF', fontWeight: '600', fontSize: 14 },
  paymentCard: { backgroundColor: '#18181F', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: '#2D2D38' },
  paymentInfo: { flex: 1 },
  paymentType: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  paymentDetail: { color: '#A0A0A0', fontSize: 14 },
  defaultBadge: { backgroundColor: '#FF572220', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  defaultBadgeText: { color: '#FF5722', fontSize: 11, fontWeight: '600' },
  notificationGroup: { gap: 8 },
  notificationItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 16, backgroundColor: '#18181F', borderRadius: 10, borderWidth: 1, borderColor: '#2D2D38' },
  notificationContent: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  notificationText: { color: '#FFF', fontSize: 15 },
  emptyCheck: { width: 18, height: 18, borderRadius: 4, borderWidth: 2, borderColor: '#3D3D48' },
  helpItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, backgroundColor: '#18181F', borderRadius: 10, marginBottom: 8, gap: 10, borderWidth: 1, borderColor: '#2D2D38' },
  helpItemText: { color: '#FFF', fontSize: 15, fontWeight: '500' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#18181F', borderRadius: 10, gap: 10, borderWidth: 1, borderColor: '#FF6B6B40' },
  logoutText: { color: '#FF6B6B', fontSize: 16, fontWeight: '600' },
  guestContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 36, paddingBottom: 80 },
  guestTitle: { color: '#FFF', fontSize: 22, fontWeight: '800', marginTop: 20, textAlign: 'center' },
  guestSubtitle: { color: '#A0A0A0', fontSize: 15, textAlign: 'center', marginTop: 10, lineHeight: 22, marginBottom: 28 },
  guestLoginBtn: { width: '100%', backgroundColor: '#FF5722', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12 },
  guestLoginText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  guestSignupBtn: { width: '100%', backgroundColor: '#23232B', paddingVertical: 16, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#FF5722' },
  guestSignupText: { color: '#FF5722', fontSize: 16, fontWeight: '700' },
});

export default ProfileScreen;
