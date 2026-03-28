import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ShippingIndicatorProps {
  cartTotal: number;
  minimumThreshold?: number;
}

const ShippingIndicator: React.FC<ShippingIndicatorProps> = ({ cartTotal, minimumThreshold = 50 }) => {
  const remainingAmount = Math.max(0, minimumThreshold - cartTotal);
  const progressPercentage = Math.min((cartTotal / minimumThreshold) * 100, 100);
  const qualifiesForFreeShipping = cartTotal >= minimumThreshold;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🚚 Free Shipping</Text>
        {qualifiesForFreeShipping ? (
          <Text style={styles.qualifiedText}>✓ You qualify!</Text>
        ) : (
          <Text style={styles.remainingText}>Add ${remainingAmount.toFixed(2)} more</Text>
        )}
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.cartTotalLabel}>Cart Total</Text>
        <Text style={styles.cartTotalAmount}>${cartTotal.toFixed(2)}</Text>
        <Text style={styles.threshold}>of ${minimumThreshold}</Text>
      </View>

      {qualifiesForFreeShipping && (
        <View style={styles.badge}>
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
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  qualifiedText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  remainingText: {
    fontSize: 12,
    color: '#E8C97A',
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
    backgroundColor: '#E8C97A',
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
  },
  badgeText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default ShippingIndicator;