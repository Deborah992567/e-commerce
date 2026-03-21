import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CTAButton from './CTAButton';

interface SignupScreenProps {
  onBack?: () => void;
  onGoToLogin?: () => void;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ onBack, onGoToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayedTitle, setDisplayedTitle] = useState('');
  const fullTitle = 'Create Account';

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

  const handleSignup = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }
    // Replace with real signup logic
    Alert.alert('Signup', `Name: ${name}\nEmail: ${email}\nPassword: ${password}`);
  };

  const handleGoogleSignIn = () => {
    // Replace with real Google sign-in logic
    Alert.alert('Google Sign-In', 'Google sign-in pressed!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{displayedTitle}</Text>
      <Text style={styles.subtitle}>Join us today</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#A0A0A0"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#A0A0A0"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <CTAButton title="Sign Up" onPress={handleSignup} color="#7B1FA2" size="lg" />
      <Text style={styles.or}>or</Text>
      <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignIn}>
        <Text style={styles.googleBtnText}>Sign up with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={onGoToLogin}>
        <Text style={styles.loginBtnText}>Already have an account? Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.back}>{onBack ? '← Back' : ''}</Text>
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
  loginBtn: {
    backgroundColor: 'transparent',
    marginBottom: 8,
  },
  loginBtnText: {
    color: '#E8C97A',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  back: {
    color: '#E8C97A',
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SignupScreen;