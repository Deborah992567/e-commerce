import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../contexts/CartContext';
import { CartProduct } from '../contexts/CartContext';
import { MinusIcon, PlusIcon, TrashIcon } from './Icons';
import SwipeableCard from './SwipeableCard';
import AnimatedCard from './AnimatedCard';

interface CartItemProps {
  item: CartProduct;
  index: number;
}

const CartItem: React.FC<CartItemProps> = ({ item, index }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleRemove = () => {
    removeFromCart(item.id, item.size);
  };

  return (
    <AnimatedCard delay={index * 80}>
      <SwipeableCard onSwipeLeft={handleRemove}>
        <View style={styles.card}>
          <Image source={{ uri: item.img }} style={styles.image} resizeMode="cover" />

          <View style={styles.details}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>

            {item.size ? <Text style={styles.size}>Size: {item.size}</Text> : null}

            <Text style={styles.price}>₦{item.price.toFixed(2)}</Text>

            <View style={styles.quantityRow}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                activeOpacity={0.7}
              >
                <MinusIcon size={16} color="#FF5722" />
              </TouchableOpacity>

              <Text style={styles.qtyValue}>{item.quantity}</Text>

              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                activeOpacity={0.7}
              >
                <PlusIcon size={16} color="#FF5722" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rightCol}>
            <TouchableOpacity onPress={handleRemove} style={styles.removeBtn} activeOpacity={0.7}>
              <TrashIcon size={16} color="#FF6B6B" />
            </TouchableOpacity>

            <Text style={styles.subtotal}>
              ₦{(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        </View>
      </SwipeableCard>
    </AnimatedCard>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#23232B',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#1A1A22',
  },
  details: {
    flex: 1,
    gap: 2,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  size: {
    color: '#B3B3C2',
    fontSize: 12,
  },
  price: {
    color: '#B3B3C2',
    fontSize: 14,
    marginTop: 2,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 10,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#1A1A22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyValue: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
  },
  rightCol: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 72,
  },
  removeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtotal: {
    color: '#FF5722',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default CartItem;
