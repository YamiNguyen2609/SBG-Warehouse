import React, {useState, useEffect, useRef} from 'react';
import {FlatList, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import r from 'reactotron-react-native';

import styles from './styles';
import {Styles, Fonts, Colors, Metrics} from '../../../../../assets/styles';
import {Button, Divider, Input, Text} from '../../../../../components';
import {getReceipt} from '../../../../../redux/fulfillment/redux/getReceipt';
import HeaderTab from '../../../../components/HeaderTab';

let flagPut = 0;

const ReceiptForm = props => {
  const dispatch = useDispatch();
  const [state, setState] = useState(0);
  const {data} = props;

  useEffect(() => {
    if (props['flag_put'] != flagPut) {
      flagPut = props['flag_put'];
      dispatch(getReceipt(data['orderId']));
    }
  }, [props['flag_put']]);

  return (
    <View style={[Styles.container]}>
      <HeaderTab
        onPress={setState}
        state={state}
        data={[
          {
            id: 0,
            title: 'Danh sách',
          },
          {
            id: 1,
            title: 'Lịch sử',
          },
        ]}
      />
      <Swiper
        onIndexChanged={index => setState(index)}
        showsPagination={false}
        index={state}
        loop={false}>
        <FlatList
          data={data['order_lines']}
          renderItem={item => (
            <Form
              {...item}
              onPress={props['onPress']}
              total={data['order_lines'].length}
              data={data}
            />
          )}
          ItemSeparatorComponent={() => (
            <Divider height={Metrics.margin.regular} color={Colors.appTrans} />
          )}
        />
        <FlatList
          data={data['allocated_lines']}
          renderItem={item => (
            <History
              {...item}
              total={data['allocated_lines'].length}
              data={data}
            />
          )}
          ItemSeparatorComponent={() => (
            <Divider height={Metrics.margin.regular} color={Colors.appTrans} />
          )}
        />
      </Swiper>
    </View>
  );
};

const Form = props => {
  const {item, index, total, data} = props;

  let item_allocated = data['allocated_lines'].filter(
    x => x['rootLineId'] == item['line_id'],
  );

  if (item_allocated.length > 0)
    var quantity_allocated = item_allocated
      .map(x => x['allocatedQuantity'])
      .reduce((a, b) => a + b);

  let quantity =
    item_allocated.length > 0
      ? `${quantity_allocated}/${parseFloat(item['actual_quantity'])}`
      : `${0}/${parseFloat(item['actual_quantity'])}`;

  return (
    <View
      key={`form-${index}`}
      style={[
        styles.container,
        !index ? {marginTop: Metrics.margin.regular} : null,
        index + 1 == total ? {marginBottom: Metrics.margin.regular} : null,
      ]}>
      <View style={{flex: 1}}>
        <Text
          text={item['product_name']}
          size={Fonts['size']['android']['normal'] - 2}
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
            text={quantity}
            size={Fonts['size']['android']['message']}
            font={Fonts['style']['android']['medium']}
            color={Colors.appOrange}
          />
        </View>
        {quantity_allocated != item['actual_quantity'] ? (
          <Button
            text={String('Put').toUpperCase()}
            backgroundColor={Colors.appTrans}
            borderColor={Colors.appColor_logi}
            border={1.5}
            color={Colors.appColor_logi}
            height={45}
            width={75}
            style={{paddingVertical: Metrics.margin.small}}
            onPress={() =>
              props['onPress']({
                ...item,
                orderType: data['orderType'],
                actual_quantity:
                  item_allocated.length > 0
                    ? parseFloat(item['actual_quantity']) - quantity_allocated
                    : parseFloat(item['actual_quantity']),
              })
            }
          />
        ) : (
          <View
            style={{
              backgroundColor: Colors.appGreen,
              height: 45,
              width: 75,
              borderRadius: Metrics.borderRadius.medium,
              ...Styles.center,
            }}>
            <Icon
              name={'ios-checkmark'}
              size={Metrics.icon.large}
              color={Colors.appWhite}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const History = props => {
  const {item, index, total, data} = props;

  return (
    <View
      key={`history-${index}`}
      style={[
        styles.container,
        {paddingHorizontal: 0, flexDirection: 'column'},
        !index ? {marginTop: Metrics.margin.regular} : null,
        index + 1 == total ? {marginBottom: Metrics.margin.regular} : null,
      ]}>
      <View style={styles.item_header}>
        <Text
          text={item['product_name']}
          size={Fonts['size']['android']['normal'] - 1}
          font={Fonts['style']['android']['medium']}
          color={Colors.appColor_logi}
        />
      </View>
      <View style={styles.item_body}>
        <View style={styles.item_row}>
          <Text
            text={'Kho'}
            size={Fonts['size']['android']['normal']}
            color={Colors.overlay5}
            font={Fonts['style']['android']['medium']}
            style={{flex: 0.5}}
          />
          <Text
            text={item['warehouseCode']}
            size={Fonts['size']['android']['normal']}
            font={Fonts['style']['android']['medium']}
            align={'right'}
          />
        </View>
        <View style={styles.item_row}>
          <Text
            text={'Location'}
            size={Fonts['size']['android']['normal']}
            color={Colors.overlay5}
            font={Fonts['style']['android']['medium']}
            style={{flex: 0.5}}
          />
          <Text
            text={item['locationName']}
            size={Fonts['size']['android']['normal']}
            font={Fonts['style']['android']['medium']}
            align={'right'}
          />
        </View>
        <View style={styles.item_row}>
          <Text
            text={'Số lượng'}
            size={Fonts['size']['android']['normal']}
            color={Colors.overlay5}
            font={Fonts['style']['android']['medium']}
            style={{flex: 0.5}}
          />
          <Text
            text={item['allocatedQuantity']}
            size={Fonts['size']['android']['normal']}
            font={Fonts['style']['android']['medium']}
            align={'right'}
          />
        </View>
        <View style={styles.item_row}>
          <Text
            text={'Ngày hết hạn'}
            size={Fonts['size']['android']['normal']}
            color={Colors.overlay5}
            font={Fonts['style']['android']['medium']}
            style={{flex: 0.5}}
          />
          <Text
            text={
              item['expiredDate']
                ? moment(item['expiredDate']).format('DD-MM-YYYY')
                : ''
            }
            size={Fonts['size']['android']['normal']}
            font={Fonts['style']['android']['medium']}
            align={'right'}
          />
        </View>
      </View>
    </View>
  );
};

export default ReceiptForm;
