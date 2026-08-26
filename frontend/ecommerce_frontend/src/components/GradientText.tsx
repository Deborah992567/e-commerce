import React, { useRef, useEffect } from 'react';
import { Text, StyleSheet, Animated, Easing } from 'react-native';

interface GradientTextProps {
  children: string;
  colors?: string[];
  style?: object;
  animate?: boolean;
}

const GradientText: React.FC<GradientTextProps> = ({ children, colors = ['#FF5722', '#FF9800'], style, animate = false }) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(-10)).current;

  useEffect(() => {
    if (animate) {
      Animated.parallel([
        Animated.timing(opacityAnim, { toValue: 1, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
        Animated.timing(translateAnim, { toValue: 0, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      ]).start();
    } else {
      opacityAnim.setValue(1);
      translateAnim.setValue(0);
    }
  }, [animate, opacityAnim, translateAnim]);

  return (
    <Animated.View style={{ opacity: opacityAnim, transform: [{ translateX: translateAnim }] }}>
      <Text style={[styles.text, { color: colors[0] }, style]}>{children}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
});

export default GradientText;
