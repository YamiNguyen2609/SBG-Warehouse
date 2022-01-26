import {Platform, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default {
  size: {
    ios: {
      message: width < 360 ? 12 : 15,
      normal: width < 360 ? 12 : 17,
      title: width < 360 ? 12 : 17,
      button: width < 360 ? 12 : 17,
      action: width < 360 ? 12 : 13,
      control: width < 360 ? 12 : 15,
      input: width < 360 ? 12 : 17,
    },
    android: {
      message: width < 360 ? 13 : 16,
      normal: width < 360 ? 11 : 14,
      title: width < 360 ? 17 : 20,
      button: width < 360 ? 11 : 14,
      action: width < 360 ? 11 : 14,
      control: width < 360 ? 11 : 14,
      input: width < 360 ? 13 : 16,
    },
  },
  style: {
    ios: {},
    android: {
      normal: 'Roboto',
      medium: 'Roboto-Medium',
      bold: 'Roboto-Bold',
      italic: 'Roboto-Italic',
    },
  },
};
