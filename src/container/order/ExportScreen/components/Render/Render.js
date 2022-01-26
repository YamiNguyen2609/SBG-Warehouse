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
import {getOrderExport} from '../../../../../redux/order/redux/getOrderExport';
import {Button, Divider, Input, Text} from '../../../../../components';
import {exportOrder} from '../../../../../redux/order/redux/exportOrder';

const formAnimation = new Animated.ValueXY({x: 0, y: 0});

let value = '';

const Render = props => {
  let isCamera = false;
  const dispatch = useDispatch();
  const input = useRef(null);
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(props['flag']);
  const [flagExport, setFlagExport] = useState(props['flagExport']);

  useEffect(() => {
    if (flag != props['flag']) {
      setFlag(props['flag']);
      input.current.setText('');
      if (data.find(x => x['id'] == props['data']['id'])) {
        return showMessage({
          type: 'warning',
          message: 'Scan đơn hàng xuất kho',
          description: value.toUpperCase() + ' đã được scan',
        });
      }
      if (props['data']) {
        let temp = [props['data']].concat(data);
        setData([...new Set(temp)]);
      }
    }
  }, [props['flag']]);

  useEffect(() => {
    if (flagExport != props['flagExport']) {
      setFlagExport(props['flagExport']);
      setData([]);
    }
  }, [props['flagExport']]);

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

  const onPressConfirm = () => {
    let params = data.map(x => x['details']).join(',');

    return dispatch(exportOrder({detailIds: params}));
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
                    dispatch(getOrderExport(data));
                  }, 300);
                },
              },
            ],
          }),
        );
      } else {
        if (data) {
          dispatch(getOrderExport(data));
        }
      }
    }
  };

  const onRemove = item =>
    setData([...new Set(data.filter(x => x['id'] != item))]);

  setTimeout(() => {
    if (input.current) input.current.focus();
  }, 250);

  const onSubmit = () => {
    dispatch(getOrderExport(input.current.value));
  };

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
          text={'Danh sách xuất kho'}
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
              onSubmit={onSubmit}
            />
          </View>
          <TouchableOpacity style={styles.button_action} onPress={onSubmit}>
            <Text text={'Xong'} size={Fonts['size']['android']['message']} />
          </TouchableOpacity>
        </View>
        <Divider height={0.8} />
        <View style={styles.container_counter}>
          <Text text={'Số lượng'} size={Fonts['size']['android']['title']} />
          <Text
            text={data.length}
            size={Fonts['size']['android']['title'] + 3}
            color={Colors.appOrange}
            font={Fonts['style']['android']['medium']}
          />
        </View>
        <FlatList
          data={data}
          renderItem={item => <Item remove={onRemove} {...item} />}
        />
        <View
          style={{
            elevation: 10,
            backgroundColor: Colors.appWhite,
            padding: Metrics.margin.regular,
          }}>
          <Button
            onPress={onPressConfirm}
            text={'Xác nhận xuất kho'}
            disabled={data.length == 0}
            backgroundColor={
              data.length == 0 ? Colors.overlay5 : Colors.appPrimaryColor
            }
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

const Item = props => {
  const {item, index} = props;
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: Metrics.margin.regular,
          marginBottom: Metrics.margin.regular,
        }}>
        <View>
          <Text
            text={item['orderNumber']}
            size={Fonts['size']['android']['title']}
            color={Colors.appPrimaryColor}
            font={Fonts['style']['android']['medium']}
          />
          <Text
            text={item['externalOrderNumber']}
            size={Fonts['size']['android']['normal']}
            color={Colors.overlay5}
            font={Fonts['style']['android']['medium']}
          />
        </View>
        <TouchableOpacity
          onPress={() => props['remove'](item['id'])}
          activeOpacity={1}
          hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
          <IonIcon
            name={'ios-trash-outline'}
            size={Metrics.icon.regular}
            color={Colors.appRed}
          />
        </TouchableOpacity>
      </View>
      <Divider height={1.5} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: Metrics.margin.regular,
        }}>
        <Text
          text={'Đối tác giao hàng'}
          size={Fonts['size']['android']['message']}
          color={Colors.overlay5}
        />
        <Text
          text={item['partner']}
          line={2}
          style={{flexShrink: 1, paddingLeft: Metrics.margin.regular}}
          size={Fonts['size']['android']['normal'] + 2}
          font={Fonts['style']['android']['medium']}
          color={Colors.appGreen}
        />
      </View>
      <Divider height={1.5} />
      {item['products'].map((e, idx) => {
        return (
          <View
            key={`product-${idx}`}
            style={[
              {
                marginHorizontal: Metrics.margin.regular,
                paddingTop: Metrics.margin.regular,
              },
              idx + 1 != item['products'].length
                ? {
                    borderBottomWidth: 1.5,
                    borderBottomColor: Colors.appLightGrayColor,
                    paddingBottom: Metrics.margin.regular,
                  }
                : null,
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                text={'Sản phẩm'}
                size={Fonts['size']['android']['message']}
                color={Colors.overlay5}
              />
              <Text
                text={`[${e['details.productId']}] ${e['details.productName']}`}
                line={2}
                style={{flexShrink: 1, paddingLeft: Metrics.margin.regular}}
                size={Fonts['size']['android']['normal']}
                font={Fonts['style']['android']['medium']}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                text={'Kho'}
                size={Fonts['size']['android']['message']}
                color={Colors.overlay5}
              />
              <Text
                text={e['details.warehouseName']}
                size={Fonts['size']['android']['normal']}
                font={Fonts['style']['android']['medium']}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                text={'Số lượng'}
                size={Fonts['size']['android']['message']}
                color={Colors.overlay5}
              />
              <Text
                text={e['details.qty']}
                size={Fonts['size']['android']['normal']}
                font={Fonts['style']['android']['medium']}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default Render;
