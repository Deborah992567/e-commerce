import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface ProgressDotsProps {
  total: number;
  current: number;
  activeColor?: string;
  inactiveColor?: string;
  size?: number;
}

const ProgressDots: React.FC<ProgressDotsProps> = ({
  total,
  current,
  activeColor = '#FF5722',
  inactiveColor = '#2D2D38',
  size = 8,
}) => {
  const pulse = useSharedValue(1);

  React.useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1.4, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [pulse]);

  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current;
        return (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                width: isActive ? size * 1.6 : size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: isActive ? activeColor : inactiveColor,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  dot: {},
});

export default ProgressDots;
