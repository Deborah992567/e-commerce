import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface GradientTextProps {
  children: string;
  colors?: string[];
  style?: object;
}

const GradientText: React.FC<GradientTextProps> = ({ children, colors = ['#FF5722', '#FF9800'], style }) => {
  return <Text style={[styles.text, { color: colors[0] }, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
  },
});

export default GradientText;
