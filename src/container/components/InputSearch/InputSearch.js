import React, {useRef, useState, useEffect, useImperativeHandle} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import r from 'reactotron-react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {Text, Input, Divider} from '../../../components';
import {Styles, Fonts, Colors, Metrics} from '../../../assets/styles';
import {store} from '../../../redux/ConfigureStore';

const InputSearch = React.forwardRef((props, ref) => {
  const input = useRef(null);
  const [value, setValue] = useState('');
  const [isShow, setIsShow] = useState(true);
  const {
    data = [],
    visible,
    itemSelect,
    title = 'Chọn Location',
    placeholder = 'Nhập Location',
    errorText = 'Location không tồn tại',
    style = {},
  } = props;

  useImperativeHandle(ref, () => ({
    focus: () => {
      setTimeout(() => {
        setValue('');
        setIsShow(true);
        if (input.current) input.current.focus();
      }, 250);
    },
  }));

  const onChange = value => {
    setValue(value);
    input.current.setText(value);
  };

  let items = data.filter(x => {
    if (value != '') {
      return (
        String(x['value'])
          .toUpperCase()
          .indexOf(String(value).toUpperCase().replace(/[ ]/g, '')) > -1
      );
    }

    return true;
  });

  if (items.length == 1 && isShow) {
    setIsShow(false);
    props['onPress'](items[0]);
  }

  useEffect(() => {
    if (visible)
      setTimeout(() => {
        if (input.current) input.current.focus();
      }, 250);
  }, [visible]);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.button, isShow ? {borderBottomWidth: 1.5} : null]}
        onPress={() => setIsShow(!isShow)}>
        <Text
          text={itemSelect['value'] != '' ? itemSelect['value'] : title}
          size={Fonts['size']['android']['message']}
        />
        {itemSelect['value'] != '' ? (
          <TouchableOpacity
            hitSlop={{left: 5, right: 5, top: 5, bottom: 5}}
            onPress={() => {
              setValue('');
              props['onPress']({
                id: 0,
                value: '',
                quantity: 0,
                isScrap: false,
              });
            }}>
            <IonIcon
              name="ios-close-circle-outline"
              size={Metrics.icon.normal}
              color={Colors.appLightGrayColor}
            />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
      {isShow ? (
        <View>
          <Input
            ref={input}
            placeholder={placeholder}
            width={'100%'}
            border={0}
            callback={onChange}
            style={[
              {margin: 0},
              value.length > 0
                ? {
                    borderBottomWidth: 1.5,
                    borderRadius: 0,
                    borderBottomColor: Colors.appLightGrayColor,
                  }
                : null,
            ]}
            showSoftInputOnFocus={!store.getState()['app']['deviceState']}
          />
          {value.length > 0 ? (
            items.length > 0 ? (
              <FlatList
                data={items}
                keyboardShouldPersistTaps={'always'}
                ItemSeparatorComponent={() => <Divider height={1.5} />}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => {
                      props['onPress'](item);
                      setIsShow(false);
                    }}
                    style={styles.item}>
                    <Text
                      text={item['value']}
                      size={Fonts['size']['android']['action'] - 1}
                      font={Fonts['style']['android']['medium']}
                    />
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View
                style={{
                  padding: Metrics.margin.regular,
                }}>
                <Text
                  text={errorText}
                  size={Fonts['size']['android']['action'] - 1}
                  font={Fonts['style']['android']['medium']}
                  color={Colors.appRed}
                />
              </View>
            )
          ) : null}
        </View>
      ) : null}
    </View>
  );
});

export default InputSearch;
