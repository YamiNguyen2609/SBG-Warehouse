import React, {useState} from 'react';
import {TouchableOpacity, View, Switch, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import Header from '../Header';
import {
  Colors,
  Fonts,
  Images,
  Metrics,
  Styles,
} from '../../../../../assets/styles';
import {Divider, Text} from '../../../../../components';
import {version} from '../../../../../helpers/Constants';
import {replaceScreen} from '../../../../../redux/navigation';
import {
  flagTextMessage,
  showFlagMessage,
  toggleDevice,
} from '../../../../../redux/app';
import {setEmployee} from '../../../../../redux/user/employee';

const Render = props => {
  const dispatch = useDispatch();

  const logout = () => dispatch(setEmployee(undefined));

  let role = 3;
  if (props['employee']['user']) {
    role = props['employee']['user']['role'];
  }

  if (role == 1 && props['company'] != 'logi') var company = 'sbp';
  else company = props['company'];

  console.log('company', company);

  return (
    <View style={[Styles.container, styles.container]}>
      <Header {...props} company={company} />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: Metrics.margin.huge * 2,
          marginBottom: Metrics.margin.huge,
        }}>
        <View style={styles.container_button}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <View style={[styles.icon, Styles.center]}>
              <Icon
                name="ios-bluetooth"
                color={Colors[`appColor_${company}`]}
                size={Metrics.icon.normal}
              />
            </View>
            <Text
              text={'Thiết bị ngoại vi'}
              size={Fonts['size']['android']['title'] - 2}
              font={Fonts['style']['android']['medium']}
            />
          </View>
          <Switch
            trackColor={{
              false: Colors.appLightGrayColor,
              true: Colors.appPrimaryColor,
            }}
            thumbColor={
              props['isEnable'] ? Colors[`appColor_${company}`] : '#f4f3f4'
            }
            onValueChange={() => dispatch(toggleDevice(!props['isEnable']))}
            value={props['isEnable']}
          />
        </View>
        <Divider
          height={1.2}
          width={Metrics.width - Metrics.margin.large * 2}
        />
        <TouchableOpacity
          onPress={() => dispatch(replaceScreen('UserScreen'))}
          style={styles.container_button}>
          <FastImage source={Images['icAccount']} style={styles.icon} />
          <Text
            text={'Tài khoản'}
            size={Fonts['size']['android']['title'] - 2}
            font={Fonts['style']['android']['medium']}
          />
        </TouchableOpacity>
        <Divider
          height={1.2}
          width={Metrics.width - Metrics.margin.large * 2}
        />
        <TouchableOpacity onPress={logout} style={styles.container_button}>
          <FastImage source={Images['icLogout']} style={styles.icon} />
          <Text
            text={'Đăng xuất'}
            size={Fonts['size']['android']['title'] - 2}
            font={Fonts['style']['android']['medium']}
          />
        </TouchableOpacity>
        <View style={Styles.center}>
          <Text
            text={`Phiên bản${version}`}
            color={Colors.appLightGrayColor}
            size={Fonts['size']['android']['message']}
            font={Fonts['style']['android']['italic']}
          />
        </View>
      </View>
    </View>
  );
};

export default Render;
