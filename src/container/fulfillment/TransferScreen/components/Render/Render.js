import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Animated, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import moment from 'moment';

import styles from './styles';
import Header from '../../../../components/Header';
import {Text, Button} from '../../../../../components';
import {
  Colors,
  Fonts,
  Images,
  Metrics,
  Styles,
} from '../../../../../assets/styles';
import Camera from '../../../../components/Camera';
import TransferConfirm from '../TransferConfirm';
import {showFlagMessage, hideFlagMessage} from '../../../../../redux/app';
import {getStocks} from '../../../../../redux/fulfillment/redux/getStocks';

const formAnimation = new Animated.ValueXY({x: 0, y: 0});
let isCamera = true;
const defaultValue = {
  productId: 0,
  productName: '',
  quantity: 0,
  lotId: 0,
  expiredDate: moment().format('YYYY-MM-DD'),
};

const onMove = index => {
  Animated.spring(formAnimation, {
    toValue: {x: -Metrics.width * index, y: 0},
    speed: 100,
    useNativeDriver: false,
  }).start();
};

const Render = props => {
  const dispatch = useDispatch();
  const [flagStocks, setFlagStocks] = useState(props['flag_stocks']);
  const [item, setItem] = useState(defaultValue);
  const [lot, setLot] = useState(null);

  useEffect(() => {
    if (flagStocks != props['flag_stocks']) {
      setFlagStocks(props['flag_stocks']);
      isCamera = false;
      onMove(1);
    }
  }, [props['flag_stocks']]);

  useEffect(() => {
    if (item['productId'] != 0) isCamera = false;
    onMove(item['productId'] != 0 ? 2 : lot ? 1 : 0);
  }, [item]);

  const onBarCodeRead = (data, state) => {
    //1: camera, 2: input
    if (isCamera)
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
                  setLot(data);
                  setTimeout(() => dispatch(getStocks(data)), 300);
                },
              },
            ],
          }),
        );
      } else {
        if (data) {
          setLot(data);
          dispatch(getStocks(data));
        }
      }
  };

  const onRefresh = () => dispatch(getStocks(lot));

  return (
    <Animated.View
      style={[
        Styles.container,
        {
          flexDirection: 'row',
          width: Metrics.width * 3,
          flex: 1,
          backgroundColor: Colors.appWhite,
        },
        formAnimation.getLayout(),
      ]}>
      <View style={styles.container}>
        <Camera
          onBack={props.navigation.goBack}
          text={'Scan mã kho'}
          onBarCodeRead={onBarCodeRead}
          searchForm={{
            active: true,
            activeArea: true,
            placeholder: 'Nhập location',
            onBarCodeRead: onBarCodeRead,
          }}
          imageForm={{
            active: false,
          }}
        />
      </View>
      <View style={styles.container}>
        <Header
          onBack={() => {
            setLot(null);
            onMove(0);
          }}
          text={'Chuyển kho'}
          company={'logi'}
          right={
            <TouchableOpacity
              onPress={onRefresh}
              style={{marginRight: Metrics.margin.small}}>
              <Icon
                name="ios-reload"
                size={Metrics.icon.regular}
                color={Colors.appWhite}
              />
            </TouchableOpacity>
          }
        />
        <FlatList
          data={props['stocks']}
          showsVerticalScrollIndicator={false}
          renderItem={item => <Form {...item} onPress={setItem} />}
        />
      </View>
      <TransferConfirm
        data={item}
        {...props}
        onRefresh={onRefresh}
        goBack={() => onMove(1)}
      />
    </Animated.View>
  );
};

const Form = props => {
  const {item} = props;

  return (
    <View>
      <View style={styles.header}>
        <Text
          text={item['locationName']}
          size={Fonts['size']['android']['title'] + 2}
          font={Fonts['style']['android']['medium']}
          color={Colors.appWhite}
        />
      </View>
      {item['stocks'].map((e, idx) => {
        e['locationId'] = item['locationId'];
        return e['quantity'] > 0 ? (
          <View
            style={
              idx + 1 < item['stocks'].length
                ? {
                    borderBottomColor: Colors.appLightGrayColor,
                    borderBottomWidth: 1.5,
                  }
                : null
            }>
            <View style={styles.container_child}>
              <View style={{flex: 1}}>
                <Text
                  text={e['productName']}
                  size={Fonts['size']['android']['normal'] - 1}
                  style={{flexShrink: 1}}
                />
              </View>
              <View style={styles.container_input}>
                <View
                  style={{
                    flex: 1,
                    height: 45,
                    ...Styles.center,
                    backgroundColor: '#fff2cc',
                    marginHorizontal: Metrics.margin.regular,
                    borderRadius: Metrics.borderRadius.medium,
                  }}>
                  <Text
                    text={e['quantity']}
                    size={Fonts['size']['android']['message']}
                    font={Fonts['style']['android']['medium']}
                    color={Colors.appOrange}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => props.onPress(e)}
                  style={styles.button}>
                  <Text
                    text={'CHUYỂN'}
                    size={Fonts['size']['android']['action']}
                    font={Fonts['style']['android']['medium']}
                    color={Colors.appColor_logi}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.container_bottom}>
              <Text
                text={`Exp: ${
                  e['expiredDate'] != false
                    ? moment(e['expiredDate']).format('DD-MM-YYYY')
                    : 'không có'
                }`}
                size={Fonts['size']['android']['action'] - 2}
                font={Fonts['style']['android']['medium']}
                color={Colors.overlay7}
              />
            </View>
          </View>
        ) : null;
      })}
    </View>
  );
};

export default Render;
