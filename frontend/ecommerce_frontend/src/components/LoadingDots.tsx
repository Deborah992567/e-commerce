import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface GlowDotProps {
  color?: string;
  size?: number;
  delay?: number;
}

const GlowDot: React.FC<GlowDotProps> = ({ color = '#FF5722', size = 8, delay = 0 }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.4);

  React.useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.8, { duration: 600, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
    opacity.value = withRepeat(
      withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.dot,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: color },
        animatedStyle,
      ]}
    />
  );
};

const LoadingDots: React.FC<{ color?: string }> = ({ color = '#FF5722' }) => (
  <View style={styles.row}>
    <GlowDot color={color} delay={0} />
    <GlowDot color={color} delay={200} />
    <GlowDot color={color} delay={400} />
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center' },
  dot: {},
});

export { GlowDot, LoadingDots };
export default LoadingDots;
