import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckIcon, CreditCardIcon } from './Icons';

interface ReceiptItem {
  name: string;
  quantity: number;
  unitPrice: number;
  size?: string | null;
}

interface WatermarkReceiptProps {
  orderId: string;
  items?: ReceiptItem[];
  subtotal?: number;
  shipping?: number;
  tax?: number;
  total?: number;
  customerEmail?: string;
  paymentMethod?: string;
  reference?: string;
  date?: string;
}

const WatermarkReceipt: React.FC<WatermarkReceiptProps> = ({
  orderId,
  items = [],
  subtotal = 0,
  shipping = 0,
  tax = 0,
  total = 0,
  customerEmail = '',
  paymentMethod = 'Credit Card',
  reference = '',
  date,
}) => {
  const insets = useSafeAreaInsets();
  const displayDate = date ?? new Date().toLocaleString();
  const ref = reference || `DZ-${orderId.replace(/[^0-9]/g, '').slice(0, 8) || 'PAID'}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  const formatCurrency = (v: number) => `₦${v.toFixed(2)}`;

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 8 }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.receipt}>
          {/* Watermark layer */}
          <View style={styles.watermarkLayer} pointerEvents="none">
            <Text style={[styles.watermark, styles.watermarkA]}>PAID</Text>
            <Text style={[styles.watermark, styles.watermarkB]}>DEZ</Text>
            <Text style={[styles.watermark, styles.watermarkC]}>COLLECTION</Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.storeName}>DEZ COLLECTION</Text>
            <Text style={styles.docType}>PAYMENT RECEIPT</Text>
            <View style={styles.paidBadge}>
              <CheckIcon size={14} color="#0D0D12" />
              <Text style={styles.paidBadgeText}>PAID</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>Receipt No.</Text>
              <Text style={styles.metaValue}>{ref}</Text>
            </View>
            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>Order</Text>
              <Text style={styles.metaValue}>#{orderId}</Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaBlock}>
              <Text style={styles.metaLabel}>Date</Text>
              <Text style={styles.metaValue}>{displayDate}</Text>
            </View>
            {customerEmail ? (
              <View style={styles.metaBlock}>
                <Text style={styles.metaLabel}>Customer</Text>
                <Text style={styles.metaValue} numberOfLines={1}>{customerEmail}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.divider} />

          <View style={styles.itemsHeader}>
            <Text style={[styles.itemsHeaderText, styles.colItem]}>ITEM</Text>
            <Text style={[styles.itemsHeaderText, styles.colQty]}>QTY</Text>
            <Text style={[styles.itemsHeaderText, styles.colAmt]}>AMOUNT</Text>
          </View>

          {items.length === 0 ? (
            <Text style={styles.emptyItems}>Order items listed below</Text>
          ) : (
            items.map((item, i) => (
              <View key={i} style={styles.itemRow}>
                <View style={styles.colItemWrap}>
                  <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                  {item.size ? <Text style={styles.itemSize}>Size: {item.size}</Text> : null}
                  <Text style={styles.itemUnit}>{formatCurrency(item.unitPrice)} each</Text>
                </View>
                <Text style={[styles.itemVal, styles.colQty]}>{item.quantity}</Text>
                <Text style={[styles.itemVal, styles.colAmt]}>{formatCurrency(item.unitPrice * item.quantity)}</Text>
              </View>
            ))
          )}

          <View style={styles.divider} />

          <View style={styles.totals}>
            <View style={styles.totalsRow}><Text style={styles.totalsLabel}>Subtotal</Text><Text style={styles.totalsValue}>{formatCurrency(subtotal)}</Text></View>
            <View style={styles.totalsRow}><Text style={styles.totalsLabel}>Shipping</Text><Text style={styles.totalsValue}>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</Text></View>
            <View style={styles.totalsRow}><Text style={styles.totalsLabel}>Tax</Text><Text style={styles.totalsValue}>{formatCurrency(tax)}</Text></View>
            <View style={[styles.totalsRow, styles.grandTotalRow]}>
              <Text style={styles.grandTotalLabel}>TOTAL PAID</Text>
              <Text style={styles.grandTotalValue}>{formatCurrency(total)}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.footer}>
            <View style={styles.paymentMethodRow}>
              <CreditCardIcon size={16} color="#4ECDC4" />
              <Text style={styles.paymentMethodText}>Paid via {paymentMethod}</Text>
            </View>
            <Text style={styles.thankYou}>Thank you for shopping with Dez Collection</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: '#0D0D12' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  receipt: {
    backgroundColor: '#FAFAF7',
    borderRadius: 16,
    padding: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  watermarkLayer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  watermark: {
    position: 'absolute',
    color: 'rgba(255,87,34,0.10)',
    fontWeight: '900',
    fontStyle: 'italic',
    textAlign: 'center',
    transform: [{ rotate: '-24deg' }],
  },
  watermarkA: { fontSize: 46, top: '30%', letterSpacing: 4 },
  watermarkB: { fontSize: 58, top: '44%', letterSpacing: 2 },
  watermarkC: { fontSize: 30, top: '60%', letterSpacing: 6 },
  header: { alignItems: 'center', marginBottom: 16 },
  storeName: { color: '#111', fontSize: 24, fontWeight: '900', letterSpacing: 2 },
  docType: { color: '#666', fontSize: 12, letterSpacing: 3, marginTop: 4, textTransform: 'uppercase' },
  paidBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#4CAF50', paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 20, marginTop: 10,
  },
  paidBadgeText: { color: '#0D0D12', fontWeight: '800', fontSize: 13, letterSpacing: 1 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  metaBlock: { flex: 1 },
  metaLabel: { color: '#999', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 },
  metaValue: { color: '#222', fontSize: 13, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#E5E5E0', marginVertical: 16 },
  itemsHeader: { flexDirection: 'row', paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  itemsHeaderText: { color: '#999', fontSize: 10, letterSpacing: 1, fontWeight: '700' },
  colItem: { flex: 1 },
  colQty: { width: 40, textAlign: 'center' },
  colAmt: { width: 84, textAlign: 'right' },
  itemRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 10 },
  colItemWrap: { flex: 1 },
  itemName: { color: '#222', fontSize: 14, fontWeight: '600' },
  itemSize: { color: '#FF5722', fontSize: 12, marginTop: 2 },
  itemUnit: { color: '#999', fontSize: 11, marginTop: 2 },
  itemVal: { color: '#222', fontSize: 13, fontWeight: '600', paddingTop: 4 },
  emptyItems: { color: '#999', fontSize: 13, paddingVertical: 10, fontStyle: 'italic' },
  totals: { gap: 6 },
  totalsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  totalsLabel: { color: '#666', fontSize: 14 },
  totalsValue: { color: '#222', fontSize: 14, fontWeight: '600' },
  grandTotalRow: { borderTopWidth: 1, borderTopColor: '#DDD', paddingTop: 12, marginTop: 4 },
  grandTotalLabel: { color: '#0D0D12', fontSize: 16, fontWeight: '900' },
  grandTotalValue: { color: '#FF5722', fontSize: 20, fontWeight: '900' },
  footer: { alignItems: 'center', gap: 8 },
  paymentMethodRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  paymentMethodText: { color: '#4ECDC4', fontSize: 12, fontWeight: '600' },
  thankYou: { color: '#888', fontSize: 12, fontStyle: 'italic', textAlign: 'center' },
});

export default WatermarkReceipt;
