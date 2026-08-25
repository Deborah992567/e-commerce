import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, Easing } from 'react-native';
import { ChevronRightIcon } from './Icons';

interface CTAButtonProps {
  label?: string;
  title?: string;
  onClick?: () => void;
  onPress?: () => void;
  variant?: "primary" | "ghost" | "outline";
  icon?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CTAButton: React.FC<CTAButtonProps> = ({
  label,
  title,
  onClick,
  onPress,
  variant = "primary",
  icon,
  color,
  size = 'md'
}) => {
  const buttonText = label || title;
  const buttonOnPress = onPress || onClick;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true, friction: 4 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, friction: 4 }).start();
  };

  const isPrimary = variant === 'primary';
  const bgColor = isPrimary ? (color || '#FF5722') : 'transparent';
  const borderColor = color || '#FF5722';

  const sizeStyles = {
    sm: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
    md: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10 },
    lg: { paddingHorizontal: 28, paddingVertical: 16, borderRadius: 14 },
  };

  const fontSize = size === 'sm' ? 13 : size === 'lg' ? 17 : 15;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[
          styles.button,
          sizeStyles[size],
          {
            backgroundColor: bgColor,
            borderWidth: isPrimary ? 0 : 2,
            borderColor: borderColor,
          },
        ]}
        onPress={buttonOnPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Text style={[styles.text, { color: isPrimary ? '#FFF' : color || '#FF5722', fontSize }]}>
          {buttonText}
        </Text>
        {icon && <Text style={[styles.text, { color: isPrimary ? '#FFF' : color || '#FF5722', fontSize, marginLeft: 6 }]}>{icon}</Text>}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default CTAButton;
