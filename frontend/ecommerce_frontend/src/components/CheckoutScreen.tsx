import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../contexts/CartContext';

interface CheckoutScreenProps {
  onBack?: () => void;
  onOrderSuccess?: () => void;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ onBack, onOrderSuccess }) => {
  const insets = useSafeAreaInsets();
  const { cart, totalPrice, clearCart } = useCart();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock payment methods (in real app, get from user profile)
  const paymentMethods = [
    { id: '1', type: 'credit_card', last4: '1234', brand: 'Visa' },
    { id: '2', type: 'paypal', email: 'user@example.com' },
    { id: '3', type: 'apple_pay', label: 'Apple Pay' },
  ];

  // Mock addresses (in real app, get from user profile)
  const addresses = [
    {
      id: '1',
      type: 'home',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    {
      id: '2',
      type: 'work',
      street: '456 Office Blvd',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'USA'
    }
  ];

  const shippingCost = totalPrice > 50 ? 0 : 9.99;
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + shippingCost + tax;

  const handlePlaceOrder = async () => {
    if (!selectedPaymentMethod) {
      Alert.alert('Payment Required', 'Please select a payment method');
      return;
    }

    if (!selectedAddress) {
      Alert.alert('Address Required', 'Please select a delivery address');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      onOrderSuccess?.();
    }, 2000);
  };

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cart.map((item) => (
            <View key={`${item.id}-${item.size}`} style={styles.orderItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetail}>
                  Qty: {item.quantity} • {formatCurrency(item.price)}
                </Text>
                {item.size && (
                  <Text style={styles.itemSize}>Size: {item.size}</Text>
                )}
              </View>
              <Text style={styles.itemTotal}>
                {formatCurrency(item.price * item.quantity)}
              </Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatCurrency(totalPrice)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>
              {shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>{formatCurrency(tax)}</Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatCurrency(finalTotal)}</Text>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          {addresses.map((address) => (
            <TouchableOpacity
              key={address.id}
              onPress={() => setSelectedAddress(address.id)}
              style={[
                styles.addressCard,
                selectedAddress === address.id && styles.addressCardSelected,
              ]}
            >
              <View style={styles.addressHeader}>
                <Text style={styles.addressType}>
                  {address.type === 'home' ? '🏠' : '🏢'} {address.type.toUpperCase()}
                </Text>
                {selectedAddress === address.id && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.addressText}>
                {address.street}
              </Text>
              <Text style={styles.addressText}>
                {address.city}, {address.state} {address.zipCode}
              </Text>
              <Text style={styles.addressText}>{address.country}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              onPress={() => setSelectedPaymentMethod(method.id)}
              style={[
                styles.paymentCard,
                selectedPaymentMethod === method.id && styles.paymentCardSelected,
              ]}
            >
              <View style={styles.paymentInfo}>
                <Text style={styles.paymentType}>
                  {method.type === 'credit_card' && '💳 Credit Card'}
                  {method.type === 'paypal' && '🅿️ PayPal'}
                  {method.type === 'apple_pay' && '📱 Apple Pay'}
                </Text>
                <Text style={styles.paymentDetail}>
                  {method.type === 'credit_card' && `•••• •••• •••• ${method.last4}`}
                  {method.type === 'paypal' && method.email}
                  {method.type === 'apple_pay' && method.label}
                </Text>
              </View>
              {selectedPaymentMethod === method.id && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Order Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Notes (Optional)</Text>
          <TouchableOpacity style={styles.notesInput}>
            <Text style={styles.notesPlaceholder}>
              Add any special instructions...
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 10 }]}>
        <View style={styles.orderSummary}>
          <Text style={styles.orderTotalLabel}>Total</Text>
          <Text style={styles.orderTotalValue}>{formatCurrency(finalTotal)}</Text>
        </View>

        <TouchableOpacity
          onPress={handlePlaceOrder}
          style={[
            styles.placeOrderBtn,
            (!selectedPaymentMethod || !selectedAddress) && styles.placeOrderBtnDisabled,
          ]}
          disabled={!selectedPaymentMethod || !selectedAddress || isProcessing}
        >
          <Text style={styles.placeOrderText}>
            {isProcessing ? 'Processing...' : 'Place Order'}
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2A',
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#18181F',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDetail: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 2,
  },
  itemSize: {
    color: '#E8C97A',
    fontSize: 14,
    fontWeight: '600',
  },
  itemTotal: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#1F1F2A',
    marginVertical: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  summaryValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#1F1F2A',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    color: '#E8C97A',
    fontSize: 18,
    fontWeight: '700',
  },
  addressCard: {
    backgroundColor: '#18181F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  addressCardSelected: {
    borderColor: '#E8C97A',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressType: {
    color: '#E8C97A',
    fontSize: 14,
    fontWeight: '700',
  },
  addressText: {
    color: '#C0C0C8',
    fontSize: 14,
    marginBottom: 2,
  },
  checkmark: {
    color: '#E8C97A',
    fontSize: 18,
    fontWeight: '700',
  },
  paymentCard: {
    backgroundColor: '#18181F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentCardSelected: {
    borderColor: '#E8C97A',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentType: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  paymentDetail: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  notesInput: {
    backgroundColor: '#18181F',
    borderRadius: 8,
    padding: 16,
    minHeight: 80,
    justifyContent: 'center',
  },
  notesPlaceholder: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  spacer: {
    height: 100,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0D0D12',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1F1F2A',
    gap: 12,
  },
  orderSummary: {
    flex: 1,
  },
  orderTotalLabel: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  orderTotalValue: {
    color: '#E8C97A',
    fontSize: 20,
    fontWeight: '700',
  },
  placeOrderBtn: {
    flex: 2,
    backgroundColor: '#E8C97A',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderBtnDisabled: {
    backgroundColor: '#A0A0A0',
    opacity: 0.6,
  },
  placeOrderText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default CheckoutScreen;