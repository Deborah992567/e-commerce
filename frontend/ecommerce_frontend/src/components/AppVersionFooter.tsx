import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const AppVersionFooter: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dez Collection</Text>
      <Text style={styles.version}>v1.0.0</Text>
      <Text style={styles.madeWith}>Made with ❤️</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  version: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  madeWith: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
});

export default AppVersionFooter;
