import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

const TOKEN = '@TOKEN';
const FCM_TOKEN = '@FCM_TOKEN';

const setToken = async data => {
  try {
    return await AsyncStorage.setItem(TOKEN, JSON.stringify(data));
  } catch (error) {}
};

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem(TOKEN, '');
    if (value) {
      return value;
    } else {
      return '';
    }
  } catch (error) {
    return '';
  }
};

export {setToken, getToken};
