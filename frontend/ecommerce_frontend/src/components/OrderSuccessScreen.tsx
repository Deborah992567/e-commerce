import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CTAButton from './CTAButton';
import WatermarkReceipt from './WatermarkReceipt';
import { OrderResult } from './CheckoutScreen';

interface OrderSuccessScreenProps {
  order?: OrderResult | null;
  onContinueShopping?: () => void;
  onViewOrders?: () => void;
}

const OrderSuccessScreen: React.FC<OrderSuccessScreenProps> = ({
  order,
  onContinueShopping,
  onViewOrders,
}) => {
  const insets = useSafeAreaInsets();

  const receipt = order
    ? order
    : {
        orderId: `EC-${Date.now().toString().slice(-6)}`,
        items: [],
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
        paymentMethod: 'Simulated Payment',
        customerEmail: '',
        date: new Date().toISOString(),
      };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 12 }]}>
      <View style={styles.successHeader}>
        <Text style={styles.title}>Order Placed Successfully!</Text>
        <Text style={styles.subtitle}>
          Simulated payment completed. Your receipt is below.
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <WatermarkReceipt
          orderId={receipt.orderId}
          items={receipt.items}
          subtotal={receipt.subtotal}
          shipping={receipt.shipping}
          tax={receipt.tax}
          total={receipt.total}
          customerEmail={receipt.customerEmail}
          paymentMethod={receipt.paymentMethod}
          date={new Date(receipt.date).toLocaleString()}
        />

        <View style={styles.buttonContainer}>
          <CTAButton
            title="Continue Shopping"
            onPress={onContinueShopping}
            variant="primary"
          />

          <TouchableOpacity
            onPress={onViewOrders}
            style={styles.viewOrdersBtn}
          >
            <Text style={styles.viewOrdersText}>View Order History</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D12',
  },
  successHeader: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#A0A0A0',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  viewOrdersBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#FF5722',
    borderRadius: 10,
  },
  viewOrdersText: {
    color: '#FF5722',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrderSuccessScreen;
