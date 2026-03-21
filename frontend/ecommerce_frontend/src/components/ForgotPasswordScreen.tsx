import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CTAButton from './CTAButton';

interface ForgotPasswordScreenProps {
  onBack?: () => void;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [displayedTitle, setDisplayedTitle] = useState('');
  const fullTitle = 'Reset Password';

  useEffect(() => {
    // Typewriter animation
    let index = 0;
    const typewriterInterval = setInterval(() => {
      if (index < fullTitle.length) {
        setDisplayedTitle(fullTitle.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, 100); // 100ms per character

    return () => clearInterval(typewriterInterval);
  }, []);

  const handleResetPassword = () => {
    // Replace with real password reset logic
    Alert.alert('Password Reset', `Reset link sent to: ${email}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{displayedTitle}</Text>
      <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A0A0A0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <CTAButton title="Send Reset Link" onPress={handleResetPassword} color="#7B1FA2" size="lg" />
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>{onBack ? '← Back to Login' : ''}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18181F',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#23232B',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 24,
  },
  back: {
    color: '#E8C97A',
    marginTop: 24,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;