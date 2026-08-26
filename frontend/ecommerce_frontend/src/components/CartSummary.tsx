import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TruckIcon, TagIcon } from './Icons';
import ProgressBar from './ProgressBar';
import CounterAnimation from './CounterAnimation';

interface CartSummaryProps {
  subtotal: number;
  shippingCost: number;
  discount: number;
  freeShippingThreshold?: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shippingCost,
  discount,
  freeShippingThreshold = 50000,
}) => {
  const total = subtotal - discount + shippingCost;
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remaining = Math.max(freeShippingThreshold - subtotal, 0);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>₦{subtotal.toLocaleString()}</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.rowLeft}>
          <TruckIcon size={16} color={shippingCost === 0 ? '#4ECDC4' : '#FF5722'} />
          <Text style={styles.label}>Shipping</Text>
        </View>
        <Text style={[styles.value, shippingCost === 0 && styles.freeShipping]}>
          {shippingCost === 0 ? 'Free' : `₦${shippingCost.toLocaleString()}`}
        </Text>
      </View>

      {discount > 0 && (
        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <TagIcon size={16} color="#4ECDC4" />
            <Text style={styles.discountLabel}>Discount</Text>
          </View>
          <Text style={styles.discountValue}>-₦{discount.toLocaleString()}</Text>
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.row}>
        <Text style={styles.totalLabel}>Total</Text>
        <CounterAnimation
          to={total}
          prefix="₦"
          duration={800}
          style={styles.totalValue}
        />
      </View>

      {subtotal < freeShippingThreshold && (
        <View style={styles.shippingProgress}>
          <Text style={styles.shippingHint}>
            Add ₦{remaining.toLocaleString()} more for free shipping
          </Text>
          <ProgressBar
            progress={progress}
            color={progress >= 100 ? '#4ECDC4' : '#FF5722'}
            height={6}
          />
        </View>
      )}

      {subtotal >= freeShippingThreshold && (
        <View style={styles.freeShippingBanner}>
          <TruckIcon size={14} color="#4ECDC4" />
          <Text style={styles.freeShippingText}>You've unlocked free shipping!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#23232B',
    borderRadius: 16,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  freeShipping: {
    color: '#4ECDC4',
  },
  discountLabel: {
    color: '#4ECDC4',
    fontSize: 14,
  },
  discountValue: {
    color: '#4ECDC4',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#3A3A45',
    marginVertical: 8,
  },
  totalLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    color: '#FF5722',
    fontSize: 22,
    fontWeight: '800',
  },
  shippingProgress: {
    marginTop: 16,
    gap: 8,
  },
  shippingHint: {
    color: '#A0A0A0',
    fontSize: 12,
  },
  freeShippingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    padding: 12,
    borderRadius: 10,
  },
  freeShippingText: {
    color: '#4ECDC4',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default CartSummary;
