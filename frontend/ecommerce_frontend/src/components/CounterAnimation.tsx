import React, { useRef, useEffect } from 'react';
import { Text, StyleSheet, Animated, Easing } from 'react-native';

interface CounterAnimationProps {
  from?: number;
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  style?: object;
}

const CounterAnimation: React.FC<CounterAnimationProps> = ({ from = 0, to, duration = 1500, prefix = '', suffix = '', style }) => {
  const animValue = useRef(new Animated.Value(from)).current;
  const [displayValue, setDisplayValue] = React.useState(from);

  useEffect(() => {
    Animated.timing(animValue, {
      toValue: to,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    const listener = animValue.addListener(({ value }) => {
      setDisplayValue(Math.round(value));
    });

    return () => animValue.removeListener(listener);
  }, [animValue, to, duration]);

  return (
    <Text style={style}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </Text>
  );
};

export default CounterAnimation;
