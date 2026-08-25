import React, { useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';

interface FloatingActionProps {
  onPress: () => void;
  icon?: React.ReactNode;
  color?: string;
  size?: number;
}

const FloatingAction: React.FC<FloatingActionProps> = ({ onPress, icon, color = '#FF5722', size = 56 }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -6, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
  }, [scaleAnim, floatAnim]);

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }, { translateY: floatAnim }] }]}>
      <TouchableOpacity style={[styles.button, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }]} onPress={onPress} activeOpacity={0.8}>
        {icon}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 100,
    elevation: 8,
    shadowColor: '#FF5722',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingAction;
