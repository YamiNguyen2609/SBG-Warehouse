import React, {useImperativeHandle, useState, useEffect, useRef} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

import styles from './styles';
import {Colors, Fonts, Metrics, Styles} from '../../../../../assets/styles';
import Header from '../../../../components/Header';
import {Button, Text} from '../../../../../components';
import {finishCheckIn} from '../../../../../redux/order/redux/finishCheckIn';

const Order = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const onPress = () =>
    dispatch(
      finishCheckIn({
        HAWBs: props['data'].map(e => e['HAWB']),
        stationId: props['stationId'],
      }),
    );

  return (
    <View
      style={[
        Styles.container,
        Styles.center,
        {paddingBottom: Metrics.margin.large},
      ]}>
      <Header
        text={'Danh sách đã check in'}
        onBack={props.onBack}
        company={'sbp'}
      />
      <FlatList
        data={props['data']}
        style={{width: Metrics.width}}
        ItemSeparatorComponent={() => (
          <View style={{height: Metrics.margin.large}} />
        )}
        renderItem={({item, index}) => (
          <View
            activeOpacity={1}
            style={[
              styles.container,
              !index ? {marginTop: Metrics.margin.large} : null,
              index + 1 == props['data'].length
                ? {marginBottom: Metrics.margin.large}
                : null,
            ]}>
            <Text
              text={item['HAWB']}
              size={Fonts['size']['android']['message']}
            />
          </View>
        )}
      />
      <Button
        text={'Xác nhận'}
        type={'confirm'}
        width={Metrics.width - Metrics.margin.large * 2}
        onPress={onPress}
      />
    </View>
  );
});

export default Order;
