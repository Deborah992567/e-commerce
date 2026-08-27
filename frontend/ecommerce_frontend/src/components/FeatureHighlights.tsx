import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
import { CoinsIcon, TagIcon, TruckIcon, GiftIcon } from './Icons';

interface FeatureHighlightProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
  delay?: number;
}

const FeatureHighlight: React.FC<FeatureHighlightProps> = ({ icon, title, description, color = '#FF5722', delay = 0 }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, delay, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim, delay]);

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View style={[styles.iconCircle, { backgroundColor: color + '20' }]}>
        {icon}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color }]}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Animated.View>
  );
};

const FeatureHighlights: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Why Shop With Us?</Text>
      <FeatureHighlight icon={<CoinsIcon size={20} color="#FFD700" />} title="Best Prices" description="Unbeatable prices on every item" color="#FFD700" delay={0} />
      <FeatureHighlight icon={<TruckIcon size={20} color="#4ECDC4" />} title="Free Delivery" description="Free shipping on orders over ₦5,000" color="#4ECDC4" delay={150} />
      <FeatureHighlight icon={<GiftIcon size={20} color="#FF6B9D" />} title="Daily Rewards" description="Spin, earn coins, and claim prizes" color="#FF6B9D" delay={300} />
      <FeatureHighlight icon={<TagIcon size={20} color="#7C4DFF" />} title="Exclusive Deals" description="Flash sales and clearance events" color="#7C4DFF" delay={450} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 8 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF', marginBottom: 16 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#23232B', borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#2D2D3840' },
  iconCircle: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  textContainer: { flex: 1 },
  title: { fontSize: 15, fontWeight: 'bold', marginBottom: 2 },
  description: { fontSize: 13, color: '#A0A0A0' },
});

export { FeatureHighlight, FeatureHighlights };
export default FeatureHighlights;
