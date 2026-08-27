import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface GlowPulseProps {
  children: React.ReactNode;
  color?: string;
  intensity?: number;
  style?: object;
}

const GlowPulse: React.FC<GlowPulseProps> = ({ children, color = '#FF5722', intensity = 1, style }) => {
  const pulse = useSharedValue(0);

  React.useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [pulse]);

  const animatedStyle = useAnimatedStyle(() => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2 + pulse.value * 0.6 * intensity,
    shadowRadius: 6 + pulse.value * 14 * intensity,
    elevation: 4 + pulse.value * 8 * intensity,
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { borderRadius: 16 },
});

export default GlowPulse;
