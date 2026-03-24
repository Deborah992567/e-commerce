import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

const OrderHistoryScreen: React.FC<OrderHistoryScreenProps> = ({
  onBack,
  onViewDetails,
}) => {
  const insets = useSafeAreaInsets();
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'shipped' | 'delivered' | 'cancelled'>('all');

  // Mock order data
  const mockOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'EC-001234',
      date: 'Mar 22, 2026',
      total: 649.94,
      status: 'delivered',
      itemCount: 3,
      estimatedDelivery: 'Delivered on Mar 25, 2026',
    },
    {
      id: '2',
      orderNumber: 'EC-001233',
      date: 'Mar 20, 2026',
      total: 299.99,
      status: 'shipped',
      itemCount: 1,
      estimatedDelivery: 'Arriving Mar 28, 2026',
    },
    {
      id: '3',
      orderNumber: 'EC-001232',
      date: 'Mar 15, 2026',
      total: 179.95,
      status: 'pending',
      itemCount: 2,
      estimatedDelivery: 'Processing',
    },
    {
      id: '4',
      orderNumber: 'EC-001231',
      date: 'Mar 10, 2026',
      total: 89.99,
      status: 'delivered',
      itemCount: 1,
      estimatedDelivery: 'Delivered on Mar 14, 2026',
    },
  ];

  const filteredOrders = filterStatus === 'all'
    ? mockOrders
    : mockOrders.filter((order) => order.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return '#4CAF50';
      case 'shipped':
        return '#2196F3';
      case 'pending':
        return '#FF9800';
      case 'cancelled':
        return '#F44336';
      default:
        return '#A0A0A0';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return '✓';
      case 'shipped':
        return '📦';
      case 'pending':
        return '⏳';
      case 'cancelled':
        return '✕';
      default:
        return '•';
    }
  };

  const handleReorder = (order: Order) => {
    Alert.alert(
      'Reorder',
      `Reorder items from ${order.orderNumber}?`,
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Reorder',
          onPress: () => Alert.alert('Success', 'Items added to cart!'),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Order History</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setFilterStatus('all')}
          style={[
            styles.filterTab,
            filterStatus === 'all' && styles.filterTabActive,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              filterStatus === 'all' && styles.filterTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilterStatus('pending')}
          style={[
            styles.filterTab,
            filterStatus === 'pending' && styles.filterTabActive,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              filterStatus === 'pending' && styles.filterTextActive,
            ]}
          >
            Pending
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilterStatus('shipped')}
          style={[
            styles.filterTab,
            filterStatus === 'shipped' && styles.filterTabActive,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              filterStatus === 'shipped' && styles.filterTextActive,
            ]}
          >
            Shipped
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setFilterStatus('delivered')}
          style={[
            styles.filterTab,
            filterStatus === 'delivered' && styles.filterTabActive,
          ]}
        >
          <Text
            style={[
              styles.filterText,
              filterStatus === 'delivered' && styles.filterTextActive,
            ]}
          >
            Delivered
          </Text>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptySubtitle}>
            Orders with status "{filterStatus}" will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onViewDetails?.(item)}
              style={styles.orderCard}
            >
              <View style={styles.orderHeader}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderNumber}>{item.orderNumber}</Text>
                  <Text style={styles.orderDate}>{item.date}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(item.status) },
                  ]}
                >
                  <Text style={styles.statusIcon}>
                    {getStatusIcon(item.status)}
                  </Text>
                  <Text style={styles.statusText}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.orderDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Items</Text>
                  <Text style={styles.detailValue}>{item.itemCount}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Total</Text>
                  <Text style={styles.detailValue}>
                    ${item.total.toFixed(2)}
                  </Text>
                </View>
              </View>

              {item.estimatedDelivery && (
                <View style={styles.deliveryInfo}>
                  <Text style={styles.deliveryLabel}>
                    🚚 {item.estimatedDelivery}
                  </Text>
                </View>
              )}

              <View style={styles.actionRow}>
                <TouchableOpacity
                  onPress={() => onViewDetails?.(item)}
                  style={styles.viewBtn}
                >
                  <Text style={styles.viewBtnText}>View Details</Text>
                </TouchableOpacity>

                {item.status === 'delivered' && (
                  <TouchableOpacity
                    onPress={() => handleReorder(item)}
                    style={styles.reorderBtn}
                  >
                    <Text style={styles.reorderBtnText}>Reorder</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D12',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2A',
  },
  backBtn: {
    padding: 8,
  },
  backText: {
    fontSize: 24,
    color: '#E8C97A',
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2A',
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#18181F',
  },
  filterTabActive: {
    backgroundColor: '#E8C97A',
  },
  filterText: {
    color: '#A0A0A0',
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#000',
  },
  listContent: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#18181F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#E8C97A',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  orderDate: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  statusIcon: {
    fontSize: 14,
    fontWeight: '700',
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A35',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  detailLabel: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  detailValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 20,
  },
  deliveryInfo: {
    backgroundColor: '#0D0D12',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  deliveryLabel: {
    color: '#E8C97A',
    fontSize: 13,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  viewBtn: {
    flex: 1,
    backgroundColor: '#E8C97A',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
  reorderBtn: {
    flex: 1,
    backgroundColor: '#2A2A35',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  reorderBtnText: {
    color: '#E8C97A',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#A0A0A0',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default OrderHistoryScreen;
