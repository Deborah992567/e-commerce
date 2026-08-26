import React, { useCallback, useRef, useState } from 'react';
import { Animated, GestureResponderEvent, Pressable, StyleSheet, View } from 'react-native';

interface RippleEffectProps {
  children: React.ReactNode;
  color?: string;
  duration?: number;
  maxScale?: number;
  style?: object;
  onPress?: () => void;
}

interface Ripple {
  key: number;
  x: number;
  y: number;
  anim: Animated.Value;
}

const RippleEffect: React.FC<RippleEffectProps> = ({
  children,
  color = 'rgba(255,87,34,0.3)',
  duration = 400,
  maxScale = 4,
  style,
  onPress,
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const counter = useRef(0);

  const handlePressIn = useCallback(
    (event: GestureResponderEvent) => {
      const { locationX, locationY } = event.nativeEvent;
      const anim = new Animated.Value(0);
      const key = counter.current++;

      setRipples((prev) => [...prev, { key, x: locationX, y: locationY, anim }]);

      Animated.timing(anim, {
        toValue: maxScale,
        duration,
        useNativeDriver: true,
      }).start(() => {
        setRipples((prev) => prev.filter((r) => r.key !== key));
      });
    },
    [duration, maxScale],
  );

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPress={onPress}
      style={[styles.container, style]}
    >
      <View style={styles.content}>{children}</View>
      {ripples.map((ripple) => (
        <Animated.View
          key={ripple.key}
          style={[
            styles.ripple,
            {
              left: ripple.x - 10,
              top: ripple.y - 10,
              backgroundColor: color,
              opacity: ripple.anim.interpolate({
                inputRange: [0, maxScale],
                outputRange: [0.5, 0],
              }),
              transform: [{ scale: ripple.anim }],
            },
          ]}
        />
      ))}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    zIndex: 1,
  },
  ripple: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    zIndex: 0,
  },
});

export default RippleEffect;
