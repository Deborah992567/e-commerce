import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface AnimatedCartProps {
  count: number;
}

const AnimatedCart: React.FC<AnimatedCartProps> = ({ count }) => {
  const [bump] = useState(new Animated.Value(1));

  useEffect(() => {
    if (count > 0) {
      Animated.sequence([
        Animated.spring(bump, {
          toValue: 1.2,
          useNativeDriver: true,
        }),
        Animated.spring(bump, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [count]);

  return (
    <View style={styles.cartWrap}>
      <Animated.Text style={[styles.cartIcon, { transform: [{ scale: bump }] }]}>🛒</Animated.Text>
      {count > 0 && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{count}</Text>
        </View>
      )}
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
  cartIcon: {
    fontSize: 48,
  },
  cartBadge: {
    position: 'absolute',
    right: -8,
    top: 0,
    backgroundColor: '#E8C97A',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: '#23232B',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default AnimatedCart;