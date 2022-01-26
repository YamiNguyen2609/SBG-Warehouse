import React from 'react';
import {View, Text, ViewStyle, TextProps, Platform} from 'react-native';
import {Colors} from '../assets/styles';

const AppText = props => {
  let {
    text = '',
    size = 0,
    color = Colors.appTextBlack,
    line = undefined,
    bold = false,
    font = 'Roboto',
    style = {},
    align = 'left',
    space = 0.5,
    transform = 'none',
    direction = 'ltr',
    width = undefined,
    height = undefined,
  } = props;

  text = String(text);

  return (
    <View style={style}>
      <Text
        numberOfLines={line}
        style={[
          {
            textAlign: align,
            fontSize: size,
            color: color,
            fontWeight: bold
              ? Platform.OS == 'ios'
                ? '500'
                : 'bold'
              : 'normal',
            fontFamily: font,
            textAlignVertical: 'center',
            letterSpacing: space,
            direction: direction,
            textTransform: transform,
            width: width,
            height: height,
          },
          style,
        ]}>
        {text}
      </Text>
    </View>
  );
};

export default AppText;
