import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CheckIcon, TruckIcon, ClockIcon } from './Icons';
import AnimatedCard from './AnimatedCard';

interface OrderCardProps {
  orderNumber: string;
  date: string;
  status: 'pending' | 'shipped' | 'delivered';
  itemCount: number;
  total: number;
  estimatedDelivery?: string;
  delay?: number;
  onViewDetails?: () => void;
  onReorder?: () => void;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'delivered':
      return { color: '#4CAF50', label: 'Delivered', icon: <CheckIcon size={12} color="#FFF" /> };
    case 'shipped':
      return { color: '#2196F3', label: 'Shipped', icon: <TruckIcon size={12} color="#FFF" /> };
    case 'pending':
      return { color: '#FF9800', label: 'Pending', icon: <ClockIcon size={12} color="#FFF" /> };
    default:
      return { color: '#A0A0A0', label: status, icon: null };
  }
};

const OrderCard: React.FC<OrderCardProps> = ({
  orderNumber,
  date,
  status,
  itemCount,
  total,
  estimatedDelivery,
  delay = 0,
  onViewDetails,
  onReorder,
}) => {
  const statusConfig = getStatusConfig(status);

  return (
    <AnimatedCard delay={delay}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text style={styles.orderNumber}>{orderNumber}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: statusConfig.color }]}>
            {statusConfig.icon}
            <Text style={styles.badgeText}>{statusConfig.label}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Items</Text>
            <Text style={styles.infoValue}>{itemCount}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Total</Text>
            <Text style={styles.infoValue}>₦{total.toLocaleString()}</Text>
          </View>
        </View>

        {estimatedDelivery && (
          <View style={styles.delivery}>
            <TruckIcon size={14} color="#FF5722" />
            <Text style={styles.deliveryText}>{estimatedDelivery}</Text>
          </View>
        )}

        <View style={styles.actions}>
          <TouchableOpacity onPress={onViewDetails} style={styles.viewBtn}>
            <Text style={styles.viewBtnText}>View Details</Text>
          </TouchableOpacity>
          {status === 'delivered' && (
            <TouchableOpacity
              onPress={() => onReorder ? onReorder() : Alert.alert('Reorder', `Reorder items from ${orderNumber}?`)}
              style={styles.reorderBtn}
            >
              <Text style={styles.reorderBtnText}>Reorder</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </AnimatedCard>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#23232B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF5722',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNumber: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  date: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D3840',
  },
  infoBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  infoValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 20,
  },
  delivery: {
    backgroundColor: '#0D0D12',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deliveryText: {
    color: '#FF5722',
    fontSize: 13,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  viewBtn: {
    flex: 1,
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  reorderBtn: {
    flex: 1,
    backgroundColor: '#2D2D38',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  reorderBtnText: {
    color: '#FF5722',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default OrderCard;
