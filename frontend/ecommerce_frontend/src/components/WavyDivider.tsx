import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, Easing, View } from 'react-native';

interface WavyDividerProps {
  color?: string;
  height?: number;
}

const WavyDivider: React.FC<WavyDividerProps> = ({ color = '#FF572240', height = 20 }) => {
  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [waveAnim]);

  const translateX = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40],
  });

  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.line} />
      <View style={[styles.dot, { backgroundColor: color }]} />
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 16,
    gap: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#2D2D3840',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    transform: [{ rotate: '45deg' }],
  },
});

export default WavyDivider;
