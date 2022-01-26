import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import r from 'reactotron-react-native';
import Swiper from 'react-native-swiper';

import {Styles, Metrics} from '../../../../../assets/styles';
import Camera from '../../../../components/Camera';
import Information from '../Information';
import {showFlagMessage, hideFlagMessage} from '../../../../../redux/app';
import {Button} from '../../../../../components';
import {getSelling} from '../../../../../redux/order/redux/getSelling';
import {updateSelling} from '../../../../../redux/order/redux/updateSelling';

const Render = props => {
  const dispatch = useDispatch();
  const swiper = useRef(null);
  const info = useRef(null);
  const [code, setCode] = useState('');
  const [flag, setFlag] = useState(props['flag']);
  const [flagUpdate, setFlagUpdate] = useState(props['flagUpdate']);

  const onPressConfirm = () => {
    let params = {};
    var data = info.current.value.filter(x => x['orderWeight'] != '');

    params['packageDetails'] = data;
    params['orderId'] = props['data']['orderId'];

    dispatch(updateSelling(params));
  };

  useEffect(() => {
    if (flag != props['flag']) {
      setFlag(props['flag']);
      swiper.current.scrollTo(1);
    }
  }, [props['flag']]);

  useEffect(() => {
    if (flagUpdate != props['flagUpdate']) {
      setFlagUpdate(props['flagUpdate']);
      swiper.current.scrollTo(0);
    }
  }, [props['flagUpdate']]);

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
                setTimeout(() => {
                  dispatch(getSelling(data));
                }, 300);
              },
            },
          ],
        }),
      );
    } else {
      if (data) {
        dispatch(getSelling(data));
      }
    }
  };

  const onBack = () =>
    dispatch(
      showFlagMessage({
        item: ['Bạn muốn thoát khỏi rex scan đơn hàng'],
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
      <Swiper loop={false} ref={swiper} showsPagination={false}>
        <View style={Styles.container}>
          <Camera
            onBack={onBack}
            text={'Rex Scan'}
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
        <View style={Styles.container}>
          <Information
            data={props['data']}
            ref={info}
            onBack={() => {
              swiper.current.scrollTo(0);
            }}
          />
          <Button
            onPress={onPressConfirm}
            text={'Xác nhận'}
            type={'confirm'}
            width={Metrics.width - Metrics.margin.large * 2}
            style={{
              margin: Metrics.margin.large,
            }}
          />
        </View>
      </Swiper>
    </View>
  );
};

export default Render;
