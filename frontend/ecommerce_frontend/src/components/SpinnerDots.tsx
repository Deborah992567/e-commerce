import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface SpinnerDotsProps {
  size?: number;
  color?: string;
  dotCount?: number;
}

const SpinnerDots: React.FC<SpinnerDotsProps> = ({ size = 40, color = '#FF5722', dotCount = 8 }) => {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      -1,
    );
  }, [rotation]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={[styles.container, { width: size, height: size }, containerStyle]}>
      {Array.from({ length: dotCount }).map((_, i) => {
        const angle = (360 / dotCount) * i;
        const opacity = 0.2 + (i / dotCount) * 0.8;
        return (
          <View
            key={i}
            style={[
              styles.dot,
              {
                width: size * 0.2,
                height: size * 0.2,
                borderRadius: size * 0.1,
                backgroundColor: color,
                opacity,
                top: size / 2 + Math.sin((angle * Math.PI) / 180) * (size * 0.35) - size * 0.1,
                left: size / 2 + Math.cos((angle * Math.PI) / 180) * (size * 0.35) - size * 0.1,
              },
            ]}
          />
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'relative' },
  dot: { position: 'absolute' },
});

export default SpinnerDots;
