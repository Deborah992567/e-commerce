import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../contexts/CartContext';
import { ChevronLeftIcon, TrashIcon, CartIcon } from './Icons';

interface CartScreenProps {
  onBack?: () => void;
  onCheckout?: () => void;
}

const CartScreen: React.FC<CartScreenProps> = ({ onBack, onCheckout }) => {
  const { cart, removeFromCart, totalPrice, totalItems } = useCart();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { paddingTop: insets.top + 30, opacity: fadeAnim }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <ChevronLeftIcon size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Your Cart ({totalItems})</Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <CartIcon size={64} color="#3A3A45" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add some products to get started!</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.list}
            renderItem={({ item, index }) => (
              <CartItem item={item} index={index} onRemove={() => removeFromCart(Number(item.id), item.size)} />
            )}
          />

          <View style={styles.footer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₦{totalPrice.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.checkoutBtn} onPress={onCheckout}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </Animated.View>
  );
};

const CartItem: React.FC<{ item: any; index: number; onRemove: () => void }> = ({ item, index, onRemove }) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 400,
      delay: index * 100,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [slideAnim, index]);

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <Animated.View style={[styles.itemCard, { opacity: slideAnim, transform: [{ translateX }] }]}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetail}>Qty: {item.quantity} • ₦{item.price.toFixed(2)}</Text>
        {item.size ? <Text style={styles.itemDetail}>Size: {item.size}</Text> : null}
        <Text style={styles.itemSubtotal}>₦{(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.removeBtn}>
        <TrashIcon size={16} color="#FFF" />
      </TouchableOpacity>
    </Animated.View>
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
    marginBottom: 16,
    marginTop: 20,
  },
  backBtn: {
    marginRight: 12,
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
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D2D38',
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
    color: '#FF5722',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  removeBtn: {
    backgroundColor: '#FF6B6B',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 16,
  },
  emptyTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
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
    color: '#FF5722',
    fontSize: 20,
    fontWeight: '700',
  },
  checkoutBtn: {
    backgroundColor: '#FF5722',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 14,
  },
  checkoutText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default CartScreen;
