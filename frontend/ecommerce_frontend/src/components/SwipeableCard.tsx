import React, { useRef } from 'react';
import { StyleSheet, Animated, PanResponder, View } from 'react-native';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  style?: object;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({ children, onSwipeLeft, onSwipeRight, style }) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dx) > 5,
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -100) {
          Animated.spring(translateX, { toValue: -300, useNativeDriver: true }).start(() => onSwipeLeft?.());
        } else if (gestureState.dx > 100) {
          Animated.spring(translateX, { toValue: 300, useNativeDriver: true }).start(() => onSwipeRight?.());
        } else {
          Animated.spring(translateX, { toValue: 0, friction: 5, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View style={[{ transform: [{ translateX }] }, style]} {...panResponder.panHandlers}>
      {children}
    </Animated.View>
  );
};

export default SwipeableCard;
