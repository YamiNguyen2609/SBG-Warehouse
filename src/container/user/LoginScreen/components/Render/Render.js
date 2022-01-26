import React, {useRef, useState} from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import r from 'reactotron-react-native';

import styles from './styles';
import {
  Styles,
  Images,
  Metrics,
  Colors,
  Fonts,
} from '../../../../../assets/styles';
import {Button, Input, Text} from '../../../../../components';
import {loginUser} from '../../../../../redux/user/redux/loginUser';

const size = Metrics.width - Metrics.margin.huge * 5;

const Render = props => {
  const username = useRef(null);
  const password = useRef(null);
  const [isPassword, setIsPassword] = useState(true);
  const dispatch = useDispatch();

  const onLogin = () =>
    dispatch(loginUser(username.current.value, password.current.value));

  return (
    <View style={[Styles.container, Styles.center, Styles.background]}>
      <FastImage
        source={Images.logoAppTrans}
        style={{width: size, height: size}}
      />
      <View
        style={[Styles.card, styles.container, {elevation: 0, borderWidth: 0}]}>
        <Input
          ref={username}
          placeholder={'nhập mã nhân viên'}
          placeholderColor={Colors.appLightGrayColor}
          style={{
            backgroundColor: Colors.appWhite,
            borderWidth: 0,
            ...Styles.input,
          }}
        />
        <View style={[Styles.input, styles.password]}>
          <Input
            ref={password}
            style={{marginLeft: -Metrics.margin.tiny}}
            border={0}
            width={'103%'}
            secure={isPassword}
            placeholder={'nhập mật khẩu'}
            placeholderColor={Colors.appLightGrayColor}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setIsPassword(!isPassword)}>
            <Icon
              name={isPassword ? 'ios-eye-outline' : 'ios-eye-off-outline'}
              color={Colors.overlay5}
              size={Metrics.icon.normal}
            />
          </TouchableOpacity>
        </View>
        <Button
          text={'Đăng nhập'}
          color={Colors.appColor}
          style={styles.button}
          onPress={onLogin}
        />
      </View>
    </View>
  );
};

export default Render;
