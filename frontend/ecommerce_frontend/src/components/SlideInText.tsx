import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface SlideInTextProps {
  text: string;
  delay?: number;
  direction?: 'left' | 'right';
  style?: object;
}

const SlideInText: React.FC<SlideInTextProps> = ({ text, delay = 0, direction = 'left', style }) => {
  const translateX = useSharedValue(direction === 'left' ? -200 : 200);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    translateX.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.back(1.5)) });
    opacity.value = withTiming(1, { duration: 600 });
  }, [translateX, opacity, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Text style={[styles.text, style]}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  text: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});

export default SlideInText;
