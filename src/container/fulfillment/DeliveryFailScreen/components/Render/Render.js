import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  Animated,
  FlatList,
  Keyboard,
} from 'react-native';
import {useDispatch} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';

import {Styles, Metrics, Colors, Fonts} from '../../../../../assets/styles';
import Camera from '../../../../components/Camera';
import styles from './styles';
import Header from '../../../../components/Header';
import {showFlagMessage, hideFlagMessage} from '../../../../../redux/app';
import {Input, Text} from '../../../../../components';
import SelectForm from '../../../../components/SelectForm';
import {returnOrder} from '../../../../../redux/order/redux/returnOrder';

const formAnimation = new Animated.ValueXY({x: 0, y: 0});

const Render = props => {
  let isCamera = false;
  const dispatch = useDispatch();
  const [reason, setReason] = useState({id: '', value: 'Chọn mã lỗi'});
  const input = useRef(null);
  const [flag, setFlag] = useState(props['flag']);

  useEffect(() => {
    if (props['flag'] != flag) {
      input.current.setText('');
      input.current.focus();
    }
  }, [props['flag']]);

  const onMove = index => {
    if (index == 0) {
      isCamera = false;
      if (input.current) input.current.focus();
    } else {
      isCamera = true;
      Keyboard.dismiss();
    }
    Animated.spring(formAnimation, {
      toValue: {x: -Metrics.width * index, y: 0},
      speed: 100,
      useNativeDriver: false,
    }).start();
  };

  const onPressConfirm = data => {
    let item = isCamera ? data : input.current.value;
    if (reason.id == '') {
      return showMessage({
        message: 'Lỗi trả đơn hàng',
        description: 'Mã lỗi không được để trống',
        type: 'warning',
      });
    }

    return dispatch(
      returnOrder({
        orderNumber: item,
        reason: reason['id'],
      }),
    );
  };

  const onBarCodeRead = (data, state) => {
    //1: camera, 2: input
    if (isCamera) {
      value = data;
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
                    dispatch(onPressConfirm(data));
                  }, 300);
                },
              },
            ],
          }),
        );
      } else {
        if (data) {
          dispatch(onPressConfirm(data));
        }
      }
    }
  };

  let item_reasons = [];
  if (props['reasons'].length > 0) {
    item_reasons = props['reasons'].map(x => {
      return {
        id: x['code'],
        value: `[${x['code']}] ${x['name'] ? x['name']['vi'] : ''}`,
      };
    });
  }
  return (
    <Animated.View
      style={[
        Styles.container,
        {
          flexDirection: 'row',
          width: Metrics.width * 2,
          flex: 1,
          backgroundColor: Colors.appWhite,
        },
        formAnimation.getLayout(),
      ]}>
      <View style={[Styles.container, {width: Metrics.width}]}>
        <Header
          onBack={props.navigation.goBack}
          text={'Đơn hàng trả về kho'}
          company={'logi'}
          right={
            <TouchableOpacity onPress={() => onMove(1)}>
              <IonIcon
                name={'ios-barcode-outline'}
                size={Metrics.icon.regular}
                color={Colors.appWhite}
              />
            </TouchableOpacity>
          }
        />
        <View style={[styles.container_counter, {paddingVertical: 0}]}>
          <View style={{flex: 1}}>
            <Input
              placeholder={'Nhập mã đơn hàng'}
              ref={input}
              style={styles.input}
              onSubmit={onPressConfirm}
            />
          </View>
          <TouchableOpacity
            style={styles.button_action}
            onPress={onPressConfirm}>
            <Text text={'Xong'} size={Fonts['size']['android']['message']} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: Metrics.margin.regular,
            backgroundColor: Colors.appWhite,
            marginBottom: Metrics.margin.regular,
          }}>
          <SelectForm
            title={'Chọn mã lỗi'}
            style={{marginBottom: Metrics.margin.regular}}
            styleTitle={{height: 55}}
            data={item_reasons}
            defaultValue={reason}
            onChange={setReason}
          />
        </View>
      </View>
      <Camera
        onBack={() => onMove(0)}
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
    </Animated.View>
  );
};

export default Render;
