import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import CTAButton from './CTAButton';

interface ProfileScreenProps {
  onBack?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack }) => {
  const { user, logout } = useAuth();
  const insets = useSafeAreaInsets();

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  });

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'credit_card',
      cardNumber: '**** **** **** 1234',
      expiryDate: '12/26',
      cardholderName: 'John Doe',
      isDefault: true
    },
    {
      id: 2,
      type: 'paypal',
      email: 'john.doe@email.com',
      isDefault: false
    }
  ]);

  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'credit_card',
    cardNumber: '',
    expiryDate: '',
    cardholderName: '',
    email: ''
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newArrivals: true,
    securityAlerts: true
  });

  const handleSaveAddress = () => {
    Alert.alert('Success', 'Delivery address updated successfully!');
  };

  const handleSavePayment = () => {
    Alert.alert('Success', 'Payment method updated successfully!');
  };

  const handleSaveNotifications = () => {
    Alert.alert('Success', 'Notification preferences updated!');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.emojiBtn}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Profile Settings</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* User Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>👤</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user?.email.split('@')[0]}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              <Text style={styles.userRole}>{user?.role === 'admin' ? 'Administrator' : 'Customer'}</Text>
            </View>
          </View>
        </View>

        {/* Delivery Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              value={deliveryAddress.street}
              onChangeText={(text) => setDeliveryAddress({...deliveryAddress, street: text})}
              placeholder="Street Address"
              placeholderTextColor="#888"
            />
            <TextInput
              style={styles.input}
              value={deliveryAddress.city}
              onChangeText={(text) => setDeliveryAddress({...deliveryAddress, city: text})}
              placeholder="City"
              placeholderTextColor="#888"
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 1, marginRight: 8 }]}
                value={deliveryAddress.state}
                onChangeText={(text) => setDeliveryAddress({...deliveryAddress, state: text})}
                placeholder="State"
                placeholderTextColor="#888"
              />
              <TextInput
                style={[styles.input, { flex: 1, marginLeft: 8 }]}
                value={deliveryAddress.zipCode}
                onChangeText={(text) => setDeliveryAddress({...deliveryAddress, zipCode: text})}
                placeholder="ZIP Code"
                placeholderTextColor="#888"
                keyboardType="numeric"
              />
            </View>
            <TextInput
              style={styles.input}
              value={deliveryAddress.country}
              onChangeText={(text) => setDeliveryAddress({...deliveryAddress, country: text})}
              placeholder="Country"
              placeholderTextColor="#888"
            />
          </View>
          <CTAButton title="Save Address" onPress={handleSaveAddress} size="sm" color="#E8C97A" />
        </View>

        {/* Payment Method Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              value={paymentMethod.cardNumber}
              onChangeText={(text) => setPaymentMethod({...paymentMethod, cardNumber: text})}
              placeholder="Card Number"
              placeholderTextColor="#888"
            />
            <View style={styles.row}>
              <TextInput
                style={[styles.input, { flex: 1, marginRight: 8 }]}
                value={paymentMethod.expiryDate}
                onChangeText={(text) => setPaymentMethod({...paymentMethod, expiryDate: text})}
                placeholder="MM/YY"
                placeholderTextColor="#888"
              />
              <TextInput
                style={[styles.input, { flex: 1, marginLeft: 8 }]}
                value={paymentMethod.cardholderName}
                onChangeText={(text) => setPaymentMethod({...paymentMethod, cardholderName: text})}
                placeholder="Cardholder Name"
                placeholderTextColor="#888"
              />
            </View>
          </View>
          <CTAButton title="Save Payment Method" onPress={handleSavePayment} size="sm" color="#E8C97A" />
        </View>

        {/* Notification Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Preferences</Text>
          <View style={styles.notificationGroup}>
            <TouchableOpacity
              style={styles.notificationItem}
              onPress={() => setNotifications({...notifications, orderUpdates: !notifications.orderUpdates})}
            >
              <View style={styles.notificationContent}>
                <Text style={styles.emojiIcon}>📦</Text>
                <Text style={styles.notificationText}>Order Updates</Text>
              </View>
              <Text style={styles.checkboxEmoji}>
                {notifications.orderUpdates ? '☑️' : '⬜'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.notificationItem}
              onPress={() => setNotifications({...notifications, promotions: !notifications.promotions})}
            >
              <View style={styles.notificationContent}>
                <Text style={styles.emojiIcon}>🏷️</Text>
                <Text style={styles.notificationText}>Promotions & Offers</Text>
              </View>
              <Text style={styles.checkboxEmoji}>
                {notifications.promotions ? '☑️' : '⬜'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.notificationItem}
              onPress={() => setNotifications({...notifications, newArrivals: !notifications.newArrivals})}
            >
              <View style={styles.notificationContent}>
                <Text style={styles.emojiIcon}>🛍️</Text>
                <Text style={styles.notificationText}>New Arrivals</Text>
              </View>
              <Text style={styles.checkboxEmoji}>
                {notifications.newArrivals ? '☑️' : '⬜'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.notificationItem}
              onPress={() => setNotifications({...notifications, securityAlerts: !notifications.securityAlerts})}
            >
              <View style={styles.notificationContent}>
                <Text style={styles.emojiIcon}>🛡️</Text>
                <Text style={styles.notificationText}>Security Alerts</Text>
              </View>
              <Text style={styles.checkboxEmoji}>
                {notifications.securityAlerts ? '☑️' : '⬜'}
              </Text>
            </TouchableOpacity>
          </View>
          <CTAButton title="Save Preferences" onPress={handleSaveNotifications} size="sm" color="#E8C97A" />
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Actions</Text>
          <TouchableOpacity style={styles.actionButton} onPress={handleLogout}>
            <Text style={styles.emojiIcon}>🚪</Text>
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
  backBtn: { padding: 8 },
  emojiBtn: { fontSize: 20, color: '#E8C97A' },
  title: { color: '#FFF', fontSize: 20, fontWeight: '700' },
  scrollContainer: { flex: 1, paddingHorizontal: 14 },
  section: { marginBottom: 24 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '600', marginBottom: 16 },
  userInfo: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#18181F', padding: 16, borderRadius: 12 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#1F1F2A', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  avatarEmoji: { fontSize: 30 },
  userDetails: { flex: 1 },
  userName: { color: '#FFF', fontSize: 18, fontWeight: '600', marginBottom: 4 },
  userEmail: { color: '#A0A0A0', fontSize: 14, marginBottom: 2 },
  userRole: { color: '#E8C97A', fontSize: 12, fontWeight: '500' },
  inputGroup: { marginBottom: 16 },
  input: { backgroundColor: '#23232B', color: '#FFF', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12, marginBottom: 8, borderWidth: 1, borderColor: '#444' },
  row: { flexDirection: 'row' },
  notificationGroup: { marginBottom: 16 },
  notificationItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#18181F', borderRadius: 8, marginBottom: 8 },
  notificationContent: { flexDirection: 'row', alignItems: 'center' },
  emojiIcon: { fontSize: 20, marginRight: 12 },
  notificationText: { color: '#FFF', fontSize: 16 },
  checkboxEmoji: { fontSize: 18 },
  actionButton: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#18181F', borderRadius: 8 },
  logoutText: { color: '#FF6B6B', fontSize: 16, fontWeight: '600', marginLeft: 12 },
});

export default ProfileScreen;