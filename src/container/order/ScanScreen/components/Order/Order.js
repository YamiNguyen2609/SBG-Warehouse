import React, {useImperativeHandle, useState, useEffect, useRef} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

import styles from './styles';
import {Colors, Fonts, Metrics, Styles} from '../../../../../assets/styles';
import Header from '../../../../components/Header';
import {Button, Text} from '../../../../../components';
import {dispatchOrder} from '../../../../../redux/order/redux/dispatchOrder';

const Order = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useImperativeHandle(ref, () => ({
    onAdd,
  }));

  const onAdd = item => {
    let temp = [item].concat(data);

    setData([...temp]);
  };

  const onSelect = item => {
    let index = data.findIndex(x => x == item);

    data[index]['selected'] = !data[index]['selected'];

    setData([...data]);
  };

  const onDelete = () => setData([...data.filter(x => !x['selected'])]);

  const onPress = () => dispatch(dispatchOrder(data.map(e => e.data)));

  return (
    <View
      style={[
        Styles.container,
        Styles.center,
        {paddingBottom: Metrics.margin.large},
      ]}>
      <Header
        text={'Danh sách đã scan'}
        onBack={props.onBack}
        company={'sbp'}
        right={
          <TouchableOpacity onPress={onDelete}>
            <Icon
              name="ios-trash"
              size={Metrics.icon.regular}
              color={Colors.appWhite}
            />
          </TouchableOpacity>
        }
      />
      <FlatList
        data={data}
        style={{width: Metrics.width}}
        ItemSeparatorComponent={() => (
          <View style={{height: Metrics.margin.large}} />
        )}
        renderItem={({item, index}) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => onSelect(item)}
            style={[
              styles.container,
              !index ? {marginTop: Metrics.margin.large} : null,
              index + 1 == props['data'].length
                ? {marginBottom: Metrics.margin.large}
                : null,
              item['selected']
                ? {
                    backgroundColor: Colors.appLightGrayColor,
                  }
                : null,
            ]}>
            <Text
              text={item['data']}
              size={Fonts['size']['android']['message']}
            />
          </TouchableOpacity>
        )}
      />
      <Button
        text={'Xác nhận'}
        type={'confirm'}
        width={Metrics.width - Metrics.margin.large * 2}
        onPress={onPress}
      />
    </View>
  );
});

export default Order;
