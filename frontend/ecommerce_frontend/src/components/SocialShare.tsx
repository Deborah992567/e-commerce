import React, { useRef, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { HeartIcon, MailIcon, GiftIcon } from './Icons';
import AnimatedCard from './AnimatedCard';

interface SocialShareProps {
  url: string;
  title: string;
  onShare?: (platform: string) => void;
}

const platforms = [
  { name: 'Wishlist', Icon: HeartIcon, color: '#FF2D55', bgColor: 'rgba(255,45,85,0.15)' },
  { name: 'Email', Icon: MailIcon, color: '#4ECDC4', bgColor: 'rgba(78,205,196,0.15)' },
  { name: 'Referral', Icon: GiftIcon, color: '#FFD700', bgColor: 'rgba(255,215,0,0.15)' },
];

const SocialShare: React.FC<SocialShareProps> = ({ url, title, onShare }) => {
  return (
    <View style={styles.container}>
      <AnimatedCard delay={0}>
        <Text style={styles.heading}>Share</Text>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
      </AnimatedCard>
      <View style={styles.buttonsRow}>
        {platforms.map((platform, index) => (
          <AnimatedCard key={platform.name} delay={index * 100}>
            <ShareButton
              platform={platform}
              onPress={() => onShare?.(platform.name.toLowerCase())}
            />
          </AnimatedCard>
        ))}
      </View>
    </View>
  );
};

interface ShareButtonProps {
  platform: typeof platforms[number];
  onPress: () => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({ platform, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.9, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 3, tension: 100, useNativeDriver: true }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.button, { backgroundColor: platform.bgColor }, { transform: [{ scale: scaleAnim }] }]}>
        <platform.Icon size={28} color={platform.color} />
        <Text style={[styles.buttonLabel, { color: platform.color }]}>{platform.name}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23232B',
    borderRadius: 16,
    padding: 20,
  },
  heading: {
    color: '#FF5722',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    color: '#AAA',
    fontSize: 14,
    marginBottom: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    width: 100,
  },
  buttonLabel: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default SocialShare;
