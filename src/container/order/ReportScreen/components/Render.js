import React from 'react';
import {FlatList, View} from 'react-native';

import styles from './styles';
import {Colors, Fonts, Metrics, Styles} from '../../../../assets/styles';
import Header from '../../../components/Header';
import {Divider, Text} from '../../../../components';
import {formatPrice} from '../../../../helpers/Utils';

const Render = props => {
  return (
    <View style={Styles.container}>
      <Header
        company={'sbp'}
        onBack={props.navigation.goBack}
        text={'Kiểm kê'}
      />
      <FlatList
        data={props['data']}
        ItemSeparatorComponent={() => (
          <View style={{height: Metrics.margin.large}} />
        )}
        renderItem={({item, index}) => (
          <View
            key={index}
            style={[
              styles.card,
              !index ? {marginTop: Metrics.margin.large} : null,
              props['data'].length == index + 1
                ? {marginBottom: Metrics.margin.large}
                : null,
            ]}>
            <Text
              text={item['order']['orderNumber']}
              size={Fonts['size']['android']['title']}
              font={Fonts['style']['android']['medium']}
              style={{
                marginBottom: Metrics.margin.small,
                marginLeft: Metrics.margin.small,
              }}
            />
            <Divider height={1.5} />
            <View style={styles.container}>
              <Text
                text={'Trạng thái'}
                size={Fonts['size']['android']['normal']}
                color={Colors.appGrayColor}
              />
              <Text
                text={item['order']['statusName']['vi']}
                size={Fonts['size']['android']['message']}
              />
            </View>
            <View style={styles.container}>
              <Text
                text={'Tiền thu'}
                size={Fonts['size']['android']['normal']}
                color={Colors.appGrayColor}
              />
              <Text
                text={`${formatPrice(
                  item['codCourierDebt'].replace('.000', ''),
                )} ${item['unitFee']}`}
                size={Fonts['size']['android']['message']}
              />
            </View>
            <View style={styles.container}>
              <Text
                text={'Nộp kế toán'}
                size={Fonts['size']['android']['normal']}
                color={Colors.appGrayColor}
              />
              <Text
                text={`${formatPrice(
                  item['codCourierPaid'].replace('.000', ''),
                )} ${item['unitFee']}`}
                size={Fonts['size']['android']['message']}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Render;
