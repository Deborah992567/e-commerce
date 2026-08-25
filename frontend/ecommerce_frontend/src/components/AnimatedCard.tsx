import React, { useRef, useEffect } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  style?: object;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, delay = 0, style }) => {
  const scale = useRef(new Animated.Value(0.9)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        delay,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale, opacity, delay]);

  return (
    <Animated.View style={[{ opacity, transform: [{ scale }] }, style]}>
      {children}
    </Animated.View>
  );
};

export default AnimatedCard;
