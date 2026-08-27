import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { ShieldIcon, HeartIcon } from './Icons';

interface TrustBadgeProps {
  icon: React.ReactNode;
  label: string;
  delay?: number;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ icon, label, delay = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 6, tension: 40, delay, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, scaleAnim, delay]);

  return (
    <Animated.View style={[styles.badge, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
      {icon}
      <Text style={styles.label}>{label}</Text>
    </Animated.View>
  );
};

const TrustBadges: React.FC = () => (
  <View style={styles.row}>
    <TrustBadge icon={<ShieldIcon size={16} color="#4ECDC4" />} label="Secure" delay={0} />
    <TrustBadge icon={<HeartIcon size={16} color="#FF6B9D" />} label="Trusted" delay={100} />
    <TrustBadge icon={<ShieldIcon size={16} color="#FFD700" />} label="Verified" delay={200} />
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'center', gap: 16, paddingVertical: 12 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#23232B', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: '#2D2D3840' },
  label: { fontSize: 11, color: '#A0A0A0', fontWeight: '600' },
});

export { TrustBadge, TrustBadges };
export default TrustBadges;
