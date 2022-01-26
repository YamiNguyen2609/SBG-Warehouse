import {Dimensions, Platform} from 'react-native';
import Info from 'react-native-device-info';

const {width, height} = Dimensions.get('window');
const ratio = height / width;

const isIphoneX = () => {
  return Platform.OS == 'ios' && (height > 800 || width > 800) && ratio > 1.6;
};

const rabbit = isIphoneX();

const isTablet = () => {
  return (
    (Platform.OS === 'android' && Info.isTablet()) ||
    (Platform.OS === 'ios' && ratio < 1.6)
  );
};

const tablet = isTablet();

const isPhoneSmall = () => {
  return Platform.OS === 'ios' && width < 375;
};

const small = isPhoneSmall();

export default {rabbit, tablet, small};
