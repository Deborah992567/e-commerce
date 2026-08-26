import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CounterAnimation from './CounterAnimation';
import { TagIcon } from './Icons';

interface PriceComparisonProps {
  currentPrice: number;
  originalPrice: number;
}

const PriceComparison: React.FC<PriceComparisonProps> = ({ currentPrice, originalPrice }) => {
  const savings = originalPrice - currentPrice;
  const savingsPercentage = Math.round((savings / originalPrice) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.currentPriceRow}>
        <Text style={styles.currentPriceLabel}>Current Price</Text>
        <Text style={styles.currentPrice}>₦{currentPrice.toLocaleString()}</Text>
      </View>

      <View style={styles.originalPriceRow}>
        <Text style={styles.originalPriceLabel}>Original Price</Text>
        <Text style={styles.originalPrice}>₦{originalPrice.toLocaleString()}</Text>
      </View>

      <View style={styles.savingsRow}>
        <View style={styles.savingsBadge}>
          <TagIcon size={16} color="#4CAF50" />
          <Text style={styles.savingsBadgeText}>SAVINGS</Text>
        </View>

        <View style={styles.savingsValues}>
          <CounterAnimation
            from={0}
            to={savings}
            duration={1200}
            prefix="₦"
            style={styles.savingsAmount}
          />
          <View style={styles.savingsPercentContainer}>
            <Text style={styles.savingsPercent}>{savingsPercentage}% OFF</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23232B',
    borderRadius: 12,
    padding: 20,
  },
  currentPriceRow: {
    marginBottom: 8,
  },
  currentPriceLabel: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  originalPriceRow: {
    marginBottom: 16,
  },
  originalPriceLabel: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  originalPrice: {
    fontSize: 18,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 16,
  },
  savingsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A3D1A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  savingsBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4CAF50',
    letterSpacing: 1,
  },
  savingsValues: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  savingsAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  savingsPercentContainer: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  savingsPercent: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
  },
});

export default PriceComparison;
