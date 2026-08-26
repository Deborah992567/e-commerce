import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchIcon, TrashIcon } from './Icons';

interface SearchHistoryProps {
  onSelect: (term: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ onSelect }) => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('searchHistory').then((data) => {
      if (data) setHistory(JSON.parse(data));
    });
  }, []);

  const clearHistory = async () => {
    await AsyncStorage.removeItem('searchHistory');
    setHistory([]);
  };

  if (history.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Searches</Text>
        <TouchableOpacity onPress={clearHistory}>
          <TrashIcon size={16} color="#FF5722" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={history}
        keyExtractor={(item, i) => `${item}-${i}`}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => onSelect(item)}>
            <SearchIcon size={14} color="#A0A0A0" />
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 14, fontWeight: '600', color: '#A0A0A0' },
  item: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#2D2D3820' },
  itemText: { color: '#FFF', fontSize: 14 },
});

export default SearchHistory;
