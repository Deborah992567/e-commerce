import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CTAButton from './CTAButton';

interface OrderSuccessScreenProps {
  onContinueShopping?: () => void;
  onViewOrders?: () => void;
}

const OrderSuccessScreen: React.FC<OrderSuccessScreenProps> = ({
  onContinueShopping,
  onViewOrders,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.successIcon}>🎉</Text>
        </View>

        {/* Success Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.title}>Order Placed Successfully!</Text>
          <Text style={styles.subtitle}>
            Your order has been confirmed and is being processed.
          </Text>
          <Text style={styles.orderNumber}>
            Order #EC-{Date.now().toString().slice(-6)}
          </Text>
        </View>

        {/* Order Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Estimated Delivery</Text>
            <Text style={styles.detailValue}>3-5 Business Days</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tracking</Text>
            <Text style={styles.detailValue}>Email updates will be sent</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Support</Text>
            <Text style={styles.detailValue}>support@ecommerce.com</Text>
          </View>
        </View>

        {/* Action Buttons */}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D12',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 24,
  },
  successIcon: {
    fontSize: 80,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#A0A0A0',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  orderNumber: {
    color: '#E8C97A',
    fontSize: 18,
    fontWeight: '700',
  },
  detailsContainer: {
    backgroundColor: '#18181F',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 32,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  detailValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  viewOrdersBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E8C97A',
    borderRadius: 10,
  },
  viewOrdersText: {
    color: '#E8C97A',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrderSuccessScreen;