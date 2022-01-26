import React, {Component, useState} from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import moment from 'moment';
import r from 'reactotron-react-native';

import styles from './styles';
import {Colors, Metrics, Styles, Fonts} from '../../../assets/styles';
import {Text, Button} from '../../../components';

const Picker = props => {
  const [value, setValue] = useState(new Date());
  const {visible} = props;
  return (
    <Modal
      isVisible={visible}
      style={[Styles.modal, {justifyContent: 'flex-end'}]}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.appWhite,
          width: '100%',
        }}>
        <View
          style={[Styles.center, {paddingVertical: Metrics.margin.regular}]}>
          <Text
            text={'Ngày hết hạn'}
            size={Fonts['size']['android']['title']}
            font={Fonts['style']['android']['medium']}
          />
        </View>
        <DatePicker
          open={true}
          date={value}
          mode={'date'}
          onDateChange={date => setValue(date)}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: Metrics.margin.regular,
            paddingHorizontal: Metrics.margin.regular,
          }}>
          <Button
            text={'Hủy'}
            type={'cancel'}
            width={Metrics.width / 2 - Metrics.margin.regular * 2}
            style={{
              margin: Metrics.margin.regular,
            }}
            onPress={props['close']}
          />
          <Button
            text={'Xác nhận'}
            type={'confirm'}
            width={Metrics.width / 2 - Metrics.margin.regular * 2}
            style={{
              margin: Metrics.margin.regular,
            }}
            onPress={() => {
              props['submit'](value);
              props['close']();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Picker;
