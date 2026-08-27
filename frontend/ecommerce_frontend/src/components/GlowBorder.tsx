import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface GlowBorderProps {
  children: React.ReactNode;
  color?: string;
  borderWidth?: number;
  style?: object;
}

const GlowBorder: React.FC<GlowBorderProps> = ({ children, color = '#FF5722', borderWidth = 2, style }) => {
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    borderColor: color,
    borderWidth,
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: opacity.value * 0.6,
    shadowRadius: 8 + opacity.value * 10,
    elevation: 4 + opacity.value * 6,
  }));

  return <Animated.View style={[styles.container, animatedStyle, style]}>{children}</Animated.View>;
};

const styles = StyleSheet.create({
  container: { borderRadius: 12, overflow: 'hidden' },
});

export default GlowBorder;
