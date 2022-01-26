import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  FlatList,
  TextInput,
  Keyboard,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';
import r from 'reactotron-react-native';
import moment from 'moment';

import styles from './styles';
import {Styles, Colors, Fonts, Metrics} from '../../../../../assets/styles';
import {Text, Input, Button, Divider} from '../../../../../components';
import Header from '../../../../components/Header';
import ModalConfirm from '../../../../components/ModalConfirm';
import QuantityForm from '../../../../components/QuantityForm';
import SelectForm from '../../../../components/SelectForm';
import {getProductsPick} from '../../../../../redux/fulfillment/redux/getProductsPick';
import {pickOrder} from '../../../../../redux/fulfillment/redux/pickOrder';
import {getPicks} from '../../../../../redux/fulfillment/redux/getPicks';

const formAnimation = new Animated.ValueXY({x: 0, y: 0});
const defaultValue = {
  productName: '',
  quantity: 0,
  locationName: '',
  lots: [],
};

let tempValue = '';

let timeout = null;

const onMove = index => {
  Animated.spring(formAnimation, {
    toValue: {x: -Metrics.width * index, y: 0},
    speed: 100,
    useNativeDriver: false,
  }).start();
};

const PickConfirm = props => {
  const input = useRef(null);
  const quantityForm = useRef(null);
  const dispatch = useDispatch();
  const {goBack, items, lines, line_pick, zones} = props;
  const [visible, setVisible] = useState(false);
  let [item, setItem] = useState(defaultValue);
  let [zone, setZone] = useState({id: 0, value: 'Tất cả'});
  const [flag, setFlag] = useState(props['flag']);
  const [flagProductPick, setFlagProductPick] = useState(
    props['flag_product_pick'],
  );

  useEffect(() => {
    //sau khi pick thành công
    if (flag != props['flag']) {
      setFlag(props['flag']);
      let temp = items;

      line_pick.forEach(e => {
        let idx = temp.findIndex(c => c['lineId'] == e['fulfillmentLineId']);
        if (idx > -1) {
          temp[idx]['pickedQuantity'] += parseFloat(e['quantity']);
          temp[idx]['allocatedQuantity'] += parseFloat(e['quantity']);
        }
      });

      if (input.current) {
        input.current.setText('');
      }

      dispatch(
        getProductsPick({
          data: temp,
          keyword: '',
        }),
      );
    }
  }, [props['flag']]);

  useEffect(() => {
    if (props['flag_product_pick'] != flagProductPick) {
      setFlagProductPick(props['flag_product_pick']);
      let location = locations.find(x => x['locationId'] == item['locationId']);
      if (location) {
        let total = lines
          .filter(x => x.productId == item['productId'])
          .map(x => x.quantity - x.allocatedQuantity)
          .reduce((a, b) => a + b);
        if (total > 0) {
          let data = item;
          data['quantity'] = total;
          data['lots'] = [...new Set(location['stockDetails'])];
          setItem(data);
        } else onMove(0);
      } else onMove(0);
    }
  }, [props['flag_product_pick']]);

  const onPress = (data = defaultValue) => {
    if (data['productName'] !== '') {
      r.log('item data', data);
      input.current.blur();
      setItem(data);
      onMove(1);
    } else {
      setVisible(false);
    }
  };

  const onSubmit = () => {
    let value = quantityForm.current.getText();
    console.log('value', item);
    let products = lines
      .filter(x => x.productId == item.productId)
      .sort((a, b) => a['lineId'] - b['lineId']);

    r.log('product', item, products);

    if (parseFloat(quantityForm.current.getText()) > item['lot_quantity']) {
      return quantityForm.current.showMessage({
        type: 'warning',
        message: 'Pick đơn hàng',
        description: 'Số lượng nhập vượt quá tồn kho',
      });
    }
    let dataSubmit = [];
    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      if (element['quantity'] > 0) {
        if (value >= element['quantity']) {
          dataSubmit.push({
            fulfillmentLineId: element['lineId'],
            orderName: item['orderName'],
            quantity: item['quantity'],
            location: item['locationId'],
            lotId: item['lotId'],
          });
          value -= parseFloat(element['quantity']);
        } else {
          if (value > 0) {
            dataSubmit.push({
              orderName: item['orderName'],
              fulfillmentLineId: element['lineId'],
              quantity: value,
              location: item['locationId'],
              lotId: item['lotId'],
            });
            value -= parseFloat(element['quantity']);
          } else break;
        }
      }
    }

    r.log('params', dataSubmit);
    setVisible(false);
    Keyboard.dismiss();
    setTimeout(
      () =>
        dispatch(
          pickOrder({
            data: dataSubmit,
            product_name: item['productName'],
          }),
        ),
      300,
    );
  };

  const callBack = value => {
    if (items.length > 0 && tempValue != value) {
      tempValue = value;
      clearTimeout(timeout);
      timeout = setTimeout(
        () =>
          dispatch(
            getProductsPick({
              data: items,
              keyword: tempValue.toLowerCase(),
            }),
          ),
        100,
      );
    }
  };

  const onBack = () => {
    Keyboard.dismiss();

    setTimeout(() => {
      if (input.current) input.current.setText('');
      dispatch(getPicks(-1));
    }, 250);

    goBack();
  };

  const onUpdateLot = data => {
    r.log({...item, ...data}, item, data);
    setItem({...item, ...data});
    setVisible(true);
  };
  let locations = [];
  let total_locations = 0;
  if (props['locations'].length > 0) {
    if (zone['id'] > 0) {
      locations = props['locations'].filter(x =>
        x['locationName'].startsWith(zone['id']),
      );
    } else locations = props['locations'];
    total_locations = locations.filter(
      x =>
        x['products'].filter(x => x['quantity'] - x['allocatedQuantity'])
          .length > 0,
    ).length;
  }

  r.log('locations', locations, zones);

  return (
    <View style={[Styles.container, {width: Metrics.width}]}>
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
        <View style={{width: Metrics.width, ...Styles.container, flex: 0}}>
          <Header onBack={onBack} text={'Pick hàng'} company={'logi'} />
          <View style={{backgroundColor: Colors.appWhite, elevation: 20}}>
            <Input
              placeholder={'Nhập tên sản phẩm'}
              callback={callBack}
              ref={input}
              style={Styles.input}
            />
          </View>
          <View style={{padding: Metrics.margin.regular}}>
            <SelectForm
              title={'Chọn khu vực'}
              data={zones}
              defaultValue={zone}
              onChange={setZone}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.header, {width: (Metrics.width * 2) / 4}]}>
              <Text
                text={'Sản phẩm'}
                size={Fonts['size']['android']['action']}
                font={Fonts['style']['android']['medium']}
                color={Colors.overlay6}
              />
            </View>
            <View style={[styles.header, {width: Metrics.width / 4}]}>
              <Text
                text={'Tồn kho'}
                size={Fonts['size']['android']['action']}
                font={Fonts['style']['android']['medium']}
                color={Colors.overlay6}
              />
            </View>
            <View style={[styles.header, {width: Metrics.width / 4}]}>
              <Text
                text={'Cần Pick'}
                size={Fonts['size']['android']['action']}
                font={Fonts['style']['android']['medium']}
                color={Colors.overlay6}
              />
            </View>
          </View>
          {total_locations > 0 ? (
            <FlatList
              keyboardShouldPersistTaps={'always'}
              data={locations}
              renderItem={item => <Item {...item} onPress={onPress} />}
            />
          ) : (
            <View style={[Styles.container, Styles.center]}>
              <Text
                text={'Không có sản phẩm để pick'}
                size={Fonts['size']['android']['action']}
                font={Fonts['style']['android']['medium']}
                color={Colors.overlay6}
              />
            </View>
          )}
        </View>
        <View style={{width: Metrics.width, ...Styles.container, flex: 0}}>
          <Header
            onBack={() => {
              input.current.setText('');
              onMove(0);
            }}
            text={item['locationName']}
            company={'logi'}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.header, {width: (Metrics.width * 2) / 4}]}>
              <Text
                text={'Lot'}
                size={Fonts['size']['android']['action']}
                font={Fonts['style']['android']['medium']}
                color={Colors.overlay6}
              />
            </View>
            <View style={[styles.header, {width: (Metrics.width * 2) / 4}]}>
              <Text
                text={'Cần Pick / Tồn kho'}
                size={Fonts['size']['android']['action']}
                font={Fonts['style']['android']['medium']}
                color={Colors.overlay6}
              />
            </View>
          </View>
          <FlatList
            data={item['lots']}
            renderItem={e => (
              <ItemLot {...e} data={item} onPress={onUpdateLot} />
            )}
            ItemSeparatorComponent={() => (
              <Divider
                height={Metrics.margin.regular}
                color={Colors.appTrans}
              />
            )}
          />
        </View>
      </Animated.View>
      <ModalConfirm
        body={() => (
          <QuantityForm
            data={{
              product_name: item['productName'],
              quantity: item['quantity'] - item['allocatedQuantity'],
              stock: item['lot_quantity'],
              actual_quantity:
                item['quantity'] - item['allocatedQuantity'] <
                item['lot_quantity']
                  ? item['quantity'] - item['allocatedQuantity']
                  : item['lot_quantity'],
            }}
            ref={quantityForm}
            title1={'Số lượng còn lại'}
            title2={'Nhập số lượng pick'}
            title3={'Số lượng tồn kho'}
          />
        )}
        onClose={() => onPress(defaultValue)}
        onSubmit={onSubmit}
        visible={visible}
      />
    </View>
  );
};

const Item = props => {
  const {item, index} = props;
  let total = 0;
  if (item['products'].length > 0)
    total = item['products']
      .map(x => x['quantity'] - x['allocatedQuantity'])
      .reduce((a, b) => a + b);
  return total > 0 ? (
    <View style={styles.container} key={'location' + index}>
      <View style={styles.container_header}>
        <Text
          text={item['locationName']}
          size={Fonts['size']['android']['title']}
          font={Fonts['style']['android']['medium']}
          color={Colors.appPrimaryColor}
        />
      </View>
      {item['products'].map((e, idx) => {
        e['locationId'] = item['locationId'];
        return e['quantity'] - e['allocatedQuantity'] > 0 ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() =>
              props.onPress({
                locationId: item['locationId'],
                locationName: item['locationName'],
                lots: item['stockDetails'],
                ...e,
                productName: e['merchantProduct'],
              })
            }
            key={'product' + idx}
            style={[
              styles.container_item,
              idx + 1 != item['products'].length
                ? {
                    marginBottom: Metrics.margin.regular,
                  }
                : null,
            ]}>
            <View style={{width: (Metrics.width * 2) / 4}}>
              <Text
                text={e['merchantProductNumber']}
                size={Fonts['size']['android']['normal'] - 2}
                font={Fonts['style']['android']['medium']}
                style={{flexShrink: 1}}
              />
              <Text
                text={e['merchantProduct']}
                size={Fonts['size']['android']['normal'] - 2}
                style={{flexShrink: 1}}
                line={2}
              />
            </View>
            <View style={styles.container_input}>
              <View
                style={{
                  width: Metrics.width / 4 - Metrics.margin.regular * 2,
                  height: 45,
                  ...Styles.center,
                  backgroundColor: Colors.appPrimaryColor,
                  marginHorizontal: Metrics.margin.regular,
                  borderRadius: Metrics.borderRadius.medium,
                }}>
                <Text
                  text={e['stock'] - e['reversedQuantity']}
                  size={Fonts['size']['android']['message']}
                  font={Fonts['style']['android']['medium']}
                  color={Colors.appWhite}
                />
              </View>
            </View>
            <View style={styles.container_input}>
              <View
                style={{
                  width: Metrics.width / 4 - Metrics.margin.regular * 2,
                  height: 45,
                  ...Styles.center,
                  backgroundColor: '#fff2cc',
                  marginHorizontal: Metrics.margin.regular,
                  borderRadius: Metrics.borderRadius.medium,
                }}>
                <Text
                  text={e['quantity'] - e['allocatedQuantity']}
                  size={Fonts['size']['android']['message']}
                  font={Fonts['style']['android']['medium']}
                  color={Colors.appOrange}
                />
              </View>
            </View>
          </TouchableOpacity>
        ) : null;
      })}
    </View>
  ) : null;
};

const ItemLot = props => {
  const {item, index, onPress, data} = props;
  return item['quantity'] > 0 ? (
    <View key={`lot-${index}`} style={styles.container_item_lot}>
      <View style={{flex: 1}}>
        <Text
          text={
            String(item['lotNumber']) == 'false' ? 'N/A' : item['lotNumber']
          }
          size={Fonts['size']['android']['normal']}
          font={Fonts['style']['android']['medium']}
          color={Colors.overlay6}
          style={{marginBottom: Metrics.margin.tiny}}
        />
        <Text
          text={
            'Exp: ' +
            (item['expiredDate']
              ? moment(item['expiredDate']).format('DD-MM-YYYY HH:mm')
              : 'Không có')
          }
          size={Fonts['size']['android']['action']}
          font={Fonts['style']['android']['medium']}
          color={Colors.overlay5}
        />
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
            height: 45,
            ...Styles.center,
            backgroundColor: '#d2edf8',
            marginHorizontal: Metrics.margin.regular,
            borderRadius: Metrics.borderRadius.medium,
          }}>
          <Text
            text={`${data['quantity'] - data['allocatedQuantity']}/${
              item['quantity']
            }`}
            size={Fonts['size']['android']['message']}
            font={Fonts['style']['android']['medium']}
          />
        </View>
        <Button
          text={String('pick').toUpperCase()}
          backgroundColor={Colors.appTrans}
          borderColor={Colors.appColor_logi}
          border={1.5}
          color={Colors.appColor_logi}
          height={45}
          width={75}
          style={{paddingVertical: Metrics.margin.small}}
          onPress={() =>
            onPress({
              lotId: item['lotId'],
              lotNumber: item['lotNumber'],
              lot_quantity: item['quantity'],
            })
          }
        />
      </View>
    </View>
  ) : null;
};

export default PickConfirm;
