import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TextInput, Alert } from 'react-native';
import { api } from '../services/api';

type Deck = {
    id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
  };

export default function HomeScreen({ navigation }: any) {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [newDeckName, setNewDeckName] = useState('');

  const fetchDecks = async () => {
    try {
      const response = await api.get('/deck/fetch-many');
      setDecks(response.data.value.data.decks);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar decks');
    }
  };

  const createDeck = async () => {
    if (!newDeckName.trim()) {
      Alert.alert('Aviso', 'Digite um nome para o deck');
      return;
    }
    try {
      await api.post('/deck/create', { name: newDeckName });
      setNewDeckName('');
      fetchDecks();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar deck');
    }
  };

  useEffect(() => {
    fetchDecks();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Seus Decks</Text>

      <FlatList
        data={decks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text>{item.name}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                <Button title="Estudar" onPress={() => navigation.navigate('Study', { deckId: item.id })} />
                <Button title="Criar Flashcard" onPress={() => navigation.navigate('Deck', { deckId: item.id })} />
              </View>
            </View>
          )}
      />

      <TextInput
        placeholder="Nome do novo deck"
        value={newDeckName}
        onChangeText={setNewDeckName}
        style={{ borderWidth: 1, marginVertical: 10 }}
      />
      <Button title="Criar Deck" onPress={createDeck} />
    </View>
  );
}
