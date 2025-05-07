import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { api, setAuthToken } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth', { email, password });
      const token = response.data.value.data.access_token;

      await AsyncStorage.setItem('authToken', token);
      setAuthToken(token);
      setAuthToken(token);
      navigation.replace('Home');
    } catch (error: any) {
      Alert.alert('Erro', 'Login inválido');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Senha:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1 }} />
      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Criar Conta" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}
