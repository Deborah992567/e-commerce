import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, ViewStyle } from 'react-native';

interface PulseAnimationProps {
  color?: string;
  size?: number;
  active?: boolean;
  children?: React.ReactNode;
  style?: ViewStyle;
}

const RING_COUNT = 3;
const SCALE_START = 0.5;
const SCALE_END = 2.5;
const OPACITY_START = 0.8;
const PULSE_DURATION = 1500;

const PulseAnimation: React.FC<PulseAnimationProps> = ({
  color = '#FF5722',
  size = 100,
  active = true,
  children,
  style,
}) => {
  const animatedValues = useRef(
    Array.from({ length: RING_COUNT }, () => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    if (!active) return;

    const animations = animatedValues.map((value, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * (PULSE_DURATION / RING_COUNT)),
          Animated.timing(value, {
            toValue: 1,
            duration: PULSE_DURATION,
            useNativeDriver: true,
          }),
        ]),
      ),
    );

    const composite = Animated.parallel(animations);
    composite.start();

    return () => composite.stop();
  }, [active]);

  const scale = (value: Animated.Value) =>
    value.interpolate({
      inputRange: [0, 1],
      outputRange: [SCALE_START, SCALE_END],
    });

  const opacity = (value: Animated.Value) =>
    value.interpolate({
      inputRange: [0, 1],
      outputRange: [OPACITY_START, 0],
    });

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {animatedValues.map((value, index) => (
        <Animated.View
          key={index}
          style={[
            styles.ring,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderColor: color,
              transform: [{ scale: scale(value) }],
              opacity: opacity(value),
            },
          ]}
        />
      ))}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 3,
  },
  content: {
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PulseAnimation;
