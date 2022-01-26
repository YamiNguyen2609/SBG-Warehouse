import React, {useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, Animated} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import r from 'reactotron-react-native';

import styles from './styles';
import {Styles, Colors, Fonts, Metrics} from '../../../../../assets/styles';
import {Text, Input, Button} from '../../../../../components';
import Header from '../../../../components/Header';
import Camera from '../../../../components/Camera';
import ModalLocation from '../../../../components/ModalLocation';
import {showFlagMessage, hideFlagMessage} from '../../../../../redux/app';
import {getLot} from '../../../../../redux/fulfillment/redux/getLot';
import {transferLocation} from '../../../../../redux/fulfillment/redux/transferLocation';

const formAnimation = new Animated.ValueXY({x: 0, y: 0});
let isCamera = false;
let flagLocation = 0;
let flag = 0;

const onMove = index => {
  Animated.spring(formAnimation, {
    toValue: {x: -Metrics.width * index, y: 0},
    speed: 100,
    useNativeDriver: false,
  }).start();
};

const onPressCamera = status => {
  if (status) {
    isCamera = true;
    onMove(1);
  } else {
    onMove(0);
    setTimeout(() => {
      isCamera = false;
    }, 250);
  }
};

const TransferConfirm = props => {
  const dispatch = useDispatch();
  const {data, goBack, locations} = props;
  const input = useRef(null);
  const [visible, setVisible] = useState(false);
  const [lot, setLot] = useState({
    id: 0,
    value: '',
    quantity: 0,
  });

  useEffect(() => {
    if (props['flag_location'] != flagLocation) {
      flagLocation = props['flag_location'];
      if (props['location']['id'] != 0) {
        setLot({
          id: props['location']['locationId'],
          value: props['location']['locationName'],
        });
        onPressCamera(0);
      } else
        showMessage({
          type: 'warning',
          message: 'Scan mã kho',
          description: `${props['location']['locationName']} không tồn tại`,
        });
    }
  }, [props['flag_location']]);

  useEffect(() => {
    if (props['flag_transfer'] != flag) {
      flag = props['flag_transfer'];
      props['onRefresh']();
      props['goBack']();
    }
  }, [props['flag_transfer']]);

  useEffect(() => {
    setLot({
      id: '',
      value: '',
    });
  }, [data]);

  const onBarCodeRead = (data, state) => {
    //1: camera, 2: input
    if (isCamera) {
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
                  setTimeout(() => dispatch(getLot(data)), 300);
                },
              },
            ],
          }),
        );
      } else {
        if (data) dispatch(getLot(data));
      }
    }
  };

  const onPressConfirm = () => {
    if (lot.id == 0)
      return showMessage({
        type: 'warning',
        message: 'Put đơn hàng',
        description: 'Location không được để trống',
      });

    if (parseFloat(input.current.value) > data['quantity'])
      return showMessage({
        type: 'warning',
        message: 'Put đơn hàng',
        description: 'Số lượng PICK vượt quá số lượng còn lại',
      });

    let params = {
      product_name: data['productName'],
      location_name: lot.value,
      sourceLocationId: data['locationId'],
      destinationLocationId: lot.id,
      quantity: parseFloat(input.current.value),
      productId: data['productId'],
      lotId: data['lotId'],
    };

    r.log('data', params);

    dispatch(transferLocation(params));
  };

  return (
    <View style={styles.container}>
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
        <View style={styles.container}>
          <Header
            onBack={goBack}
            text={'Xác nhận chuyển'}
            company={'logi'}
            right={
              <TouchableOpacity
                onPress={() => onPressCamera(true)}
                style={{marginRight: Metrics.margin.small}}>
                <IonIcon
                  name="ios-barcode-outline"
                  size={Metrics.icon.regular}
                  color={Colors.appWhite}
                />
              </TouchableOpacity>
            }
          />
          <View style={styles.header}>
            <View style={styles.text}>
              <Text
                text={data['productName']}
                size={Fonts['size']['android']['action'] - 1}
                font={Fonts['style']['android']['medium']}
                align={'center'}
              />
            </View>
          </View>
          <View style={{paddingHorizontal: Metrics.margin.large, flex: 1}}>
            <Text
              text={'Số lượng cần chuyển'}
              size={Fonts['size']['android']['message']}
              font={Fonts['style']['android']['medium']}
              align={'center'}
              style={{marginTop: Metrics.margin.regular}}
            />
            {data['quantity'] > 0 ? (
              <Input
                ref={input}
                textAlignHorizontal={'center'}
                typeKeyboard={'numeric'}
                defaultValue={String(data['quantity'])}
                color={Colors.appOrange}
                style={[styles.input, {backgroundColor: '#fff2cc'}]}
              />
            ) : (
              <View style={[styles.input, {backgroundColor: '#fff2cc'}]} />
            )}
            <Text
              text={'Location'}
              size={Fonts['size']['android']['message']}
              font={Fonts['style']['android']['medium']}
              align={'center'}
            />
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={[
                Styles.input,
                styles.input,
                {backgroundColor: '#d2edf8', height: 55},
                Styles.center,
              ]}>
              <Text
                text={String(lot['value'])}
                size={Fonts['size']['android']['message']}
                font={Fonts['style']['android']['medium']}
                align={'center'}
                color={Colors.appPrimaryColor}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.container_button}>
            <Button
              text={'chuyển kho'}
              type={'confirm'}
              onPress={onPressConfirm}
            />
          </View>
        </View>
        <View style={styles.container}>
          <Camera
            onBack={() => onPressCamera(false)}
            text={'Scan mã kho'}
            onBarCodeRead={onBarCodeRead}
            searchForm={{
              active: true,
              activeArea: true,
              placeholder: 'Nhập mã đơn hàng',
              onBarCodeRead,
            }}
            imageForm={{
              active: false,
            }}
          />
        </View>
      </Animated.View>
      <ModalLocation
        data={locations}
        visible={visible}
        onPress={item => {
          setLot(item);
          setVisible(false);
        }}
        onClose={() => setVisible(false)}
      />
    </View>
  );
};

export default TransferConfirm;
