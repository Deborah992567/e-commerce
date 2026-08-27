import React, { useEffect, useRef, useMemo } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

interface FloatingHeartsProps {
  active: boolean;
  count?: number;
}

const COLORS = ['#FF5722', '#FF6B9D', '#FF4081', '#E91E63', '#FF1744'];

const FloatingHearts: React.FC<FloatingHeartsProps> = ({ active, count = 8 }) => {
  const animRef = useRef<Animated.CompositeAnimation | null>(null);

  const hearts = useMemo(() => {
    return Array.from({ length: count }, () => ({
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 16 + Math.random() * 16,
    }));
  }, [count]);

  const animatedValues = useMemo(() => {
    return Array.from({ length: count }, () => ({
      translateY: new Animated.Value(0),
      translateX: new Animated.Value(0),
      opacity: new Animated.Value(1),
      scale: new Animated.Value(1),
    }));
  }, [count]);

  useEffect(() => {
    if (!active) return;

    animatedValues.forEach((values) => {
      values.translateY.setValue(0);
      values.translateX.setValue(0);
      values.opacity.setValue(1);
      values.scale.setValue(1);
    });

    const animations = animatedValues.map((values) => {
      const delay = Math.random() * 1000;
      const duration = 1500 + Math.random() * 1500;
      const drift = (Math.random() - 0.5) * 100;

      return Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(values.translateY, {
            toValue: -400,
            duration,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(values.translateX, {
            toValue: drift,
            duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(values.opacity, {
            toValue: 0,
            duration,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(values.scale, {
            toValue: 0,
            duration,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]);
    });

    animRef.current = Animated.parallel(animations);
    animRef.current.start();

    return () => {
      animRef.current?.stop();
    };
  }, [active, animatedValues]);

  if (!active) return null;

  return (
    <View style={styles.container}>
      {hearts.map((heart, i) => (
        <Animated.Text
          key={i}
          style={[
            styles.heart,
            {
              fontSize: heart.size,
              color: heart.color,
              transform: [
                { translateY: animatedValues[i].translateY },
                { translateX: animatedValues[i].translateX },
                { scale: animatedValues[i].scale },
              ],
              opacity: animatedValues[i].opacity,
            },
          ]}
        >
          ♥
        </Animated.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
  heart: {
    position: 'absolute',
    bottom: 0,
  },
});

export default FloatingHearts;
