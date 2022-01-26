import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import styles from './styles';
import {Styles, Fonts, Colors, Metrics} from '../../../assets/styles';
import {Text} from '../../../components';

const HeaderTab = props => {
  const {
    onPress,
    state,
    data = [
      {
        id: 0,
        title: '',
      },
    ],
  } = props;
  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={`tab-${index}`}
            activeOpacity={1}
            onPress={() => onPress(item['id'])}
            style={[
              styles.button_action,
              state == item['id']
                ? {borderBottomColor: Colors.appOrange}
                : null,
            ]}>
            <Text
              text={item['title']}
              size={Fonts['size']['android']['action']}
              font={Fonts['style']['android']['medium']}
              color={
                state == item['id'] ? Colors.appColor_logi : Colors.appTextBlack
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default HeaderTab;
