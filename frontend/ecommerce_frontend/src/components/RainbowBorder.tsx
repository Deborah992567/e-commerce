import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface RainbowBorderProps {
  children: React.ReactNode;
  borderWidth?: number;
  style?: object;
}

const COLORS = ['#FF5722', '#FFD700', '#4ECDC4', '#7C4DFF', '#FF6B9D', '#00E676'];

const RainbowBorder: React.FC<RainbowBorderProps> = ({ children, borderWidth = 2, style }) => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withRepeat(
      withTiming(COLORS.length, { duration: 3000, easing: Easing.linear }),
      -1,
    );
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const idx = Math.floor(progress.value) % COLORS.length;
    const nextIdx = (idx + 1) % COLORS.length;
    const fraction = progress.value - Math.floor(progress.value);
    const r1 = parseInt(COLORS[idx].slice(1, 3), 16);
    const g1 = parseInt(COLORS[idx].slice(3, 5), 16);
    const b1 = parseInt(COLORS[idx].slice(5, 7), 16);
    const r2 = parseInt(COLORS[nextIdx].slice(1, 3), 16);
    const g2 = parseInt(COLORS[nextIdx].slice(3, 5), 16);
    const b2 = parseInt(COLORS[nextIdx].slice(5, 7), 16);
    const r = Math.round(r1 + (r2 - r1) * fraction);
    const g = Math.round(g1 + (g2 - g1) * fraction);
    const b = Math.round(b1 + (b2 - b1) * fraction);
    const color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    return {
      borderColor: color,
      borderWidth,
      shadowColor: color,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
      elevation: 6,
    };
  });

  return <Animated.View style={[styles.container, animatedStyle, style]}>{children}</Animated.View>;
};

const styles = StyleSheet.create({
  container: { borderRadius: 16 },
});

export default RainbowBorder;
