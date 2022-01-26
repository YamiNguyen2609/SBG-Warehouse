import React, {useState, useEffect, useRef} from 'react';
import {FlatList, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

import styles from './styles';
import {Styles, Fonts, Colors, Metrics} from '../../../../../assets/styles';
import {Button, Divider, Input, Text} from '../../../../../components';
import {receiptOrder} from '../../../../../redux/fulfillment/redux/receiptOrder';

const ReturnForm = props => {
  let total = props['data']['order_lines'].length;
  let total_new = props['data']['order_lines'].filter(
    x => x['status'] == 'new',
  ).length;
  return (
    <View style={[Styles.container]}>
      <FlatList
        data={props['data']['order_lines']}
        renderItem={({item, index}) => {
          return (
            <View
              style={[
                styles.container,
                !index ? {marginTop: Metrics.margin.regular} : null,
                index + 1 == props['data']['order_lines'].length
                  ? {marginBottom: Metrics.margin.regular}
                  : null,
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
                    text={`${item['actual_quantity']}/${item['order_quantity']}`}
                    size={Fonts['size']['android']['message']}
                    font={Fonts['style']['android']['medium']}
                    color={Colors.appOrange}
                  />
                </View>
                {item['order_quantity'] - item['actual_quantity'] > 0 ? (
                  <Button
                    text={'Nhận'}
                    backgroundColor={Colors.appTrans}
                    borderColor={Colors.appColor_logi}
                    border={1.5}
                    color={Colors.appColor_logi}
                    height={45}
                    width={75}
                    size={Fonts['size']['android']['action']}
                    style={{paddingVertical: Metrics.margin.small}}
                    onPress={() =>
                      props['onPress']({
                        line_id: item['line_id'],
                        product_name: item['product_name'],
                        actual_quantity:
                          item['order_quantity'] - item['actual_quantity'],
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
        }}
        ItemSeparatorComponent={() => (
          <Divider height={Metrics.margin.regular} color={Colors.appTrans} />
        )}
      />
      {props['isReceipt'] ? (
        <View
          style={[
            Styles.center,
            {
              paddingVertical: Metrics.margin.regular,
              elevation: 20,
              backgroundColor: Colors.appWhite,
            },
          ]}>
          <Button
            text={'Hoàn tất trả hàng'}
            backgroundColor={Colors.appPrimaryColor}
            width={Metrics.width - Metrics.margin.regular * 2}
            onPress={props.onSubmit}
          />
        </View>
      ) : null}
    </View>
  );
};

export default ReturnForm;
