import React, { useRef, useEffect } from 'react';
import { Text, StyleSheet, Animated, Easing, View } from 'react-native';
import { CheckIcon, TagIcon, ShieldIcon } from './Icons';

interface ToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onHide?: () => void;
}

const Toast: React.FC<ToastProps> = ({ visible, message, type = 'success', duration = 2500, onHide }) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, { toValue: 0, friction: 6, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, { toValue: -100, duration: 300, easing: Easing.in(Easing.cubic), useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]).start(() => onHide?.());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, translateY, opacity, duration, onHide]);

  if (!visible) return null;

  const bgColor = type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3';
  const icon = type === 'success' ? <CheckIcon size={16} color="#FFF" /> : type === 'error' ? <ShieldIcon size={16} color="#FFF" /> : <TagIcon size={16} color="#FFF" />;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }], opacity, backgroundColor: bgColor }]}>
      {icon}
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', top: 60, left: 16, right: 16, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingVertical: 14, borderRadius: 12, zIndex: 9999, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  message: { color: '#FFF', fontSize: 14, fontWeight: '600', flex: 1 },
});

export default Toast;
