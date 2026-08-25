import React, { useRef, useEffect } from 'react';
import { Text, StyleSheet, Animated, View } from 'react-native';

interface AnimatedBadgeProps {
  label: string;
  color?: string;
  pulse?: boolean;
}

const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({ label, color = '#FF5722', pulse = false }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (pulse) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, { toValue: 1.1, duration: 600, useNativeDriver: true }),
          Animated.timing(scaleAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [pulse, scaleAnim]);

  return (
    <Animated.View style={[styles.badge, { backgroundColor: color }, { transform: [{ scale: scaleAnim }] }]}>
      <Text style={styles.text}>{label}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  text: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default AnimatedBadge;
