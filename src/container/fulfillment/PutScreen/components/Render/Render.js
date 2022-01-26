import React, {useState, useRef, useEffect} from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  Animated,
  Keyboard,
} from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import r from 'reactotron-react-native';
import {showMessage} from 'react-native-flash-message';

import styles from './styles';
import {Styles, Fonts, Colors, Metrics} from '../../../../../assets/styles';
import {Text, Button} from '../../../../../components';
import Header from '../../../../components/Header';
import Camera from '../../../../components/Camera';
import HeaderTab from '../../../../components/HeaderTab';
import PutForm from '../PutForm';
import PutConfirm from '../PutConfirm';
import {showFlagMessage, hideFlagMessage} from '../../../../../redux/app';
import {getReceipt} from '../../../../../redux/fulfillment/redux/getReceipt';

const formAnimation = new Animated.ValueXY({x: 0, y: 0});
let flagReceipt = 0;
let isReturn = false;
let isCamera = false;
const defaultLine = {
  line_id: 0,
  product_name: '',
  actual_quantity: 0,
  odooProductId: 0,
};

const Render = props => {
  const dispatch = useDispatch();
  const [state, setState] = useState(0);
  const [item, setItem] = useState(null);
  const [line, setLine] = useState(defaultLine);

  useEffect(() => {
    if (flagReceipt != props['flag_receipt']) {
      flagReceipt = props['flag_receipt'];
      isCamera = false;
      let item = props['item_receipt'];

      if (item['status'] == 'receipt') {
        setItem(item);
        onMove(2);
      } else {
        onMove(0);
        props.onRefresh();
      }
    }
  }, [props['flag_receipt']]);

  useEffect(() => {
    onMove(0);
  }, [props['receipt']['data']]);

  const onMove = index => {
    Animated.spring(formAnimation, {
      toValue: {x: -Metrics.width * index, y: 0},
      speed: 100,
      useNativeDriver: false,
    }).start();
  };

  const onPress = (
    item = {
      product_name: '',
      actual_quantity: 0,
    },
  ) => {
    onMove(3);
    setLine(item);
  };

  const onPressCamera = status => {
    if (status) {
      isCamera = true;
      onMove(1);
    } else {
      onMove(0);
      isCamera = false;
    }
  };

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
                  setTimeout(() => dispatch(getReceipt(data)), 300);
                },
              },
            ],
          }),
        );
      } else {
        if (data) dispatch(getReceipt(data));
      }
    }
  };

  let total_receipt = '0';
  let total_return = '0';
  if (props['receipt']['data'].length > 0) {
    total_receipt = props['receipt']['data'].filter(
      x => x['orderType'] == 'import_goods',
    ).length;
    total_return = props['receipt']['data'].filter(
      x => x['orderType'] == 'to_return',
    ).length;
  }

  let items = props['receipt']['data'];

  return (
    <Animated.View
      style={[
        Styles.container,
        {
          flexDirection: 'row',
          width: Metrics.width * 4,
          flex: 1,
          backgroundColor: Colors.appWhite,
        },
        formAnimation.getLayout(),
      ]}>
      <View style={{width: Metrics.width}}>
        <Header
          onBack={props.navigation.goBack}
          text={'Put hàng'}
          company={'logi'}
          right={
            <TouchableOpacity
              onPress={props.onRefresh}
              style={{marginRight: Metrics.margin.small}}>
              <IonIcon
                name="ios-reload"
                size={Metrics.icon.regular}
                color={Colors.appWhite}
              />
            </TouchableOpacity>
          }
        />
        <HeaderTab
          onPress={setState}
          state={state}
          data={[
            {
              id: 0,
              title: `Hàng nhận (${total_receipt})`,
            },
            {
              id: 1,
              title: `Hàng trả (${total_return})`,
            },
          ]}
        />
        <Swiper
          onIndexChanged={index => setState(index)}
          showsPagination={false}
          index={state}
          loop={false}>
          <FlatList
            data={items}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            onEndReached={props.onLoadMore}
            renderItem={item => (
              <Form {...item} type="import_goods" total={total_receipt} />
            )}
            ItemSeparatorComponent={() => (
              <View style={{height: Metrics.margin.huge}} />
            )}
          />
          <FlatList
            data={props['receipt']['data']}
            showsVerticalScrollIndicator={false}
            renderItem={item => (
              <Form type="to_return" {...item} total={total_return} />
            )}
            ItemSeparatorComponent={() => (
              <View style={{height: Metrics.margin.huge}} />
            )}
          />
        </Swiper>
        <TouchableOpacity
          onPress={() => onPressCamera(true)}
          style={styles.barcode_icon}>
          <IonIcon
            name={'ios-barcode-outline'}
            size={Metrics.icon.large}
            color={Colors.appWhite}
          />
        </TouchableOpacity>
      </View>
      <View style={{width: Metrics.width}}>
        <Camera
          onBack={() => onPressCamera(false)}
          text={'Scan đơn hàng'}
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
      <View
        style={{
          width: Metrics.width,
          backgroundColor: Colors.appLightGrayColor,
        }}>
        <Header
          onBack={() => {
            setItem(null);
            onMove(0);
          }}
          text={String(item ? item['orderNumber'] : '').toUpperCase()}
          company={'logi'}
        />
        {item ? <PutForm data={item} onPress={onPress} {...props} /> : null}
      </View>
      <PutConfirm
        data={line}
        onClose={() => {
          onMove(2);
          Keyboard.dismiss();
          setTimeout(() => setLine(defaultLine), 150);
        }}
        {...props}
      />
    </Animated.View>
  );
};

const Form = props => {
  const dispatch = useDispatch();
  const {item, index, total, type} = props;

  const onPress = () => {
    dispatch(getReceipt(item['orderId']));
  };

  return item['orderType'] == type ? (
    <TouchableOpacity
      key={index}
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        Styles.card,
        {padding: 0, marginVertical: 0},
        !index ? {marginTop: Metrics.margin.huge} : null,
        index + 1 == total ? {marginBottom: Metrics.margin.huge} : null,
      ]}>
      <View style={styles.item_header}>
        <Text
          text={`#${item['orderNumber']}`}
          size={Fonts['size']['android']['message'] + 2}
          color={Colors.appColor_logi}
          font={Fonts['style']['android']['bold']}
        />
        <Text
          text={moment(item['createAt'])
            .add(7, 'hour')
            .format('DD-MM-YYYY HH:mm:ss')}
          size={Fonts['size']['android']['message'] - 2}
          color={Colors.overlay7}
          font={Fonts['style']['android']['medium']}
        />
      </View>
      <View style={styles.item_body}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: Metrics.margin.small,
          }}>
          <Text
            text={'Merchant'}
            size={Fonts['size']['android']['normal']}
            color={Colors.overlay5}
            font={Fonts['style']['android']['medium']}
            style={{flex: 0.5}}
          />
          <Text
            text={item['merchantShortName']}
            size={Fonts['size']['android']['normal']}
            font={Fonts['style']['android']['medium']}
            style={{flexShrink: 1, flex: 1}}
            align={'right'}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            text={'Kho'}
            size={Fonts['size']['android']['normal']}
            color={Colors.overlay5}
            font={Fonts['style']['android']['medium']}
            style={{flex: 0.5}}
          />
          <Text
            text={item['warehouseName']}
            size={Fonts['size']['android']['normal']}
            font={Fonts['style']['android']['medium']}
            align={'right'}
          />
        </View>
      </View>
    </TouchableOpacity>
  ) : null;
};

export default Render;
