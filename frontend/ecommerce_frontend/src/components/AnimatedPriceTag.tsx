import React, { useRef, useEffect } from 'react';
import { Text, StyleSheet, Animated, Easing } from 'react-native';
import { TagIcon } from './Icons';

interface AnimatedPriceTagProps {
  price: number;
  oldPrice?: number;
  currency?: string;
  animate?: boolean;
  style?: object;
}

const AnimatedPriceTag: React.FC<AnimatedPriceTagProps> = ({ price, oldPrice, currency = '₦', animate = true, style }) => {
  const scaleAnim = useRef(new Animated.Value(animate ? 0.5 : 1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (animate) {
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 400, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]).start();
    }
  }, [animate, scaleAnim, opacityAnim]);

  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }, style]}>
      {discount > 0 && (
        <Animated.View style={styles.discount}>
          <TagIcon size={10} color="#FFF" />
          <Text style={styles.discountText}>-{discount}%</Text>
        </Animated.View>
      )}
      <Text style={styles.price}>{currency}{price.toLocaleString()}</Text>
      {oldPrice && <Text style={styles.oldPrice}>{currency}{oldPrice.toLocaleString()}</Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  discount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FF2D55',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  price: {
    color: '#FF5722',
    fontSize: 20,
    fontWeight: 'bold',
  },
  oldPrice: {
    color: '#A0A0A0',
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
});

export default AnimatedPriceTag;
