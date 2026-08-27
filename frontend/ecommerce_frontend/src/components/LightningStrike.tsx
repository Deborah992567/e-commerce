import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface LightningStrikeProps {
  color?: string;
  size?: number;
  active?: boolean;
}

const LightningStrike: React.FC<LightningStrikeProps> = ({ color = '#FFD700', size = 40, active = true }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);

  React.useEffect(() => {
    if (!active) return;
    opacity.value = withRepeat(
      withTiming(1, { duration: 150, easing: Easing.out(Easing.ease) }),
      -1,
      true,
    );
    scale.value = withRepeat(
      withTiming(1.2, { duration: 200, easing: Easing.out(Easing.ease) }),
      -1,
      true,
    );
  }, [opacity, scale, active]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Text style={{ fontSize: size, color }}>⚡</Text>
    </Animated.View>
  );
};

export default LightningStrike;
