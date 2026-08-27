import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface BounceArrowProps {
  direction?: 'down' | 'up' | 'right';
  color?: string;
  size?: number;
}

const BounceArrow: React.FC<BounceArrowProps> = ({ direction = 'down', color = '#FF5722', size = 20 }) => {
  const translate = useSharedValue(0);

  React.useEffect(() => {
    translate.value = withRepeat(
      withTiming(direction === 'right' ? 6 : 8, { duration: 500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [translate, direction]);

  const animatedStyle = useAnimatedStyle(() => {
    const transforms: object[] = [];
    if (direction === 'right') {
      transforms.push({ translateX: translate.value });
    } else if (direction === 'down') {
      transforms.push({ translateY: translate.value });
    } else {
      transforms.push({ translateY: -translate.value });
    }
    return { transform: transforms };
  });

  const arrows: Record<string, string> = { down: '▼', up: '▲', right: '▶' };

  return (
    <Animated.View style={animatedStyle}>
      <Text style={{ color, fontSize: size, fontWeight: 'bold' }}>{arrows[direction]}</Text>
    </Animated.View>
  );
};

export default BounceArrow;
