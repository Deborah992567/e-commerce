import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ShieldIcon } from './Icons';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <View style={styles.container}>
          <ShieldIcon size={48} color="#FF5722" />
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>{this.state.error?.message || 'An unexpected error occurred'}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => this.setState({ hasError: false, error: null })}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D0D12', padding: 24, gap: 12 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  message: { fontSize: 14, color: '#A0A0A0', textAlign: 'center' },
  retryBtn: { backgroundColor: '#FF5722', borderRadius: 10, paddingHorizontal: 24, paddingVertical: 12, marginTop: 8 },
  retryText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});

export default ErrorBoundary;
