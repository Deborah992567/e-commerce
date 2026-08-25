import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

interface NotificationDotProps {
  count?: number;
  color?: string;
  size?: number;
}

const NotificationDot: React.FC<NotificationDotProps> = ({ count = 1, color = '#FF2D55', size = 18 }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 4, tension: 80, useNativeDriver: true }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
  }, [scaleAnim, pulseAnim]);

  if (count <= 0) return null;

  return (
    <Animated.View style={[styles.dot, { backgroundColor: color, minWidth: size, height: size, borderRadius: size / 2, transform: [{ scale: scaleAnim }, { scale: pulseAnim }] }]}>
      {count > 0 && <Animated.Text style={styles.text}>{count > 99 ? '99+' : count}</Animated.Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  dot: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    position: 'absolute',
    top: -4,
    right: -4,
  },
  text: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default NotificationDot;
