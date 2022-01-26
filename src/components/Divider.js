import React from 'react';
import {View, ViewStyle} from 'react-native';
import {Colors} from '../assets/styles';

const AppDivider = props => {
  const {
    width = '100%',
    height = 0.8,
    color = Colors.appLightGrayColor,
    style = {},
  } = props;

  return <View style={[{width, height, backgroundColor: color}, style]} />;
};
export default AppDivider;
