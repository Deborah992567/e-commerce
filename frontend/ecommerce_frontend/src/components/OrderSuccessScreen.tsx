import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CTAButton from './CTAButton';
import { CheckIcon, ClockIcon, MailIcon, GiftIcon } from './Icons';

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
          <View style={styles.iconCircle}>
            <CheckIcon size={48} color="#4ECDC4" />
          </View>
          <View style={styles.giftBadge}>
            <GiftIcon size={18} color="#FF5722" />
          </View>
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
            <ClockIcon size={18} color="#4ECDC4" />
            <Text style={styles.detailLabel}>Estimated Delivery</Text>
            <Text style={styles.detailValue}>3-5 Business Days</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <MailIcon size={18} color="#FF5722" />
            <Text style={styles.detailLabel}>Tracking</Text>
            <Text style={styles.detailValue}>Email updates will be sent</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <GiftIcon size={18} color="#E8C97A" />
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
    marginBottom: 28,
    position: 'relative',
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#1A2E2A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  giftBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#23232B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FF5722',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    color: '#FFFFFF',
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
    color: '#FF5722',
    fontSize: 18,
    fontWeight: '700',
  },
  detailsContainer: {
    backgroundColor: '#23232B',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 32,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    color: '#A0A0A0',
    fontSize: 14,
    marginLeft: 12,
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#2A2A35',
    marginVertical: 4,
  },
  buttonContainer: {
    width: '100%',
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
