import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, Animated, Easing, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../contexts/CartContext';
import { ChevronLeftIcon, CheckIcon, CreditCardIcon, WalletIcon } from './Icons';

export interface OrderResult {
  orderId: string;
  items: { name: string; quantity: number; unitPrice: number; size?: string | null }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: string;
  customerEmail: string;
  date: string;
}

interface CheckoutScreenProps {
  onBack?: () => void;
  onOrderSuccess?: (order: OrderResult) => void;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ onBack, onOrderSuccess }) => {
  const insets = useSafeAreaInsets();
  const { cart, totalPrice, clearCart } = useCart();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [processingMessage, setProcessingMessage] = useState('Contacting payment gateway...');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [fadeAnim]);

  const paymentMethods = [
    { id: '1', type: 'credit_card', last4: '1234', brand: 'Visa' },
    { id: '2', type: 'paypal', email: 'user@example.com' },
    { id: '3', type: 'apple_pay', label: 'Apple Pay' },
  ];

  const addresses = [
    { id: '1', type: 'home', street: '123 Main Street', city: 'New York', state: 'NY', zipCode: '10001', country: 'USA' },
    { id: '2', type: 'work', street: '456 Office Blvd', city: 'New York', state: 'NY', zipCode: '10002', country: 'USA' },
  ];

  const shippingCost = totalPrice > 50 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shippingCost + tax;

  const validateCard = () => {
    const digitsOnly = cardNumber.replace(/\s/g, '');
    if (!digitsOnly) return false;
    if (digitsOnly.length < 12) return false;
    if (!/^\d{4}\/\d{2}$/.test(cardExpiry)) return false;
    if (cardCvc.length < 3) return false;
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!selectedPaymentMethod) { Alert.alert('Payment Required', 'Please select a payment method'); return; }
    if (!selectedAddress) { Alert.alert('Address Required', 'Please select a delivery address'); return; }
    if (selectedPaymentMethod === '1' && !validateCard()) {
      Alert.alert('Card Details', 'Please enter valid card details (number, MM/YY expiry, CVC)');
      return;
    }
    setIsProcessing(true);
    setProcessingMessage('Contacting payment gateway...');
    await new Promise<void>((r) => setTimeout(() => r(), 900));
    setProcessingMessage('Authorizing your payment...');
    await new Promise<void>((r) => setTimeout(() => r(), 900));
    setProcessingMessage('Payment successful!');
    await new Promise<void>((r) => setTimeout(() => r(), 600));
    setIsProcessing(false);

    const selectedMethod = paymentMethods.find((m) => m.id === selectedPaymentMethod);
    const paymentName =
      selectedMethod?.type === 'credit_card' ? `Credit Card •••• ${selectedMethod.last4}`
      : selectedMethod?.type === 'paypal' ? 'PayPal'
      : selectedMethod?.type === 'apple_pay' ? 'Apple Pay'
      : 'Payment';

    const orderId = `EC-${Date.now().toString().slice(-6)}`;
    const result: OrderResult = {
      orderId,
      items: cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        size: item.size,
      })),
      subtotal: totalPrice,
      shipping: shippingCost,
      tax,
      total: finalTotal,
      paymentMethod: paymentName,
      customerEmail: '',
      date: new Date().toISOString(),
    };

    clearCart();
    onOrderSuccess?.(result);
  };

  const formatCurrency = (value: number) => `₦${value.toFixed(2)}`;

  const formatCardNumber = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  return (
    <Animated.View style={[styles.container, { paddingTop: insets.top + 10, opacity: fadeAnim }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <ChevronLeftIcon size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {cart.map((item) => (
            <View key={`${item.id}-${item.size}`} style={styles.orderItem}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetail}>Qty: {item.quantity} • {formatCurrency(item.price)}</Text>
                {item.size && <Text style={styles.itemSize}>Size: {item.size}</Text>}
              </View>
              <Text style={styles.itemTotal}>{formatCurrency(item.price * item.quantity)}</Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Subtotal</Text><Text style={styles.summaryValue}>{formatCurrency(totalPrice)}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Shipping</Text><Text style={[styles.summaryValue, shippingCost === 0 && { color: '#4CAF50' }]}>{shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}</Text></View>
          <View style={styles.summaryRow}><Text style={styles.summaryLabel}>Tax</Text><Text style={styles.summaryValue}>{formatCurrency(tax)}</Text></View>
          <View style={[styles.summaryRow, styles.totalRow]}><Text style={styles.totalLabel}>Total</Text><Text style={styles.totalValue}>{formatCurrency(finalTotal)}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          {addresses.map((address) => (
            <TouchableOpacity key={address.id} onPress={() => setSelectedAddress(address.id)} style={[styles.addressCard, selectedAddress === address.id && styles.addressCardSelected]}>
              <View style={styles.addressHeader}>
                <Text style={styles.addressType}>{address.type.toUpperCase()}</Text>
                {selectedAddress === address.id && <CheckIcon size={18} color="#FF5722" />}
              </View>
              <Text style={styles.addressText}>{address.street}</Text>
              <Text style={styles.addressText}>{address.city}, {address.state} {address.zipCode}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity key={method.id} onPress={() => setSelectedPaymentMethod(method.id)} style={[styles.paymentCard, selectedPaymentMethod === method.id && styles.paymentCardSelected]}>
              <View style={styles.paymentInfo}>
                <View style={styles.paymentTypeRow}>
                  {method.type === 'credit_card' && <CreditCardIcon size={20} />}
                  {method.type === 'paypal' && <WalletIcon size={20} color="#4ECDC4" />}
                  {method.type === 'apple_pay' && <CreditCardIcon size={20} color="#A0A0A0" />}
                  <Text style={styles.paymentType}>
                    {method.type === 'credit_card' && 'Credit Card'}
                    {method.type === 'paypal' && 'PayPal'}
                    {method.type === 'apple_pay' && 'Apple Pay'}
                  </Text>
                </View>
                <Text style={styles.paymentDetail}>
                  {method.type === 'credit_card' && `•••• •••• •••• ${method.last4}`}
                  {method.type === 'paypal' && method.email}
                  {method.type === 'apple_pay' && method.label}
                </Text>
              </View>
              {selectedPaymentMethod === method.id && <CheckIcon size={18} color="#FF5722" />}
            </TouchableOpacity>
          ))}

          {selectedPaymentMethod === '1' && (
            <View style={styles.cardForm}>
              <Text style={styles.cardFormTitle}>Enter Card Details</Text>
              <TextInput
                style={styles.cardInput}
                value={cardNumber}
                onChangeText={(t) => setCardNumber(formatCardNumber(t))}
                placeholder="Card Number"
                placeholderTextColor="#A0A0A0"
                keyboardType="number-pad"
              />
              <TextInput
                style={styles.cardInput}
                value={cardName}
                onChangeText={setCardName}
                placeholder="Cardholder Name"
                placeholderTextColor="#A0A0A0"
                autoCapitalize="words"
              />
              <View style={styles.cardRow}>
                <TextInput
                  style={[styles.cardInput, styles.cardInputHalf]}
                  value={cardExpiry}
                  onChangeText={(t) => setCardExpiry(t)}
                  placeholder="MM/YY"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="number-pad"
                  maxLength={5}
                />
                <TextInput
                  style={[styles.cardInput, styles.cardInputHalf]}
                  value={cardCvc}
                  onChangeText={(t) => setCardCvc(t.replace(/\D/g, '').slice(0, 3))}
                  placeholder="CVC"
                  placeholderTextColor="#A0A0A0"
                  keyboardType="number-pad"
                  secureTextEntry
                />
              </View>
              <Text style={styles.cardNote}>Simulated payment — no real card is charged.</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Notes (Optional)</Text>
          <TextInput style={styles.notesInput} value={orderNotes} onChangeText={setOrderNotes} placeholder="Add any special instructions..." placeholderTextColor="#A0A0A0" multiline numberOfLines={3} textAlignVertical="top" />
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 10 }]}>
        <View style={styles.orderSummary}>
          <Text style={styles.orderTotalLabel}>Total</Text>
          <Text style={styles.orderTotalValue}>{formatCurrency(finalTotal)}</Text>
        </View>
        <TouchableOpacity onPress={handlePlaceOrder} style={[styles.placeOrderBtn, (!selectedPaymentMethod || !selectedAddress) && styles.placeOrderBtnDisabled]} disabled={!selectedPaymentMethod || !selectedAddress || isProcessing}>
          <Text style={styles.placeOrderText}>{isProcessing ? 'Processing...' : 'Place Order'}</Text>
        </TouchableOpacity>
      </View>

      {isProcessing && (
        <View style={styles.processingOverlay}>
          <View style={styles.processingBox}>
            <ActivityIndicator size="large" color="#FF5722" />
            <Text style={styles.processingTitle}>Processing Payment</Text>
            <Text style={styles.processingMessage}>{processingMessage}</Text>
            <Text style={styles.processingAmount}>{formatCurrency(finalTotal)}</Text>
          </View>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D12' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1F1F2A' },
  backBtn: { padding: 8 },
  title: { color: '#FFF', fontSize: 18, fontWeight: '700', flex: 1, textAlign: 'center' },
  headerSpacer: { width: 40 },
  content: { paddingHorizontal: 14, paddingTop: 16 },
  section: { marginBottom: 24, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#1F1F2A' },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '700', marginBottom: 16 },
  orderItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#18181F' },
  itemInfo: { flex: 1 },
  itemName: { color: '#FFF', fontSize: 16, fontWeight: '600', marginBottom: 4 },
  itemDetail: { color: '#A0A0A0', fontSize: 14, marginBottom: 2 },
  itemSize: { color: '#FF5722', fontSize: 14, fontWeight: '600' },
  itemTotal: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#1F1F2A', marginVertical: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  summaryLabel: { color: '#A0A0A0', fontSize: 14 },
  summaryValue: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#1F1F2A', paddingTop: 12, marginTop: 8 },
  totalLabel: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  totalValue: { color: '#FF5722', fontSize: 18, fontWeight: '700' },
  addressCard: { backgroundColor: '#18181F', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 2, borderColor: 'transparent' },
  addressCardSelected: { borderColor: '#FF5722' },
  addressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  addressType: { color: '#FF5722', fontSize: 14, fontWeight: '700' },
  addressText: { color: '#C0C0C8', fontSize: 14, marginBottom: 2 },
  paymentCard: { backgroundColor: '#18181F', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 2, borderColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  paymentCardSelected: { borderColor: '#FF5722' },
  paymentInfo: { flex: 1, gap: 4 },
  paymentTypeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  paymentType: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  paymentDetail: { color: '#A0A0A0', fontSize: 14 },
  notesInput: { backgroundColor: '#18181F', borderRadius: 8, padding: 16, minHeight: 80, color: '#FFF' },
  spacer: { height: 100 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#0D0D12', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#1F1F2A', gap: 12 },
  orderSummary: { flex: 1 },
  orderTotalLabel: { color: '#A0A0A0', fontSize: 14 },
  orderTotalValue: { color: '#FF5722', fontSize: 20, fontWeight: '700' },
  placeOrderBtn: { flex: 2, backgroundColor: '#FF5722', borderRadius: 12, paddingVertical: 14, alignItems: 'center', justifyContent: 'center' },
  placeOrderBtnDisabled: { backgroundColor: '#A0A0A0', opacity: 0.6 },
  placeOrderText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  cardForm: { marginTop: 8, backgroundColor: '#18181F', borderRadius: 12, padding: 16 },
  cardFormTitle: { color: '#FFF', fontSize: 15, fontWeight: '600', marginBottom: 12 },
  cardInput: { backgroundColor: '#23232B', color: '#FFF', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, marginBottom: 10, borderWidth: 1, borderColor: '#2D2D38' },
  cardRow: { flexDirection: 'row', gap: 10 },
  cardInputHalf: { flex: 1 },
  cardNote: { color: '#A0A0A0', fontSize: 12, fontStyle: 'italic', marginTop: 4 },
  processingOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(13,13,18,0.92)', justifyContent: 'center', alignItems: 'center', zIndex: 20 },
  processingBox: { backgroundColor: '#23232B', borderRadius: 16, padding: 32, alignItems: 'center', maxWidth: 300, width: '80%' },
  processingTitle: { color: '#FFF', fontSize: 20, fontWeight: '700', marginTop: 16 },
  processingMessage: { color: '#A0A0A0', fontSize: 15, marginTop: 8, textAlign: 'center' },
  processingAmount: { color: '#FF5722', fontSize: 24, fontWeight: '700', marginTop: 16 },
});

export default CheckoutScreen;
