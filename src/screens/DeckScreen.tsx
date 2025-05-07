import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { api } from "../services/api";

export default function DeckScreen({ route, navigation }: any) {
  const { deckId } = route.params;
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleCreateFlashcard = async () => {
    if (!question || !answer) {
      Alert.alert("Erro", "Preencha a pergunta e a resposta");
      return;
    }

    try {
      await api.post("/flashcard/create", {
        question,
        answer,
        deckId,
      });
      Alert.alert("Sucesso", "Flashcard criado!");
      setQuestion("");
      setAnswer("");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar o flashcard");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: "bold" }}>Criar Flashcard</Text>

      <TextInput
        placeholder="Pergunta"
        value={question}
        onChangeText={setQuestion}
        style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
      />

      <TextInput
        placeholder="Resposta"
        value={answer}
        onChangeText={setAnswer}
        style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
      />

      <Button title="Salvar Flashcard" onPress={handleCreateFlashcard} />
    </View>
  );
}
