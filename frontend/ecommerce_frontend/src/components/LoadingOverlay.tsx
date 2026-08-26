import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible, message = 'Loading...' }) => {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
      Animated.loop(Animated.timing(spinAnim, { toValue: 1, duration: 1000, easing: Easing.linear, useNativeDriver: true })).start();
    } else {
      Animated.timing(opacityAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    }
  }, [visible, spinAnim, opacityAnim]);

  if (!visible) return null;

  const rotation = spinAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
      <Animated.View style={[styles.spinner, { transform: [{ rotate: rotation }] }]}>
        <View style={styles.spinnerInner} />
      </Animated.View>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(13,13,18,0.85)', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  spinner: { width: 48, height: 48, borderRadius: 24, borderWidth: 3, borderColor: '#2D2D38', borderTopColor: '#FF5722' },
  spinnerInner: { flex: 1 },
  message: { color: '#A0A0A0', fontSize: 14, marginTop: 16, fontWeight: '500' },
});

export default LoadingOverlay;
