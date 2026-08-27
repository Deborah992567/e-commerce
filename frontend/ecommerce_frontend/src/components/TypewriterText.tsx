import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet, View } from 'react-native';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  style?: object;
  cursorColor?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 80,
  onComplete,
  style,
  cursorColor = '#FF5722',
}) => {
  const [displayed, setDisplayed] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');
    const typeInterval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        clearInterval(typeInterval);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(typeInterval);
  }, [text, speed, onComplete]);

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]}>{displayed}</Text>
      <Text style={[styles.cursor, { color: cursorColor, opacity: cursorVisible ? 1 : 0 }]}>|</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  text: { color: '#FFF', fontSize: 16 },
  cursor: { fontSize: 16, fontWeight: 'bold' },
});

export default TypewriterText;
