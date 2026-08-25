import React, { useRef, useEffect } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';

interface BouncyTextProps {
  children: string;
  style?: object;
  delay?: number;
}

const BouncyText: React.FC<BouncyTextProps> = ({ children, style, delay = 0 }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(bounceAnim, {
      toValue: 1,
      delay,
      friction: 4,
      tension: 60,
      useNativeDriver: true,
    }).start();
  }, [bounceAnim, delay]);

  const scale = bounceAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 1.15, 1],
  });

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Text style={style}>{children}</Text>
    </Animated.View>
  );
};

export default BouncyText;
