import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CTAButton from './CTAButton';

interface LoginScreenProps {
  onBack?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Replace with real authentication logic
    Alert.alert('Login', `Email: ${email}\nPassword: ${password}`);
  };

  const handleGoogleSignIn = () => {
    // Replace with real Google sign-in logic
    Alert.alert('Google Sign-In', 'Google sign-in pressed!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A0A0A0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A0A0A0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CTAButton title="Login" onPress={handleLogin} color="#7B1FA2" size="lg" />
      <Text style={styles.or}>or</Text>
      <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignIn}>
        <Text style={styles.googleBtnText}>Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.forgot}>{onBack ? '← Back' : 'Forgot password?'}</Text>
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
    marginBottom: 16,
  },
  or: {
    color: '#A0A0A0',
    marginVertical: 12,
    fontSize: 14,
  },
  googleBtn: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 16,
  },
  googleBtnText: {
    color: '#23232B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgot: {
    color: '#E8C97A',
    marginTop: 12,
    fontSize: 14,
  },
});

export default LoginScreen;
