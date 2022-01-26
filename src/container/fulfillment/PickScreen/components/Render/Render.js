import React, {
  useState,
  useEffect,
  createRef,
  useImperativeHandle,
} from 'react';
import {FlatList, View, TouchableOpacity, Animated} from 'react-native';
import Swiper from 'react-native-swiper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import r from 'reactotron-react-native';

import styles from './styles';
import {Styles, Fonts, Colors, Metrics} from '../../../../../assets/styles';
import {Text, Button} from '../../../../../components';
import Header from '../../../../components/Header';
import PickForm from '../PickForm';
import HeaderTab from '../../../../components/HeaderTab';
import Camera from '../../../../components/Camera';
import PickConfirm from '../PickConfirm';
import AllocateForm from '../AllocateForm';
import {showFlagMessage, hideFlagMessage} from '../../../../../redux/app';
import {getProductsPick} from '../../../../../redux/fulfillment/redux/getProductsPick';
import SelectForm from '../../../../components/SelectForm';

const formAnimation = new Animated.ValueXY({x: 0, y: 0});
let isCamera = false;
let flag = 0;
let ref_items = [];
let defaultValue = {
  lineId: 0,
  merchantProduct: false,
  odooProductId: 0,
  odooProductName: '',
  quantity: 0,
  allocatedQuantity: 0,
};

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
    onMove(2);
  } else {
    onMove(0);
    setTimeout(() => {
      isCamera = false;
    }, 250);
  }
};

const Render = React.forwardRef((props, ref) => {
  const {pick, allocated} = props;
  const dispatch = useDispatch();
  const [state, setState] = useState(0);
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState(false);
  const [stateOrder, setStateOrder] = useState({
    id: 'export_goods',
    value: 'Đơn bán',
  });

  useImperativeHandle(ref, () => ({
    reset: () => onMove(0),
  }));

  useEffect(() => {
    if (pick['flag'] != flag) {
      flag = props['flag'];
    }
  }, [pick['flag']]);

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

  const onSelectAll = () => {
    setSelected(!selected);
    ref_items.map(element =>
      element['current'] ? element['current'].setState(!selected) : null,
    );
  };

  const onPressPick = () => {
    onMove(1);
    let data = [];
    ref_items
      .filter(x => (x['current'] ? x['current']['value']['selected'] : null))
      .forEach(
        e =>
          (data = data.concat(
            e['current']['value']['lines'].map(e => {
              return {
                ...e,
                productId: e['odooProductId'],
              };
            }),
          )),
      );
    dispatch(
      getProductsPick({
        data,
        keyword: '',
      }),
    );
  };

  const onRefresh = () => {
    ref_items.map(element =>
      element['current'] ? element['current'].setState(false) : null,
    );
    props.onRefresh();
  };

  let items = pick['data'].filter(x => x['orderType'] == stateOrder['id']);
  ref_items = items.map(e => createRef(null));

  return (
    <Animated.View
      style={[
        Styles.container,
        {
          flexDirection: 'row',
          width: Metrics.width * 3,
          flex: 1,
        },
        formAnimation.getLayout(),
      ]}>
      <View style={{width: Metrics.width}}>
        <Header
          onBack={props.navigation.goBack}
          text={'Pick hàng'}
          company={'logi'}
          right={
            <TouchableOpacity
              onPress={onRefresh}
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
              title: `Chưa pick (${pick['total']})`,
            },
            {
              id: 1,
              title: `Đã pick (${allocated['total']})`,
            },
          ]}
        />
        <Swiper
          onIndexChanged={index => setState(index)}
          showsPagination={false}
          index={state}
          loop={false}>
          <View style={{flex: 1}}>
            <View style={styles.container_button}>
              <View style={{flexDirection: 'row'}}>
                <SelectForm
                  title={'Loại đơn hàng'}
                  style={{
                    marginTop: Metrics.margin.regular,
                    marginRight: Metrics.margin.regular,
                    width: 100,
                  }}
                  onChange={setStateOrder}
                  defaultValue={stateOrder}
                  data={[
                    {id: 'export_goods', value: 'Đơn mới'},
                    {id: 'to_return', value: 'Đơn trả'},
                  ]}
                />
                <Button
                  type={'confirm'}
                  style={styles.button_action}
                  text={'Tìm kiếm'}
                />
              </View>
              <TouchableOpacity
                onPress={onSelectAll}
                style={[
                  styles.button_action,
                  {
                    backgroundColor: Colors.appWhite,
                    borderWidth: 0.8,
                    borderColor: selected
                      ? Colors.appPrimaryColor
                      : Colors.overlay5,
                  },
                ]}>
                <Text
                  text={'Chọn tất cả'}
                  color={selected ? Colors.appPrimaryColor : Colors.overlay5}
                  size={Fonts['size']['android']['message']}
                />
              </TouchableOpacity>
            </View>
            <View style={Styles.container}>
              <FlatList
                style={{zIndex: 10}}
                data={items}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <PickForm
                    item={item}
                    index={index}
                    ref={ref_items[index]}
                    total={pick['total']}
                    callback={data => setCount(data + count)}
                  />
                )}
                ItemSeparatorComponent={() => (
                  <View style={{height: Metrics.margin.large}} />
                )}
              />
            </View>
            <View style={styles.button}>
              <Button
                type={'confirm'}
                text={`XÁC NHẬN ${count > 0 ? `(${count})` : ''}`}
                onPress={onPressPick}
              />
            </View>
          </View>
          <FlatList
            data={allocated['data']}
            showsVerticalScrollIndicator={false}
            renderItem={item => (
              <AllocateForm {...item} total={allocated['total']} />
            )}
            ItemSeparatorComponent={() => (
              <View style={{height: Metrics.margin.huge}} />
            )}
          />
        </Swiper>
      </View>
      <PickConfirm
        {...props}
        goBack={() => {
          onMove(0);
          ref_items.map(element =>
            element['current'] ? element['current'].setState(false) : null,
          );
        }}
      />
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
    </Animated.View>
  );
});

export default Render;
