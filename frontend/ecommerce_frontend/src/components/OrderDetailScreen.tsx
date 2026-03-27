import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  itemCount: number;
  estimatedDelivery?: string;
}

interface OrderDetailScreenProps {
  order: Order;
  onBack?: () => void;
}

const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({ order, onBack }) => {
  const insets = useSafeAreaInsets();
  const [expandedTracking, setExpandedTracking] = useState(true);

  // Mock order items
  const orderItems: OrderItem[] = [
    {
      id: 1,
      name: 'Premium Leather Jacket',
      price: 249.99,
      quantity: 1,
      size: 'M',
    },
    {
      id: 2,
      name: 'Luxury Sneakers',
      price: 199.99,
      quantity: 1,
      size: '10',
    },
    {
      id: 3,
      name: 'Minimalist Smartwatch',
      price: 199.99,
      quantity: 1,
    },
  ];

  // Mock delivery tracking
  const trackingSteps = [
    { label: 'Order Placed', date: 'Mar 22, 2026', completed: true },
    { label: 'Processing', date: 'Mar 23, 2026', completed: true },
    { label: 'Shipped', date: 'Mar 24, 2026', completed: true },
    { label: 'Out for Delivery', date: 'Mar 27, 2026', completed: false },
    { label: 'Delivered', date: 'Est. Mar 28, 2026', completed: false },
  ];

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'How can we help?',
      [
        {
          text: 'Track Package',
          onPress: () => Alert.alert('Tracking', 'Opening carrier tracking page...'),
        },
        {
          text: 'Return Item',
          onPress: () => Alert.alert('Returns', 'Returns available within 30 days'),
        },
        {
          text: 'Report Issue',
          onPress: () => Alert.alert('Support', 'Our team will contact you soon'),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handlePrintInvoice = () => {
    Alert.alert('Invoice', 'Invoice will be sent to your email');
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping: number = 0;
  const tax = (subtotal + shipping) * 0.08;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Order Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Order Status */}
        <View style={styles.section}>
          <View style={styles.statusHeader}>
            <View>
              <Text style={styles.orderNumber}>{order.orderNumber}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusIcon}>
                {order.status === 'delivered' && '✓'}
                {order.status === 'shipped' && '📦'}
                {order.status === 'pending' && '⏳'}
              </Text>
              <Text style={styles.statusText}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Text>
            </View>
          </View>

          {order.estimatedDelivery && (
            <Text style={styles.estimatedDelivery}>
              🚚 {order.estimatedDelivery}
            </Text>
          )}
        </View>

        {/* Tracking Timeline */}
        {(order.status === 'shipped' || order.status === 'delivered') && (
          <View style={styles.section}>
            <TouchableOpacity
              onPress={() => setExpandedTracking(!expandedTracking)}
              style={styles.sectionHeader}
            >
              <Text style={styles.sectionTitle}>Tracking Progress</Text>
              <Text style={styles.expandIcon}>{expandedTracking ? '▼' : '▶'}</Text>
            </TouchableOpacity>

            {expandedTracking && (
              <View style={styles.timeline}>
                {trackingSteps.map((step, index) => (
                  <View key={index} style={styles.timelineItem}>
                    <View style={styles.timelineLeft}>
                      <View
                        style={[
                          styles.dot,
                          step.completed && styles.dotCompleted,
                        ]}
                      />
                      {index < trackingSteps.length - 1 && (
                        <View
                          style={[
                            styles.line,
                            step.completed && styles.lineCompleted,
                          ]}
                        />
                      )}
                    </View>
                    <View style={styles.timelineRight}>
                      <Text
                        style={[
                          styles.timelineLabel,
                          step.completed && styles.timelineLabelCompleted,
                        ]}
                      >
                        {step.label}
                      </Text>
                      <Text style={styles.timelineDate}>{step.date}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items ({orderItems.length})</Text>
          {orderItems.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>₦{item.price.toFixed(2)}</Text>
                {item.size && (
                  <Text style={styles.itemSize}>Size: {item.size}</Text>
                )}
              </View>
              <View style={styles.itemQty}>
                <Text style={styles.quantityLabel}>Qty: {item.quantity}</Text>
                <Text style={styles.itemTotal}>
                  ₦{(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Pricing Breakdown */}
        <View style={styles.section}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>₦{subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Shipping</Text>
            <Text style={styles.priceValue}>
              {shipping === 0 ? 'Free' : `₦${shipping.toFixed(2)}`}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tax</Text>
            <Text style={styles.priceValue}>₦{tax.toFixed(2)}</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₦{order.total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Delivery & Billing Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressBox}>
            <Text style={styles.addressTitle}>🏠 Home</Text>
            <Text style={styles.addressText}>123 Main Street</Text>
            <Text style={styles.addressText}>New York, NY 10001</Text>
            <Text style={styles.addressText}>United States</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.section}>
          <TouchableOpacity onPress={handleContactSupport} style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>📞 Contact Support</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePrintInvoice} style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>📄 Print Invoice</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
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
  content: {
    paddingHorizontal: 14,
    paddingTop: 16,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2A',
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNumber: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  orderDate: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  statusBadge: {
    backgroundColor: '#E8C97A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  statusIcon: {
    fontSize: 16,
    fontWeight: '700',
  },
  statusText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  estimatedDelivery: {
    color: '#E8C97A',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  expandIcon: {
    color: '#E8C97A',
    fontSize: 12,
    fontWeight: '700',
  },
  timeline: {
    marginTop: 12,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineLeft: {
    width: 30,
    alignItems: 'center',
    marginRight: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#A0A0A0',
  },
  dotCompleted: {
    backgroundColor: '#E8C97A',
  },
  line: {
    width: 2,
    height: 32,
    backgroundColor: '#A0A0A0',
    marginTop: 8,
  },
  lineCompleted: {
    backgroundColor: '#E8C97A',
  },
  timelineRight: {
    flex: 1,
  },
  timelineLabel: {
    color: '#A0A0A0',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  timelineLabelCompleted: {
    color: '#E8C97A',
  },
  timelineDate: {
    color: '#707080',
    fontSize: 12,
  },
  itemCard: {
    backgroundColor: '#18181F',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    color: '#E8C97A',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  itemSize: {
    color: '#A0A0A0',
    fontSize: 12,
  },
  itemQty: {
    alignItems: 'flex-end',
  },
  quantityLabel: {
    color: '#A0A0A0',
    fontSize: 12,
    marginBottom: 4,
  },
  itemTotal: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  priceLabel: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  priceValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#1F1F2A',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    color: '#E8C97A',
    fontSize: 18,
    fontWeight: '700',
  },
  addressBox: {
    backgroundColor: '#18181F',
    borderRadius: 12,
    padding: 12,
  },
  addressTitle: {
    color: '#E8C97A',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  addressText: {
    color: '#C0C0C8',
    fontSize: 14,
    marginBottom: 2,
  },
  actionBtn: {
    backgroundColor: '#18181F',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#2A2A35',
  },
  actionBtnText: {
    color: '#E8C97A',
    fontSize: 14,
    fontWeight: '600',
  },
  spacer: {
    height: 20,
  },
});

export default OrderDetailScreen;
