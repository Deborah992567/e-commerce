import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  style?: object;
}

const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  delay = 0,
  duration = 600,
  direction = 'up',
  distance = 30,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(distance)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translate, {
        toValue: 0,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translate, delay, duration]);

  const getTransform = () => {
    switch (direction) {
      case 'down':
        return [{ translateY: translate }];
      case 'left':
        return [{ translateX: translate }];
      case 'right':
        return [{ translateX: translate }];
      case 'up':
      default:
        return [{ translateY: translate }];
    }
  };

  return (
    <Animated.View
      style={[
        { opacity, transform: getTransform() },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default FadeInView;
