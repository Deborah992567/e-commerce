import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface SkewHoverProps {
  children: React.ReactNode;
  hoverAmount?: number;
  style?: object;
}

const SkewHover: React.FC<SkewHoverProps> = ({ children, hoverAmount = 3, style }) => {
  const skew = useSharedValue(0);
  const translateY = useSharedValue(0);

  React.useEffect(() => {
    skew.value = withRepeat(
      withTiming(hoverAmount, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
    translateY.value = withRepeat(
      withTiming(-4, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [skew, translateY, hoverAmount]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ skewX: `${skew.value}deg` }, { translateY: translateY.value }],
  }));

  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>;
};

export default SkewHover;
