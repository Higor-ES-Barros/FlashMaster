import AsyncStorage from '@react-native-async-storage/async-storage';

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