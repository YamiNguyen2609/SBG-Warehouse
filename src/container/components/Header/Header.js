import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {Styles, Colors, Fonts, Metrics} from '../../../assets/styles';
import {Text} from '../../../components';

const Header = props => {
  const {text, company, style, right, left} = props;

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: Colors[`appColor_${company}`]},
        style,
      ]}>
      {!left ? (
        props.onBack ? (
          <TouchableOpacity
            hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
            onPress={props.onBack}
            style={styles.icon}>
            <Icon
              name="ios-chevron-back"
              color={company ? Colors.appWhite : Colors.appTextBlack}
              size={Metrics.icon.large}
              font={Fonts['style']['android']['medium']}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.icon} />
        )
      ) : (
        left
      )}
      <Text
        text={text}
        size={Fonts['size']['android']['title']}
        font={Fonts['style']['android']['medium']}
        color={company ? Colors.appWhite : Colors.appTextBlack}
      />
      {!right ? <View style={styles.icon} /> : right}
    </View>
  );
};

export default Header;
