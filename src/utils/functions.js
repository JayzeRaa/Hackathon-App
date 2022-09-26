import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async ({value, key}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async ({key}) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {}
};

export const removeData = async ({key}) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {}
};

export function NumberFormatRegex(text, decimal) {
  if (text) {
    if (!decimal)
      return Number(text)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    else
      return Math.ceil(Number(text))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return 0;
}