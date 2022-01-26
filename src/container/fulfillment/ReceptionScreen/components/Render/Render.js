import React, {useState, useEffect, useRef, useImperativeHandle} from 'react';
import {FlatList, View, TouchableOpacity, Animated} from 'react-native';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import r from 'reactotron-react-native';

import styles from './styles';
import {Styles, Fonts, Colors, Metrics} from '../../../../../assets/styles';
import {Text} from '../../../../../components';
import Header from '../../../../components/Header';
import ReceiptForm from '../ReceiptForm';
import HeaderTab from '../../../../components/HeaderTab';
import Camera from '../../../../components/Camera';
import ModalConfirm from '../../../../components/ModalConfirm';
import QuantityForm from '../../../../components/QuantityForm';
import {getReceipt} from '../../../../../redux/fulfillment/redux/getReceipt';
import {receiptOrder} from '../../../../../redux/fulfillment/redux/receiptOrder';
import {showFlagMessage, hideFlagMessage} from '../../../../../redux/app';

const formAnimation = new Animated.ValueXY({x: 0, y: 0});
let isCamera = false;
let flag_receipt = 0;

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

const Render = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const quantityForm = useRef(null);
  const [state, setState] = useState(0);
  const [visible, setVisible] = useState(false);
  const [flag_confirm, setFlagConfirm] = useState(props['flag']);
  const [item, setItem] = useState(null);
  const [statePopup, setStatePopup] = useState(0);

  useImperativeHandle(ref, () => ({
    reset: () => onMove(0),
  }));

  const {in_receipt, receipt, item_receipt} = props;

  useEffect(() => {
    if (flag_receipt != props['flag_receipt']) {
      flag_receipt = props['flag_receipt'];
      isCamera = false;
      let item = props['item_receipt'];
      let total_new = item['order_lines'].filter(x => x['status'] == 'new');
      if (state == 1) {
        setItem(item);
        onMove(2);
      } else if (total_new.length > 0) {
        setItem(item);
        onMove(2);
      } else {
        onMove(0);
        props.onRefresh();
      }
    }
  }, [props['flag_receipt']]);

  useEffect(() => {
    if (flag_confirm != props['flag']) {
      setFlagConfirm(props['flag']);
      dispatch(getReceipt(item_receipt['orderId']));
    }
  }, [props['flag']]);

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
                  setTimeout(() => dispatch(getReceipt(data)), 300);
                },
              },
            ],
          }),
        );
      } else {
        if (data) dispatch(getReceipt(data));
      }
  };

  const onSubmit = () => {
    setTimeout(() => {
      setVisible(false);
    }, 250);
    dispatch(
      receiptOrder({
        state: statePopup,
        data:
          statePopup == 0
            ? {
                orderId: item_receipt['orderId'],
                name: item_receipt['orderNumber'],
              }
            : {
                name: item['product_name'],
                lineId: item['line_id'],
                quantity: quantityForm.current.getText(),
              },
      }),
    );
  };

  let items = in_receipt['data'];

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
      <View style={{width: Metrics.width}}>
        <Header
          onBack={props.navigation.goBack}
          text={'Nhận hàng'}
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
              title: `Chưa nhận (${in_receipt['total']})`,
            },
            {
              id: 1,
              title: `Đã nhận (${receipt['total']})`,
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
            renderItem={item => <Form {...item} total={in_receipt['total']} />}
            onEndReachedThreshold={0.4}
            onEndReached={() => props.onLoadMore(0)}
            ItemSeparatorComponent={() => (
              <View style={{height: Metrics.margin.huge}} />
            )}
          />
          <FlatList
            data={receipt['data']}
            showsVerticalScrollIndicator={false}
            renderItem={item => <Form {...item} total={receipt['total']} />}
            onEndReachedThreshold={0.4}
            onEndReached={() => props.onLoadMore(1)}
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
      <Camera
        onBack={() => onPressCamera(false)}
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
      <View
        style={{
          width: Metrics.width,
          backgroundColor: Colors.appLightGrayColor,
        }}>
        <Header
          onBack={() => onMove(0)}
          text={String(
            item_receipt ? item_receipt['orderNumber'] : '',
          ).toUpperCase()}
          company={'logi'}
        />
        {item_receipt ? (
          <ReceiptForm
            data={item_receipt}
            onPress={item => {
              setItem(item);
              setStatePopup(1);
              setVisible(true);
            }}
            onSubmit={() => {
              setVisible(true);
              setStatePopup(0);
            }}
            isReceipt={state == 0}
          />
        ) : null}
        <ModalConfirm
          body={() => {
            return statePopup == 1 ? (
              <QuantityForm
                data={item}
                ref={quantityForm}
                title1={'Số lượng còn lại'}
                title2={'Số lượng thực tế'}
              />
            ) : (
              <View style={styles.container_text}>
                <Text
                  text={String('Hoàn tất đơn hàng').toUpperCase()}
                  size={Fonts['size']['android']['message'] + 2}
                  font={Fonts['style']['android']['bold']}
                  align={'center'}
                  color={Colors.appOrange}
                  style={{marginBottom: Metrics.margin.small}}
                />
                <Text
                  text={'Đã nhận đủ tất cả số lượng'}
                  size={Fonts['size']['android']['message']}
                  align={'center'}
                />
                <Text
                  text={'sản phẩm của đơn hàng'}
                  size={Fonts['size']['android']['message']}
                  align={'center'}
                />
              </View>
            );
          }}
          onClose={() => {
            setVisible(false);
            setStatePopup(0);
          }}
          onSubmit={onSubmit}
          visible={visible}
        />
      </View>
    </Animated.View>
  );
});

const Form = props => {
  const dispatch = useDispatch();
  const {item, index, total} = props;

  const onPress = data => dispatch(getReceipt(data['orderId']));

  return item['orderType'] == 'import_goods' ? (
    <TouchableOpacity
      key={index}
      activeOpacity={1}
      onPress={() => onPress(item)}
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
