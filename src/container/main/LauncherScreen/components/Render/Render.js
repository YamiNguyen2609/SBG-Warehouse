import React, {useState} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';
import {Styles, Images, Metrics, Colors} from '../../../../../assets/styles';
import {Divider, Text} from '../../../../../components';

const size = Metrics.width - Metrics.margin.huge * 5;

const Render = props => {
  let {percent} = props;

  return (
    <View
      style={[
        Styles.container,
        Styles.center,
        {backgroundColor: Colors.appWhite},
      ]}>
      <FastImage source={Images.logoApp} style={{width: size, height: size}} />
      {percent > 0 ? (
        <View style={styles.container}>
          <Text
            text={`Đang cập nhật ${Math.round(percent)}%`}
            style={Styles.text}
          />
        </View>
      ) : null}
    </View>
  );
};

export default Render;
