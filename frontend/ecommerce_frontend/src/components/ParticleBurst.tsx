import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withDelay, Easing } from 'react-native-reanimated';

interface ParticleBurstProps {
  active?: boolean;
  color?: string;
  count?: number;
  size?: number;
}

const Particle: React.FC<{
  index: number;
  total: number;
  color: string;
  size: number;
  active: boolean;
}> = ({ index, total, color, size, active }) => {
  const progress = useSharedValue(0);
  const angle = (360 / total) * index;

  React.useEffect(() => {
    if (active) {
      progress.value = 0;
      progress.value = withDelay(
        index * 30,
        withRepeat(withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) }), -1, false),
      );
    }
  }, [active, progress, index]);

  const animatedStyle = useAnimatedStyle(() => {
    const rad = (angle * Math.PI) / 180;
    const distance = 30 + progress.value * 40;
    return {
      transform: [
        { translateX: Math.cos(rad) * distance },
        { translateY: Math.sin(rad) * distance },
      ],
      opacity: 1 - progress.value,
      scale: 1 - progress.value * 0.5,
    };
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        animatedStyle,
      ]}
    />
  );
};

const ParticleBurst: React.FC<ParticleBurstProps> = ({ active = true, color = '#FF5722', count = 12, size = 6 }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, i) => (
        <Particle key={i} index={i} total={count} color={color} size={size} active={active} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', width: 0, height: 0, alignItems: 'center', justifyContent: 'center' },
  particle: { position: 'absolute' },
});

export default ParticleBurst;
