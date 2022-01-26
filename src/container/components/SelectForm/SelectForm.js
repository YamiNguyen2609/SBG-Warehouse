import React, {useState} from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

import styles from './styles';
import {Divider, Text} from '../../../components';
import {Fonts, Colors, Styles, Metrics} from '../../../assets/styles';

const SelectForm = props => {
  const [state, setState] = useState(false);
  const {
    data = [],
    defaultValue = {id: 0, value: ''},
    style,
    title,
    styleTitle,
    isSearch,
  } = props;

  const onPress = item => {
    setState(false);
    if (props.onChange) props.onChange(item);
  };

  return (
    <TouchableOpacity
      onPress={() => setState(!state)}
      activeOpacity={1}
      style={[styles.container, style]}>
      <View style={[styles.container_title, styleTitle]}>
        <Text
          text={defaultValue.value}
          color={Colors.overlay5}
          size={Fonts['size']['android']['message']}
        />
        <Icon
          name="ios-caret-down-outline"
          size={Metrics.icon.small}
          color={Colors.overlay6}
        />
      </View>
      <Modal
        style={[Styles.modal, {justifyContent: 'flex-end'}]}
        isVisible={state}>
        <View style={styles.container_title_list}>
          <Text
            text={title}
            color={Colors.overlay5}
            size={Fonts['size']['android']['title']}
            font={Fonts['style']['android']['bold']}
          />
          <TouchableOpacity
            hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
            onPress={() => setState(false)}
            style={styles.icon}>
            <Icon
              name="ios-close"
              color={Colors.overlay5}
              size={Metrics.icon.large}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            backgroundColor: 'red',
            backgroundColor: Colors.appWhite,
          }}>
          <FlatList
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={[
                  styles.item,
                  defaultValue['id'] == item['id']
                    ? {backgroundColor: Colors.appColor_logi}
                    : null,
                ]}
                // activeOpacity={1}
                onPress={() => onPress(item)}>
                <Text
                  text={item.value}
                  color={
                    defaultValue['id'] == item['id']
                      ? Colors.appWhite
                      : Colors.overlay5
                  }
                  size={Fonts['size']['android']['message']}
                />
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => (
              <Divider height={0.8} width={'100%'} />
            )}
          />
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default SelectForm;
