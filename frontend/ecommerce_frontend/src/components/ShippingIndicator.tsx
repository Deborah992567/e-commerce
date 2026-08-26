import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TruckIcon, CheckIcon } from './Icons';
import ProgressBar from './ProgressBar';

interface ShippingIndicatorProps {
  subtotal: number;
  threshold?: number;
}

const ShippingIndicator: React.FC<ShippingIndicatorProps> = ({ subtotal, threshold = 50000 }) => {
  const remaining = Math.max(0, threshold - subtotal);
  const qualifies = subtotal >= threshold;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <TruckIcon size={18} color="#4CAF50" />
          <Text style={styles.title}>Free Shipping</Text>
        </View>
        {qualifies ? (
          <View style={styles.qualifiedRow}>
            <CheckIcon size={14} color="#4CAF50" />
            <Text style={styles.qualifiedText}>Qualified!</Text>
          </View>
        ) : (
          <Text style={styles.remainingText}>Add ₦{remaining.toLocaleString()} more</Text>
        )}
      </View>
      <ProgressBar progress={(subtotal / threshold) * 100} color={qualifies ? '#4CAF50' : '#FF5722'} />
      <View style={styles.footer}>
        <Text style={styles.footerText}>₦{subtotal.toLocaleString()} of ₦{threshold.toLocaleString()}</Text>
      </View>
      {qualifies && (
        <View style={styles.badge}>
          <TruckIcon size={14} color="#4CAF50" />
          <Text style={styles.badgeText}>Free Shipping Applied</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#23232B', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#2D2D38' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  title: { fontSize: 14, fontWeight: 'bold', color: '#FFF' },
  qualifiedRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  qualifiedText: { fontSize: 12, color: '#4CAF50', fontWeight: 'bold' },
  remainingText: { fontSize: 12, color: '#FF5722', fontWeight: 'bold' },
  footer: { marginTop: 8 },
  footerText: { fontSize: 12, color: '#A0A0A0', textAlign: 'center' },
  badge: { marginTop: 12, backgroundColor: '#4CAF5020', borderRadius: 8, padding: 8, borderWidth: 1, borderColor: '#4CAF50', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 },
  badgeText: { fontSize: 12, color: '#4CAF50', fontWeight: 'bold' },
});

export default ShippingIndicator;
