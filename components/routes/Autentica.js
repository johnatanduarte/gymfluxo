import AsyncStorage from '@react-native-community/async-storage';

export const setToken = async (token) => {
    await AsyncStorage.setItem('userToken', token);
  };

export const clearToken = async () => {
    await AsyncStorage.clear();
    navigation.navigate('TelaLogin');
  };

export const getToken = async () => {
  const userToken = await AsyncStorage.getItem('userToken');
  return userToken;
};
