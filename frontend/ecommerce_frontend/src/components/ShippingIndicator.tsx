import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { TruckIcon, CheckIcon } from './Icons';

interface ShippingIndicatorProps {
  cartTotal: number;
  minimumThreshold?: number;
}

const ShippingIndicator: React.FC<ShippingIndicatorProps> = ({ cartTotal, minimumThreshold = 50 }) => {
  const remainingAmount = Math.max(0, minimumThreshold - cartTotal);
  const progressPercentage = Math.min((cartTotal / minimumThreshold) * 100, 100);
  const qualifiesForFreeShipping = cartTotal >= minimumThreshold;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progressPercentage,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progressAnim, progressPercentage]);

  const animatedWidth = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <TruckIcon size={18} color="#4CAF50" />
          <Text style={styles.title}>Free Shipping</Text>
        </View>
        {qualifiesForFreeShipping ? (
          <View style={styles.qualifiedRow}>
            <CheckIcon size={14} color="#4CAF50" />
            <Text style={styles.qualifiedText}>You qualify!</Text>
          </View>
        ) : (
          <Text style={styles.remainingText}>Add ${remainingAmount.toFixed(2)} more</Text>
        )}
      </View>

      <View style={styles.progressBar}>
        <Animated.View style={[styles.progressFill, { width: animatedWidth }]} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.cartTotalLabel}>Cart Total</Text>
        <Text style={styles.cartTotalAmount}>${cartTotal.toFixed(2)}</Text>
        <Text style={styles.threshold}>of ${minimumThreshold}</Text>
      </View>

      {qualifiesForFreeShipping && (
        <View style={styles.badge}>
          <TruckIcon size={14} color="#4CAF50" />
          <Text style={styles.badgeText}>Free Shipping Applied</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23232B',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  qualifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  qualifiedText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  remainingText: {
    fontSize: 12,
    color: '#FF5722',
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#1A1A1F',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF5722',
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartTotalLabel: {
    fontSize: 11,
    color: '#A0A0A0',
  },
  cartTotalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  threshold: {
    fontSize: 11,
    color: '#A0A0A0',
  },
  badge: {
    marginTop: 12,
    backgroundColor: '#4CAF5020',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#4CAF50',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default ShippingIndicator;
