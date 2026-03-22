import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface CartScreenProps {
  onBack?: () => void;
}

const demoCartItems: CartItem[] = [
  { id: 1, name: 'Limited Edition Leather Jacket', quantity: 1, price: 249.99 },
  { id: 2, name: 'Luxury Sneakers', quantity: 2, price: 179.95 },
  { id: 3, name: 'Minimalist Smartwatch', quantity: 1, price: 199.00 },
];

const CartScreen: React.FC<CartScreenProps> = ({ onBack }) => {
  const total = demoCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Your Cart</Text>
      </View>

      <FlatList
        data={demoCartItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetail}>Qty: {item.quantity} • ${item.price.toFixed(2)}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutBtn} onPress={() => console.log('Checkout pressed')}>
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D12',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backBtn: {
    marginRight: 12,
  },
  backText: {
    color: '#E8C97A',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  list: {
    paddingBottom: 20,
  },
  itemCard: {
    backgroundColor: '#17171f',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  itemName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDetail: {
    color: '#B3B3C2',
    fontSize: 14,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ffffff20',
    marginTop: 10,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: '#B3B3C2',
    fontSize: 16,
  },
  totalValue: {
    color: '#E8C97A',
    fontSize: 18,
    fontWeight: '700',
  },
  checkoutBtn: {
    backgroundColor: '#E8C97A',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 14,
  },
  checkoutText: {
    color: '#0D0D12',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default CartScreen;
