import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withDelay, Easing } from 'react-native-reanimated';

interface WaveAnimationProps {
  height?: number;
  color?: string;
}

const WaveLayer: React.FC<{ delay: number; speed: number; color: string; size: number }> = ({ delay, speed, color, size }) => {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withDelay(delay, withRepeat(withTiming(360, { duration: speed, easing: Easing.linear }), -1));
  }, [delay, speed, rotation]);

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: -size / 2,
          left: -size / 4,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
};

const WaveAnimation: React.FC<WaveAnimationProps> = ({ height = 100, color = '#FF5722' }) => {
  return (
    <View style={[styles.container, { height }]}>
      <WaveLayer delay={0} speed={8000} color={color + '20'} size={300} />
      <WaveLayer delay={300} speed={6000} color={color + '40'} size={260} />
      <WaveLayer delay={600} speed={4000} color={color + '60'} size={220} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { overflow: 'hidden', position: 'relative' },
});

export default WaveAnimation;
