import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';
import CTAButton from './CTAButton';
import GamificationPanel from './GamificationPanel';
import SpinToWin from './SpinToWin';

interface ProfileScreenProps {
  onBack?: () => void;
  onGoToOrderHistory?: () => void;
  onGoToWishlist?: () => void;
  onGoToNotifications?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack, onGoToOrderHistory, onGoToWishlist, onGoToNotifications }) => {
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

  const addPaymentMethod = () => {
    if (newPaymentMethod.type === 'paypal' && !newPaymentMethod.email) {
      Alert.alert('Error', 'Please enter your PayPal email');
      return;
    }
    if (newPaymentMethod.type !== 'paypal' && (!newPaymentMethod.cardNumber || !newPaymentMethod.expiryDate || !newPaymentMethod.cardholderName)) {
      Alert.alert('Error', 'Please fill in all card details');
      return;
    }

    const newMethod: any = {
      id: Date.now(),
      type: newPaymentMethod.type,
      isDefault: paymentMethods.length === 0 // First payment method is default
    };

    if (newPaymentMethod.type === 'paypal') {
      newMethod.email = newPaymentMethod.email;
    } else {
      newMethod.cardNumber = newPaymentMethod.cardNumber;
      newMethod.expiryDate = newPaymentMethod.expiryDate;
      newMethod.cardholderName = newPaymentMethod.cardholderName;
    }

    setPaymentMethods([...paymentMethods, newMethod]);
    setNewPaymentMethod({
      type: 'credit_card',
      cardNumber: '',
      expiryDate: '',
      cardholderName: '',
      email: ''
    });
    setShowAddPayment(false);
    Alert.alert('Success', 'Payment method added successfully!');
  };

  const removePaymentMethod = (id: number) => {
    Alert.alert(
      'Remove Payment Method',
      'Are you sure you want to remove this payment method?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setPaymentMethods(paymentMethods.filter(method => method.id !== id));
          }
        }
      ]
    );
  };

  const setDefaultPaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    Alert.alert('Success', 'Default payment method updated!');
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
          <TouchableOpacity onPress={onGoToOrderHistory} style={styles.orderHistoryBtn}>
            <Text style={styles.orderHistoryBtnText}>📦 View Order History</Text>
          </TouchableOpacity>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity onPress={onGoToWishlist} style={styles.quickActionBtn}>
              <Text style={styles.quickActionBtnText}>❤️ Wishlist</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onGoToNotifications} style={styles.quickActionBtn}>
              <Text style={styles.quickActionBtnText}>🔔 Notifications</Text>
            </TouchableOpacity>
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

        {/* Payment Methods Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            <TouchableOpacity onPress={() => setShowAddPayment(!showAddPayment)}>
              <Text style={styles.addButton}>+ Add</Text>
            </TouchableOpacity>
          </View>

          {/* Existing Payment Methods */}
          {paymentMethods.map((method) => (
            <View key={method.id} style={styles.paymentCard}>
              <View style={styles.paymentInfo}>
                <View style={styles.paymentTypeRow}>
                  <Text style={styles.paymentType}>
                    {method.type === 'credit_card' && '💳 Credit Card'}
                    {method.type === 'debit_card' && '💳 Debit Card'}
                    {method.type === 'paypal' && '🅿️ PayPal'}
                    {method.type === 'apple_pay' && '📱 Apple Pay'}
                    {method.type === 'google_pay' && '🎯 Google Pay'}
                  </Text>
                  {method.isDefault && <Text style={styles.defaultBadge}>Default</Text>}
                </View>

                {method.type === 'paypal' ? (
                  <Text style={styles.paymentDetail}>{method.email}</Text>
                ) : (
                  <View>
                    <Text style={styles.paymentDetail}>•••• •••• •••• {method.cardNumber?.slice(-4)}</Text>
                    <Text style={styles.paymentDetail}>{method.cardholderName} • Expires {method.expiryDate}</Text>
                  </View>
                )}
              </View>

              <View style={styles.paymentActions}>
                {!method.isDefault && (
                  <TouchableOpacity
                    onPress={() => setDefaultPaymentMethod(method.id)}
                    style={styles.actionBtn}
                  >
                    <Text style={styles.actionText}>Set Default</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => removePaymentMethod(method.id)}
                  style={[styles.actionBtn, { backgroundColor: '#FF6B6B' }]}
                >
                  <Text style={styles.actionText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Add New Payment Method Form */}
          {showAddPayment && (
            <View style={styles.addPaymentForm}>
              <Text style={styles.formTitle}>Add New Payment Method</Text>

              <View style={styles.paymentTypeSelector}>
                {[
                  { type: 'credit_card', label: '💳 Credit Card', emoji: '💳' },
                  { type: 'debit_card', label: '💳 Debit Card', emoji: '💳' },
                  { type: 'paypal', label: '🅿️ PayPal', emoji: '🅿️' },
                  { type: 'apple_pay', label: '📱 Apple Pay', emoji: '📱' },
                  { type: 'google_pay', label: '🎯 Google Pay', emoji: '🎯' }
                ].map((option) => (
                  <TouchableOpacity
                    key={option.type}
                    style={[
                      styles.typeOption,
                      newPaymentMethod.type === option.type && styles.typeOptionSelected
                    ]}
                    onPress={() => setNewPaymentMethod({...newPaymentMethod, type: option.type})}
                  >
                    <Text style={styles.typeEmoji}>{option.emoji}</Text>
                    <Text style={[
                      styles.typeLabel,
                      newPaymentMethod.type === option.type && styles.typeLabelSelected
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {newPaymentMethod.type === 'paypal' ? (
                <TextInput
                  style={styles.input}
                  value={newPaymentMethod.email}
                  onChangeText={(text) => setNewPaymentMethod({...newPaymentMethod, email: text})}
                  placeholder="PayPal Email"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                />
              ) : (
                <View style={styles.inputGroup}>
                  <TextInput
                    style={styles.input}
                    value={newPaymentMethod.cardNumber}
                    onChangeText={(text) => setNewPaymentMethod({...newPaymentMethod, cardNumber: text})}
                    placeholder="Card Number"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                  />
                  <View style={styles.row}>
                    <TextInput
                      style={[styles.input, { flex: 1, marginRight: 8 }]}
                      value={newPaymentMethod.expiryDate}
                      onChangeText={(text) => setNewPaymentMethod({...newPaymentMethod, expiryDate: text})}
                      placeholder="MM/YY"
                      placeholderTextColor="#888"
                    />
                    <TextInput
                      style={[styles.input, { flex: 1, marginLeft: 8 }]}
                      value={newPaymentMethod.cardholderName}
                      onChangeText={(text) => setNewPaymentMethod({...newPaymentMethod, cardholderName: text})}
                      placeholder="Cardholder Name"
                      placeholderTextColor="#888"
                    />
                  </View>
                </View>
              )}

              <View style={styles.formActions}>
                <TouchableOpacity
                  onPress={() => setShowAddPayment(false)}
                  style={[styles.formBtn, styles.cancelBtn]}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={addPaymentMethod}
                  style={[styles.formBtn, styles.saveBtn]}
                >
                  <Text style={styles.saveText}>Add Payment Method</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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

        {/* Gamification Section */}
        <GamificationPanel onClaimReward={(points) => console.log('Reward claimed:', points)} />

        {/* Spin to Win Section */}
        <SpinToWin onPrizeWon={(prize) => console.log('Prize won:', prize)} />

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
  orderHistoryBtn: { marginTop: 12, backgroundColor: '#E8C97A', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  orderHistoryBtnText: { color: '#000', fontSize: 14, fontWeight: '600' },
  quickActionsRow: { flexDirection: 'row', marginTop: 12, gap: 12 },
  quickActionBtn: { flex: 1, backgroundColor: '#1F1F2A', paddingVertical: 10, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#E8C97A' },
  quickActionBtnText: { color: '#E8C97A', fontSize: 13, fontWeight: '600' },
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
  // Payment method styles
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  addButton: { color: '#E8C97A', fontSize: 16, fontWeight: '600' },
  paymentCard: { backgroundColor: '#18181F', borderRadius: 12, padding: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  paymentInfo: { flex: 1 },
  paymentTypeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  paymentType: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  defaultBadge: { color: '#E8C97A', fontSize: 12, fontWeight: '600', backgroundColor: '#1F1F2A', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  paymentDetail: { color: '#A0A0A0', fontSize: 14, marginBottom: 2 },
  paymentActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, backgroundColor: '#E8C97A' },
  actionText: { color: '#23232B', fontSize: 12, fontWeight: '600' },
  addPaymentForm: { backgroundColor: '#23232B', borderRadius: 12, padding: 16, marginTop: 16 },
  formTitle: { color: '#FFF', fontSize: 18, fontWeight: '600', marginBottom: 16 },
  paymentTypeSelector: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  typeOption: { flex: 1, minWidth: '45%', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#444', alignItems: 'center' },
  typeOptionSelected: { backgroundColor: '#E8C97A', borderColor: '#E8C97A' },
  typeEmoji: { fontSize: 20, marginBottom: 4 },
  typeLabel: { color: '#A0A0A0', fontSize: 12, textAlign: 'center' },
  typeLabelSelected: { color: '#23232B', fontWeight: '600' },
  formActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  formBtn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  cancelBtn: { backgroundColor: '#444', marginRight: 8 },
  saveBtn: { backgroundColor: '#E8C97A', marginLeft: 8 },
  cancelText: { color: '#FFF', fontWeight: '600' },
  saveText: { color: '#23232B', fontWeight: '600' },
});

export default ProfileScreen;