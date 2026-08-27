import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface SpinnerBadgeProps {
  text: string;
  color?: string;
  spinDuration?: number;
  style?: object;
}

const SpinnerBadge: React.FC<SpinnerBadgeProps> = ({ text, color = '#FF5722', spinDuration = 3000, style }) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  React.useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: spinDuration, easing: Easing.linear }), -1);
    scale.value = withRepeat(withTiming(1.15, { duration: 800, easing: Easing.inOut(Easing.ease) }), -1, true);
  }, [rotation, scale, spinDuration]);

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.badge, { backgroundColor: color }, rotateStyle, style]}>
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  badge: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  text: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
});

export default SpinnerBadge;
