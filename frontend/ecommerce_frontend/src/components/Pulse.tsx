import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

interface PulseProps {
  children: React.ReactNode;
  duration?: number;
  minScale?: number;
  maxScale?: number;
  style?: object;
}

const Pulse: React.FC<PulseProps> = ({
  children,
  duration = 1500,
  minScale = 1,
  maxScale = 1.05,
  style,
}) => {
  const scaleAnim = useRef(new Animated.Value(minScale)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: maxScale,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: minScale,
          duration: duration / 2,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim, duration, minScale, maxScale]);

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      {children}
    </Animated.View>
  );
};

export default Pulse;
