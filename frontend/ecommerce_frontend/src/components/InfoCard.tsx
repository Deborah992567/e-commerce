import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedCard from './AnimatedCard';
import CTAButton from './CTAButton';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  delay?: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description, actionLabel, onAction, delay = 0 }) => {
  return (
    <AnimatedCard delay={delay} style={styles.card}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {actionLabel && (
        <View style={styles.actionWrapper}>
          <CTAButton title={actionLabel} onPress={onAction} variant="ghost" size="sm" />
        </View>
      )}
    </AnimatedCard>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#23232B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FF572230',
  },
  iconContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#A0A0A0',
    lineHeight: 20,
  },
  actionWrapper: {
    marginTop: 16,
    alignSelf: 'flex-start',
  },
});

export default InfoCard;
