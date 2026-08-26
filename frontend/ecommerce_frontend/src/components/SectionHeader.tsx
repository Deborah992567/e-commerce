import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FadeInView from './FadeInView';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  onAction?: () => void;
  actionLabel?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  onAction,
  actionLabel = 'See All',
}) => (
  <FadeInView duration={500}>
    <View style={styles.container}>
      <View style={styles.textGroup}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.accentLine} />
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {onAction ? (
        <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
          <Text style={styles.actionLabel}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  </FadeInView>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textGroup: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  accentLine: {
    width: 40,
    height: 3,
    backgroundColor: '#FF5722',
    borderRadius: 2,
    marginTop: 6,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#A0A0A0',
    marginTop: 2,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF5722',
    marginTop: 2,
  },
});

export default SectionHeader;
