import React from 'react';
import {View, TouchableOpacity, Keyboard} from 'react-native';
import Text from './Text';
import {Colors, Fonts, Metrics, Styles} from '../assets/styles';

const AppButton = props => {
  let {
    text = '',
    type = '',
    backgroundColor = Colors.appColor,
    color = Colors.appWhite,
    radius = Metrics.borderRadius.medium,
    width = undefined,
    height = undefined,
    render = () => <View />,
    style = {},
    border = 0,
    borderColor = Colors.appGrayColor,
    disabled = false,
    size,
  } = props;

  switch (type) {
    case 'confirm':
      color = Colors.appWhite;
      backgroundColor = Colors.appPrimaryColor;
      break;
    case 'cancel':
      color = Colors.appWhite;
      backgroundColor = Colors.appGrayColor;
      break;
    case 'error':
      color = Colors.appWhite;
      backgroundColor = Colors.appRed;
      break;
    case 'success':
      color = Colors.appWhite;
      backgroundColor = Colors.appGreen;
      break;
    case 'submit':
      color = Colors.appWhite;
      backgroundColor = Colors.appColor;
      break;
    default:
      break;
  }

  const onPress = () => {
    disabled = true;
    Keyboard.dismiss();
    if (props.onPress) props.onPress();
    setTimeout(() => {
      disabled = false;
    }, 100);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={disabled}
      hitSlop={{left: 5, right: 5, top: 5, bottom: 0}}
      style={[
        {
          ...Styles.center,
          backgroundColor,
          borderRadius: radius,
          borderWidth: border,
          borderColor,
          width,
          height,
          paddingHorizontal: Metrics.margin.regular,
          paddingVertical: Metrics.margin.large,
        },
        style,
      ]}>
      {text ? (
        <Text
          text={text}
          font={Fonts['style']['android']['medium']}
          style={Styles.button}
          color={color}
          size={size}
        />
      ) : null}
      {render()}
    </TouchableOpacity>
  );
};

export default AppButton;
