import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { ChevronLeftIcon } from './Icons';

interface AnimatedHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ title, subtitle, onBack, rightAction }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <ChevronLeftIcon size={24} color="#FF5722" />
        </TouchableOpacity>
      )}
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {rightAction && <View style={styles.rightAction}>{rightAction}</View>}
      {!onBack && !rightAction && <View style={{ width: 32 }} />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#2D2D3840' },
  backBtn: { padding: 8, marginRight: 4 },
  textWrap: { flex: 1 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  subtitle: { fontSize: 12, color: '#A0A0A0', marginTop: 2 },
  rightAction: { padding: 8 },
});

export default AnimatedHeader;
