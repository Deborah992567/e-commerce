import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

interface ShimmerProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: object;
}

const Shimmer: React.FC<ShimmerProps> = ({ width = '100%', height = 20, borderRadius = 8, style }) => {
  const translateX = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [translateX]);

  const interpolatedTranslateX = translateX.interpolate({
    inputRange: [-1, 1],
    outputRange: [-300, 300],
  });

  return (
    <View
      style={[
        styles.container,
        { width, height, borderRadius },
        style,
      ]}
    >
      <View style={[styles.background, { borderRadius }]} />
      <Animated.View
        style={[
          styles.shimmer,
          {
            borderRadius,
            transform: [{ translateX: interpolatedTranslateX }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#23232B',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#23232B',
  },
  shimmer: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
});

export default Shimmer;

export const ShimmerProductCard: React.FC = () => (
  <View style={shimmerCardStyles.card}>
    <Shimmer height={140} borderRadius={8} />
    <View style={shimmerCardStyles.info}>
      <Shimmer height={12} width="70%" borderRadius={4} />
      <Shimmer height={10} width="50%" borderRadius={4} style={{ marginTop: 6 }} />
      <Shimmer height={14} width="40%" borderRadius={4} style={{ marginTop: 8 }} />
    </View>
  </View>
);

const shimmerCardStyles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#23232B',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  info: {
    padding: 10,
  },
});
