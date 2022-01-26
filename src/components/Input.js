import React, {useImperativeHandle, useState, useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts, Metrics} from '../assets/styles';

let tempValue = '';
const AppInput = React.forwardRef((props, ref) => {
  let input = useRef(null);
  let {
    placeholder,
    placeholderColor = '#d1d1d1',
    width = Metrics.width - Metrics.margin.regular * 2,
    height = 55,
    clearMode = 'never',
    clearTextOnFocus = false,
    defaultValue = '',
    edit = true,
    enablesReturnKeyAutomatically = true,
    colorKeyboard = 'default',
    typeKeyboard = 'default',
    length = undefined,
    multiline = false,
    line = undefined,
    style = {},
    inputStyle = {},
    border = 1.5,
    color = Colors.appTextBlack,
    size = Fonts['size'][Platform.OS]['input'] + 3,
    radius = Metrics.borderRadius.medium,
    secure = false,
    font = Fonts['style'][Platform.OS]['normal'],
    textAlignVertical = 'center',
    textAlignHorizontal = 'left',
    format = null,
    callback = null,
    onChangeText,
    onSubmit,
    onFocus = () => {},
    showSoftInputOnFocus = true,
  } = props;

  const [text, setText] = useState(defaultValue);

  useImperativeHandle(ref, () => ({
    value: text,
    setText: setValue,
    focus: focus,
    blur: blur,
  }));

  const focus = () => {
    if (input) input.current.focus();
  };

  const blur = () => {
    if (input) input.current.blur();
  };

  const setValue = value => {
    setText(value);
  };

  useEffect(() => {
    if (callback && text != tempValue) {
      if (input) input.current.focus();
      tempValue = text;
      callback(text);
    }
  }, [text]);

  const onPressSubmit = () => {
    focus();
    if (onSubmit) onSubmit();
  };

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: border,
          borderColor: color,
          borderRadius: radius,
          paddingHorizontal: 10,
          justifyContent: 'center',
          margin: Metrics.margin.regular,
          width,
          height,
          overflow: 'hidden',
        },
        style,
      ]}>
      <View style={{flex: 1}}>
        <TextInput
          ref={input}
          value={format ? format(text) : text}
          showSoftInputOnFocus={showSoftInputOnFocus}
          style={[
            {
              height: height,
              color,
              fontSize: size,
              fontFamily: font,
              fontWeight: '600',
              width: '100%',
              textAlignVertical,
              textAlign: textAlignHorizontal,
            },
            inputStyle,
          ]}
          onChange={({nativeEvent: {text}}) =>
            onChangeText ? onChangeText(text) : setValue(text)
          }
          onSubmitEditing={onPressSubmit}
          placeholder={placeholder}
          clearButtonMode={clearMode}
          clearTextOnFocus={clearTextOnFocus}
          editable={edit}
          defaultValue={String(defaultValue)}
          secureTextEntry={secure}
          placeholderTextColor={placeholderColor}
          enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
          keyboardAppearance={colorKeyboard}
          keyboardType={typeKeyboard}
          maxLength={length}
          multiline={multiline}
          numberOfLines={line}
          onFocus={onFocus}
        />
      </View>
      {text ? (
        <TouchableOpacity
          hitSlop={{left: 5, right: 5, top: 5, bottom: 5}}
          style={{position: 'absolute', top: Metrics.margin.large, right: 10}}
          onPress={() => setText('')}>
          <IonIcon
            name="ios-close-circle-outline"
            size={Metrics.icon.normal}
            color={Colors.appLightGrayColor}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
});

export default AppInput;
