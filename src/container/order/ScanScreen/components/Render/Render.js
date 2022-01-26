import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import r from 'reactotron-react-native';
import Swiper from 'react-native-swiper';

import {Styles, Metrics, Colors} from '../../../../../assets/styles';
import Camera from '../../../../components/Camera';
import {showFlagMessage, hideFlagMessage} from '../../../../../redux/app';
import styles from './styles';
import Order from '../Order';

const Render = props => {
  const dispatch = useDispatch();
  const swiper = useRef(null);
  const order = useRef(null);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(props['flag']);

  if (flag != props['flag']) {
    setData([]);
    setFlag(props['flag']);
    swiper.current.scrollTo(0);
  }

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
                setTimeout(
                  () => order.current.onAdd({data, selected: false}),
                  300,
                );
              },
            },
          ],
        }),
      );
    } else {
      if (data) order.current.onAdd({data, selected: false});
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
    <Swiper
      ref={swiper}
      showsPagination={false}
      scrollEnabled={false}
      loop={false}>
      <View style={Styles.container}>
        <Camera
          onBack={onBack}
          text={'Scan đơn hàng'}
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
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => (swiper.current ? swiper.current.scrollTo(1) : {})}
          style={styles.button_package}>
          <Icon
            name={'package'}
            size={Metrics.icon.huge}
            color={Colors.appWhite}
          />
        </TouchableOpacity>
      </View>
      <View style={[Styles.container, {backgroundColor: 'red'}]}>
        <Order
          ref={order}
          onBack={() => (swiper.current ? swiper.current.scrollTo(0) : {})}
          data={data}
        />
      </View>
    </Swiper>
  );
};

export default Render;
