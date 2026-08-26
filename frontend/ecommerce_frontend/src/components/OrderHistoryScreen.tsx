import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeftIcon, CheckIcon, PackageIcon, ClockIcon, TagIcon, TruckIcon } from './Icons';
import AnimatedCard from './AnimatedCard';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  itemCount: number;
  estimatedDelivery?: string;
}

interface OrderHistoryScreenProps {
  onBack?: () => void;
  onViewDetails?: (order: Order) => void;
}

const OrderHistoryScreen: React.FC<OrderHistoryScreenProps> = ({ onBack, onViewDetails }) => {
  const insets = useSafeAreaInsets();
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'shipped' | 'delivered' | 'cancelled'>('all');

  const mockOrders: Order[] = [
    { id: '1', orderNumber: 'EC-001234', date: 'Mar 22, 2026', total: 64994, status: 'delivered', itemCount: 3, estimatedDelivery: 'Delivered on Mar 25, 2026' },
    { id: '2', orderNumber: 'EC-001233', date: 'Mar 20, 2026', total: 29999, status: 'shipped', itemCount: 1, estimatedDelivery: 'Arriving Mar 28, 2026' },
    { id: '3', orderNumber: 'EC-001232', date: 'Mar 15, 2026', total: 17995, status: 'pending', itemCount: 2, estimatedDelivery: 'Processing' },
    { id: '4', orderNumber: 'EC-001231', date: 'Mar 10, 2026', total: 8999, status: 'delivered', itemCount: 1, estimatedDelivery: 'Delivered on Mar 14, 2026' },
  ];

  const filteredOrders = filterStatus === 'all' ? mockOrders : mockOrders.filter((o) => o.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) { case 'delivered': return '#4CAF50'; case 'shipped': return '#2196F3'; case 'pending': return '#FF9800'; case 'cancelled': return '#F44336'; default: return '#A0A0A0'; }
  };

  const getStatusIcon = (status: string) => {
    switch (status) { case 'delivered': return <CheckIcon size={12} color="#FFF" />; case 'shipped': return <TruckIcon size={12} color="#FFF" />; case 'pending': return <ClockIcon size={12} color="#FFF" />; case 'cancelled': return <TagIcon size={12} color="#FFF" />; default: return null; }
  };

  const filters: Array<{ key: typeof filterStatus; label: string }> = [
    { key: 'all', label: 'All' }, { key: 'pending', label: 'Pending' }, { key: 'shipped', label: 'Shipped' }, { key: 'delivered', label: 'Delivered' },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}><ChevronLeftIcon size={24} color="#FF5722" /></TouchableOpacity>
        <Text style={styles.title}>Order History</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.filterContainer}>
        {filters.map((f) => (
          <TouchableOpacity key={f.key} onPress={() => setFilterStatus(f.key)} style={[styles.filterTab, filterStatus === f.key && styles.filterTabActive]}>
            <Text style={[styles.filterText, filterStatus === f.key && styles.filterTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredOrders.length === 0 ? (
        <View style={styles.emptyState}>
          <PackageIcon size={60} color="#4A4A55" />
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptySubtitle}>Orders with status "{filterStatus}" will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <AnimatedCard delay={index * 100}>
              <TouchableOpacity onPress={() => onViewDetails?.(item)} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View style={styles.orderInfo}>
                    <Text style={styles.orderNumber}>{item.orderNumber}</Text>
                    <Text style={styles.orderDate}>{item.date}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    {getStatusIcon(item.status)}
                    <Text style={styles.statusText}>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</Text>
                  </View>
                </View>
                <View style={styles.orderDetails}>
                  <View style={styles.detailRow}><Text style={styles.detailLabel}>Items</Text><Text style={styles.detailValue}>{item.itemCount}</Text></View>
                  <View style={styles.detailRow}><Text style={styles.detailLabel}>Total</Text><Text style={styles.detailValue}>₦{item.total.toLocaleString()}</Text></View>
                </View>
                {item.estimatedDelivery && (
                  <View style={styles.deliveryInfo}>
                    <TruckIcon size={14} color="#FF5722" />
                    <Text style={styles.deliveryLabel}>{item.estimatedDelivery}</Text>
                  </View>
                )}
                <View style={styles.actionRow}>
                  <TouchableOpacity onPress={() => onViewDetails?.(item)} style={styles.viewBtn}><Text style={styles.viewBtnText}>View Details</Text></TouchableOpacity>
                  {item.status === 'delivered' && (
                    <TouchableOpacity onPress={() => Alert.alert('Reorder', `Reorder items from ${item.orderNumber}?`)} style={styles.reorderBtn}><Text style={styles.reorderBtnText}>Reorder</Text></TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            </AnimatedCard>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D12' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1F1F2A' },
  backBtn: { padding: 8 },
  title: { color: '#FFF', fontSize: 18, fontWeight: '700', flex: 1, textAlign: 'center' },
  headerSpacer: { width: 40 },
  filterContainer: { flexDirection: 'row', paddingHorizontal: 14, paddingVertical: 12, gap: 8, borderBottomWidth: 1, borderBottomColor: '#1F1F2A' },
  filterTab: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: '#23232B', borderWidth: 1, borderColor: '#2D2D38' },
  filterTabActive: { backgroundColor: '#FF5722', borderColor: '#FF5722' },
  filterText: { color: '#A0A0A0', fontSize: 13, fontWeight: '600' },
  filterTextActive: { color: '#FFF' },
  listContent: { paddingHorizontal: 14, paddingTop: 14, paddingBottom: 20 },
  orderCard: { backgroundColor: '#23232B', borderRadius: 12, padding: 16, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#FF5722' },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  orderInfo: { flex: 1 },
  orderNumber: { color: '#FFF', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  orderDate: { color: '#A0A0A0', fontSize: 14 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, gap: 4 },
  statusText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  orderDetails: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#2D2D3840' },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', flex: 1 },
  detailLabel: { color: '#A0A0A0', fontSize: 14 },
  detailValue: { color: '#FFF', fontSize: 14, fontWeight: '600', marginLeft: 20 },
  deliveryInfo: { backgroundColor: '#0D0D12', padding: 10, borderRadius: 8, marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 8 },
  deliveryLabel: { color: '#FF5722', fontSize: 13, fontWeight: '600' },
  actionRow: { flexDirection: 'row', gap: 8 },
  viewBtn: { flex: 1, backgroundColor: '#FF5722', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  viewBtnText: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  reorderBtn: { flex: 1, backgroundColor: '#2D2D38', paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  reorderBtnText: { color: '#FF5722', fontSize: 14, fontWeight: '600' },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, gap: 12 },
  emptyTitle: { color: '#FFF', fontSize: 20, fontWeight: '700', textAlign: 'center' },
  emptySubtitle: { color: '#A0A0A0', fontSize: 14, textAlign: 'center' },
});

export default OrderHistoryScreen;
