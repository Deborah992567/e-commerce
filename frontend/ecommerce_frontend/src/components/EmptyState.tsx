import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PackageIcon } from './Icons';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title = 'Nothing here yet', message = 'Items will appear here', icon }) => (
  <View style={styles.container}>
    {icon || <PackageIcon size={64} color="#4A4A55" />}
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 12 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FFF', textAlign: 'center' },
  message: { fontSize: 14, color: '#A0A0A0', textAlign: 'center' },
});

export default EmptyState;
