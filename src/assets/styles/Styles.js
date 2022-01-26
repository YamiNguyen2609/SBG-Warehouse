import {Platform, TextStyle} from 'react-native';
import Metrics from './Metrics';
import Fonts from './Fonts';
import Colors from './Colors';

const container = {
  flex: 1,
  backgroundColor: '#f2f0f0',
  position: 'relative',
  overflow: 'hidden',
};

const background = {
  backgroundColor: Colors.appColor,
};

const card = {
  flex: 1,
  backgroundColor: Colors.appWhite,
  position: 'relative',
  margin: Metrics.margin.regular,
  borderRadius: Metrics.borderRadius.medium,
  padding: Metrics.margin.regular,
  elevation: 5,
  borderWidth: 2,
  borderColor: Colors.appLightGrayColor,
};

const input = {
  borderWidth: 0.8,
  borderColor: Colors.appLightGrayColor,
  borderRadius: Metrics.borderRadius.medium,
  height: 55,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: Metrics.margin.regular,
  backgroundColor: Colors.appWhite,
};

const modal = {
  margin: 0,
  padding: 0,
  overflow: 'hidden',
  zIndex: 10,
};

const center = {
  alignItems: 'center',
  justifyContent: 'center',
};

const header = {
  backgroundColor: 'red',
  paddingTop: Metrics.margin.huge * 2 + Metrics.margin.regular,
  paddingBottom: Metrics.margin.huge,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
};

const title = {
  fontSize: Fonts['size'][Platform.OS]['title'],
  fontWeight: Platform.OS == 'android' ? 'bold' : '400',
};

const text = {
  fontSize: Fonts['size'][Platform.OS]['normal'],
};

const button = {
  fontSize: Fonts['size'][Platform.OS]['button'] + 3,
  fontWeight: Platform.OS == 'android' ? 'bold' : '400',
};

const control = {
  fontSize: Fonts['size'][Platform.OS]['control'],
  fontWeight: Platform.OS == 'android' ? 'bold' : '400',
  color: Colors.appTextBlack,
};

export default {
  container,
  input,
  modal,
  center,
  header,
  title,
  button,
  text,
  control,
  card,
  background,
};
