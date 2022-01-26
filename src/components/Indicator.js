import React, {useState} from 'react';
import {View, ViewStyle} from 'react-native';
import {MaterialIndicator} from 'react-native-indicators';

import {Styles, Colors} from '../assets/styles';

const AppIndicator = props => {
  const {
    visible = false,
    backdropColor = 'transparent',
    color = Colors.appColor,
    style,
    size = 50,
  } = props;

  return visible ? (
    <View
      style={[
        {
          ...Styles.center,
          backgroundColor: backdropColor,
          position: 'absolute',
          zIndex: 100000,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        style,
      ]}>
      <MaterialIndicator color={color} size={size} />
    </View>
  ) : null;
};

export default AppIndicator;
