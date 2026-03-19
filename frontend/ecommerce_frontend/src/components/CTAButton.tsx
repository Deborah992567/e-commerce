import React, { useRef, useEffect } from 'react';
import {
  Animated,
  Pressable,
  Text,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface CTAButtonProps {
  title: string;
  onPress: () => void;
  color?: string;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: string; // e.g. '→' '＋' '♡'
}

const CTAButton: React.FC<CTAButtonProps> = ({
  title,
  onPress,
  color = '#E8C97A',
  variant = 'solid',
  size = 'md',
  disabled = false,
  icon,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const shimmer = useRef(new Animated.Value(0)).current;
  const mountOpacity = useRef(new Animated.Value(0)).current;
  const mountY = useRef(new Animated.Value(10)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Mount animation
    Animated.parallel([
      Animated.timing(mountOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(mountY, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();

    // Looping shimmer sweep on solid variant
    if (variant === 'solid' && !disabled) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmer, { toValue: 1, duration: 2000, delay: 1000, useNativeDriver: true }),
          Animated.timing(shimmer, { toValue: 0, duration: 0, useNativeDriver: true }),
        ])
      ).start();
    }
  }, []);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.94, useNativeDriver: true, speed: 40, bounciness: 4 }),
      Animated.timing(glowOpacity, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 12 }),
      Animated.timing(glowOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
    onPress();
  };

  const shimmerTranslate = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, 240],
  });

  const sizeStyle = SIZE_STYLES[size];

  // ── Variant-specific styles ──────────────────────────────────────────────
  const containerStyle: ViewStyle =
    variant === 'solid'
      ? { backgroundColor: disabled ? '#2A2A35' : color }
      : variant === 'outline'
      ? { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: disabled ? '#2A2A35' : color }
      : { backgroundColor: 'transparent' };

  const textColor =
    variant === 'solid'
      ? disabled ? '#4A4A5A' : '#0D0D12'
      : disabled
      ? '#4A4A5A'
      : color;

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { opacity: mountOpacity, transform: [{ translateY: mountY }] },
      ]}
    >
      {/* Outer glow on press */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.glow,
          {
            backgroundColor: color,
            opacity: glowOpacity,
            borderRadius: sizeStyle.borderRadius + 4,
          },
        ]}
      />

      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[styles.button, sizeStyle, containerStyle]}
      >
        <Animated.View style={{ transform: [{ scale }], flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {/* Shimmer sweep (solid only) */}
          {variant === 'solid' && !disabled && (
            <Animated.View
              pointerEvents="none"
              style={[
                styles.shimmerBar,
                { transform: [{ translateX: shimmerTranslate }, { rotate: '20deg' }] },
              ]}
            />
          )}

          <Text style={[styles.label, { color: textColor, fontSize: sizeStyle.fontSize }]}>
            {title}
          </Text>

          {icon && (
            <Text style={[styles.icon, { color: textColor, fontSize: sizeStyle.fontSize }]}>
              {icon}
            </Text>
          )}
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};

// ── Size tokens ────────────────────────────────────────────────────────────
const SIZE_STYLES = {
  sm: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, fontSize: 12 },
  md: { paddingHorizontal: 22, paddingVertical: 13, borderRadius: 12, fontSize: 15 },
  lg: { paddingHorizontal: 32, paddingVertical: 17, borderRadius: 14, fontSize: 17 },
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'flex-start',
    marginHorizontal: 6,
    marginVertical: 4,
  },
  glow: {
    position: 'absolute',
    inset: -6,
    opacity: 0,
    // Soft blur approximation via layered shadow
    shadowColor: '#E8C97A',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 10,
  },
  button: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shimmerBar: {
    position: 'absolute',
    width: 40,
    height: 120,
    backgroundColor: 'rgba(255,255,255,0.18)',
    top: -40,
    left: 0,
  },
  label: {
    fontWeight: '800',
    letterSpacing: 0.3,
    fontFamily: 'Courier',
  },
  icon: {
    fontWeight: '700',
  },
});

export default CTAButton;