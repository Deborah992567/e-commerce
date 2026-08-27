import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming } from 'react-native-reanimated';

interface ShakeAnimationProps {
  children: React.ReactNode;
  trigger: number;
  shakeCount?: number;
}

const ShakeAnimation: React.FC<ShakeAnimationProps> = ({ children, trigger, shakeCount = 3 }) => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (trigger === 0) return;
    const steps: number[] = [];
    for (let i = 0; i < shakeCount; i++) {
      steps.push(-10, 10, -8, 8, -4, 4);
    }
    steps.push(0);
    translateX.value = withSequence(
      ...steps.map((v) => withTiming(v, { duration: 60 }))
    );
  }, [trigger, shakeCount, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return <Animated.View style={[styles.container, animatedStyle]}>{children}</Animated.View>;
};

const styles = StyleSheet.create({
  container: {},
});

export default ShakeAnimation;
