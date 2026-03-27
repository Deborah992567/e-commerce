import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

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

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      paddingHorizontal: size === 'sm' ? 12 : size === 'lg' ? 24 : 16,
      paddingVertical: size === 'sm' ? 8 : size === 'lg' ? 16 : 12,
    };

    if (variant === 'outline') {
      return {
        ...baseStyle,
        borderWidth: 2,
        borderColor: color || '#7B1FA2',
        backgroundColor: 'transparent',
      };
    } else if (variant === 'ghost') {
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: color || '#7B1FA2',
      };
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontSize: size === 'sm' ? 14 : size === 'lg' ? 18 : 16,
      fontWeight: '600',
    };

    if (variant === 'outline') {
      return {
        ...baseTextStyle,
        color: color || '#7B1FA2',
      };
    } else if (variant === 'ghost') {
      return {
        ...baseTextStyle,
        color: '#7B1FA2',
      };
    } else {
      return {
        ...baseTextStyle,
        color: variant === 'primary' ? '#23232B' : 'white',
      };
    }
  };

  return (
    <TouchableOpacity style={getButtonStyle()} onPress={buttonOnPress}>
      <Text style={getTextStyle()}>{buttonText}</Text>
      {icon && <Text style={[getTextStyle(), { marginLeft: 8 }]}>{icon}</Text>}
    </TouchableOpacity>
  );
};

export default CTAButton;