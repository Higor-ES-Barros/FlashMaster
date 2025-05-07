import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Importe o AsyncStorage

// Função para recuperar o token do AsyncStorage
const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token !== null) {
      return token;  // Retorna o token armazenado
    } else {
      console.log('Token não encontrado');
      return '';
    }
  } catch (error) {
    console.error('Erro ao recuperar o token', error);
    return '';
  }
};

export default function StudyScreen({ route }: any) {
  const { deckId } = route.params;
  const [card, setCard] = useState<any>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const fetchCard = async () => {
    try {
      const token = await getAuthToken();  // Recupera o token

      if (!token) {
        Alert.alert('Erro', 'Token de autenticação não encontrado');
        return;
      }

      const response = await api.post('/flashcard/fetch-random', 
        { deckId },  // Passando o deckId no corpo
        { headers: { Authorization: `Bearer ${token}` } }  // Passando o token no header
      );
      
      setCard(response.data.value.data.flashCard);
      setShowAnswer(false);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar o flashcard');
    }
  };

  useEffect(() => {
    console.log('Deck ID:', deckId);
    fetchCard();
  }, []);

  if (!card) return <Text style={{ padding: 20 }}>Carregando...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Pergunta:</Text>
      <Text style={{ marginVertical: 10 }}>{card.question}</Text>

      {showAnswer && (
        <>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Resposta:</Text>
          <Text style={{ marginVertical: 10 }}>{card.answer}</Text>
        </>
      )}

      <Button title={showAnswer ? 'Próxima' : 'Mostrar Resposta'} onPress={() => {
        if (showAnswer) fetchCard();
        else setShowAnswer(true);
      }} />
    </View>
  );
}
