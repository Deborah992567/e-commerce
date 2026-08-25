import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import { StarIcon } from './Icons';

interface AnimatedStarProps {
  filled?: boolean;
  size?: number;
  delay?: number;
  color?: string;
  onPress?: () => void;
}

const AnimatedStar: React.FC<AnimatedStarProps> = ({ filled = false, size = 20, delay = 0, color = '#FFD700', onPress }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, delay, friction: 4, tension: 60, useNativeDriver: true }),
      Animated.timing(rotateAnim, { toValue: 1, delay, duration: 600, easing: Easing.out(Easing.back(1.5)), useNativeDriver: true }),
    ]).start();
  }, [scaleAnim, rotateAnim, delay]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.star, { transform: [{ scale: scaleAnim }, { rotate: rotation }] }]} onTouchEnd={onPress}>
      <StarIcon size={size} color={filled ? color : '#4A4A55'} filled={filled} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  star: {
    padding: 2,
  },
});

export default AnimatedStar;
