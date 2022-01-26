import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import r from 'reactotron-react-native';
import Swiper from 'react-native-swiper';

import {Styles} from '../../../../../assets/styles';
import Camera from '../../../../components/Camera';
import {showFlagMessage, hideFlagMessage} from '../../../../../redux/app';
import styles from './styles';
import {transferOrder} from '../../../../../redux/order/redux/transferOrder';

const Render = props => {
  const dispatch = useDispatch();

  const onBarCodeRead = (data, state) => {
    //1: camera, 2: input
    if (state == 1) {
      dispatch(
        showFlagMessage({
          item: [`Đã tìm thấy ${data}`],
          buttons: [
            {
              text: 'Quay lại',
              onPress: () => dispatch(hideFlagMessage()),
            },
            {
              text: 'Tiếp tục',
              onPress: () => {
                dispatch(hideFlagMessage());
                setTimeout(() => dispatch(transferOrder(data)), 300);
              },
            },
          ],
        }),
      );
    } else {
      if (data) dispatch(transferOrder(data));
    }
  };

  const onBack = () =>
    dispatch(
      showFlagMessage({
        item: ['Bạn muốn thoát khỏi scan đơn hàng'],
        buttons: [
          {
            text: 'Không',
            onPress: () => {
              dispatch(hideFlagMessage());
            },
          },
          {
            text: 'Có',
            onPress: () => {
              dispatch(hideFlagMessage());
              setTimeout(props.navigation.goBack, 300);
            },
          },
        ],
      }),
    );

  return (
    <View style={Styles.container}>
      <Camera
        onBack={onBack}
        text={'Chuyển giao nhận'}
        onBarCodeRead={onBarCodeRead}
        searchForm={{
          active: true,
          activeArea: true,
          placeholder: 'Nhập mã đơn hàng',
          onBarCodeRead: onBarCodeRead,
        }}
        imageForm={{
          active: false,
        }}
      />
    </View>
  );
};

export default Render;
