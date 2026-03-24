import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../contexts/CartContext';

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface CartScreenProps {
  onBack?: () => void;
  onCheckout?: () => void;
}

const CartScreen: React.FC<CartScreenProps> = ({ onBack, onCheckout }) => {
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 30 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Your Cart ({totalItems})</Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyText}>🛒</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add some products to get started!</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDetail}>Qty: {item.quantity} • ${item.price.toFixed(2)}</Text>
                  {item.size ? <Text style={styles.itemDetail}>Size: {item.size}</Text> : null}
                  <Text style={styles.itemSubtotal}>${(item.price * item.quantity).toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => removeFromCart(Number(item.id), item.size)}
                  style={styles.removeBtn}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.footer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.checkoutBtn} onPress={onCheckout}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D12',
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  backBtn: {
    marginRight: 10,
  },
  backText: {
    color: '#E8C97A',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: '#fff',
    fontSize: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
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
    marginBottom: 2,
  },
  itemSubtotal: {
    color: '#E8C97A',
    fontSize: 16,
    fontWeight: '600',
  },
  removeBtn: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  removeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#B3B3C2',
    fontSize: 16,
    textAlign: 'center',
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
