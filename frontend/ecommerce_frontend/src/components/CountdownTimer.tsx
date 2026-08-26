import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { ClockIcon } from './Icons';

interface CountdownTimerProps {
  targetSeconds: number;
  onEnd?: () => void;
  style?: object;
}

const URGENT_THRESHOLD = 300;

const AnimatedDigit: React.FC<{ value: string; isUrgent: boolean }> = ({ value, isUrgent }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => setDisplayValue(value));
  }, [value, animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-14, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <Animated.View style={{ transform: [{ translateY }], opacity }}>
      <Text style={[styles.digit, isUrgent && styles.digitUrgent]}>{displayValue}</Text>
    </Animated.View>
  );
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetSeconds, onEnd, style }) => {
  const [remaining, setRemaining] = useState(targetSeconds);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (remaining <= 0) {
      onEnd?.();
      return;
    }
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [remaining > 0, onEnd]);

  useEffect(() => {
    if (remaining <= URGENT_THRESHOLD && remaining > 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [remaining <= URGENT_THRESHOLD, remaining]);

  const isUrgent = remaining <= URGENT_THRESHOLD;
  const h = String(Math.floor(remaining / 3600)).padStart(2, '0');
  const m = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
  const s = String(remaining % 60).padStart(2, '0');

  return (
    <Animated.View
      style={[
        styles.container,
        isUrgent && styles.containerUrgent,
        { transform: [{ scale: pulseAnim }] },
        style,
      ]}
    >
      <ClockIcon size={16} color={isUrgent ? '#FF5722' : '#808080'} />
      <AnimatedDigit value={h} isUrgent={isUrgent} />
      <Text style={[styles.separator, isUrgent && styles.separatorUrgent]}>:</Text>
      <AnimatedDigit value={m} isUrgent={isUrgent} />
      <Text style={[styles.separator, isUrgent && styles.separatorUrgent]}>:</Text>
      <AnimatedDigit value={s} isUrgent={isUrgent} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23232B',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 4,
  },
  containerUrgent: {
    backgroundColor: '#2A1A15',
    borderWidth: 1,
    borderColor: '#FF5722',
  },
  digit: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontVariant: ['tabular-nums'],
    minWidth: 26,
    textAlign: 'center',
  },
  digitUrgent: {
    color: '#FF5722',
  },
  separator: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#808080',
    marginHorizontal: 1,
  },
  separatorUrgent: {
    color: '#FF5722',
  },
});

export default CountdownTimer;
