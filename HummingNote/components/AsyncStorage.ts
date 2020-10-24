import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key: any, value: any) => {
  try {
    await AsyncStorage.setItem('@' + key, value);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem('@' + key);
    if (value === "" || value === null) {
      return null;
    }
    return value
  } catch (e) {
    console.log(e);
    return null;
  }
};
