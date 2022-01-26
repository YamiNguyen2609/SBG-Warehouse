import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';

import styles from './styles';
import {Styles, Images, Metrics, Colors} from '../../../../../assets/styles';
import {Button, Text} from '../../../../../components';
import Header from '../../../../components/Header';
import {replaceScreen} from '../../../../../redux/navigation';

const Render = props => {
  const dispatch = useDispatch();
  const {company, employee} = props;
  const {full_name, code, phone, licenseNumber, licenseExpire, team} = employee;
  return (
    <View style={Styles.container}>
      <Header
        onBack={props.navigation.goBack}
        company={company}
        text={'Thông tin hồ sơ nhân viên'}
      />
      <View
        style={[
          Styles.container,
          {paddingHorizontal: Metrics.margin.regular * 2},
        ]}>
        <View style={styles.container}>
          <Text text={'Mã nhân viên'} style={Styles.text} />
          <Text text={code} bold={true} style={Styles.text} />
        </View>
        <View style={styles.container}>
          <Text text={'Họ tên'} style={Styles.text} />
          <Text text={full_name} bold={true} style={Styles.text} />
        </View>
        <View style={styles.container}>
          <Text text={'Số điện thoại'} style={Styles.text} />
          <Text text={phone} bold={true} style={Styles.text} />
        </View>
        <View style={styles.container}>
          <Text text={'Bằng lái xe'} style={Styles.text} />
          <Text text={licenseNumber ?? ''} bold={true} style={Styles.text} />
        </View>
        <View style={styles.container}>
          <Text text={'Ngày hết hạn'} style={Styles.text} />
          <Text
            text={licenseExpire != 'Invalid date' ? licenseExpire : ''}
            bold={true}
            style={Styles.text}
          />
        </View>
        <View style={styles.container}>
          <Text text={'Đội Shipping'} style={Styles.text} />
          <Text text={team ?? ''} bold={true} style={Styles.text} />
        </View>
      </View>
      <Button
        onPress={() => dispatch(replaceScreen('PasswordScreen'))}
        text={'Đổi mật khẩu'}
        backgroundColor={Colors[`appColor_${company}`]}
        width={Metrics.width - Metrics.margin.regular * 2}
        style={{
          marginHorizontal: Metrics.margin.regular,
          marginBottom: Metrics.margin.regular,
        }}
      />
    </View>
  );
};

export default Render;
