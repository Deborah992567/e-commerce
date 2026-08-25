import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { CartBagIcon } from './Icons';

interface AnimatedCartProps {
  count: number;
}

const AnimatedCart: React.FC<AnimatedCartProps> = ({ count }) => {
  const bump = useRef(new Animated.Value(1)).current;
  const badgeScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (count > 0) {
      Animated.sequence([
        Animated.spring(bump, { toValue: 1.2, useNativeDriver: true, friction: 4 }),
        Animated.spring(bump, { toValue: 1, useNativeDriver: true, friction: 4 }),
      ]).start();

      Animated.spring(badgeScale, {
        toValue: 1,
        friction: 3,
        tension: 100,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(badgeScale, {
        toValue: 0,
        friction: 3,
        useNativeDriver: true,
      }).start();
    }
  }, [count, bump, badgeScale]);

  return (
    <View style={styles.cartWrap}>
      <Animated.View style={{ transform: [{ scale: bump }] }}>
        <CartBagIcon size={56} color={count > 0 ? '#FF5722' : '#E8C97A'} />
      </Animated.View>
      <Animated.View style={[styles.cartBadge, { transform: [{ scale: badgeScale }] }]}>
        <Text style={styles.cartBadgeText}>{count}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 16,
  },
  cartBadge: {
    position: 'absolute',
    right: -4,
    top: 0,
    backgroundColor: '#FF5722',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: '#0D0D12',
  },
  cartBadgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default AnimatedCart;
