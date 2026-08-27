import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface BreathScaleProps {
  children: React.ReactNode;
  minScale?: number;
  maxScale?: number;
  duration?: number;
  style?: object;
}

const BreathScale: React.FC<BreathScaleProps> = ({
  children,
  minScale = 0.95,
  maxScale = 1.05,
  duration = 2000,
  style,
}) => {
  const scale = useSharedValue(minScale);

  React.useEffect(() => {
    scale.value = withRepeat(
      withTiming(maxScale, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [scale, minScale, maxScale, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>;
};

export default BreathScale;
