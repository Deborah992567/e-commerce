import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

interface NeonGlowProps {
  children: React.ReactNode;
  color?: string;
  style?: object;
}

const NeonGlow: React.FC<NeonGlowProps> = ({ children, color = '#FF5722', style }) => {
  const glow = useSharedValue(0);

  React.useEffect(() => {
    glow.value = withRepeat(
      withSequence(withTiming(1, { duration: 1000 }), withTiming(0, { duration: 1000 })),
      -1,
    );
  }, [glow]);

  const animatedStyle = useAnimatedStyle(() => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3 + glow.value * 0.5,
    shadowRadius: 8 + glow.value * 12,
    elevation: 4 + glow.value * 8,
  }));

  return <Animated.View style={[styles.container, animatedStyle, style]}>{children}</Animated.View>;
};

const styles = StyleSheet.create({
  container: {},
});

export default NeonGlow;
