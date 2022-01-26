import React, {useState} from 'react';
import {FlatList, View, SectionList} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import styles from './styles';
import {
  Styles,
  Images,
  Metrics,
  Fonts,
  Colors,
} from '../../../../../assets/styles';
import {Divider, Text} from '../../../../../components';
import Header from '../../../../components/Header';

const actions = {
  attach_vehicle: {
    image: Images['sbs']['icReturn'],
    text: 'Nhận xe',
  },
  detach_vehicle: {
    image: Images['sbs']['icReturn'],
    text: 'Trả xe',
  },
  add_image: {
    image: Images['sbs']['icOrder'],
    text: 'Thêm ảnh vào bill',
  },
  upload_manifest: {
    image: Images['sbs']['icOrder'],
    text: 'Upload bill',
  },
  report_incident: {
    image: Images['sbs']['icTruckBroken'],
    text: 'Báo cáo sự cố',
  },
  report_gas_pump: {
    image: Images['sbs']['icRefuel'],
    text: 'Thêm <> lít nhiên liệu',
  },
};

const Render = props => {
  return (
    <View style={Styles.container}>
      <Header
        onBack={props.navigation.goBack}
        text={'Lịch sử hoạt động'}
        company={props['company']}
      />
      <FlatList
        refreshing={false}
        data={props['data']}
        onRefresh={() => props.onMore(true)}
        onEndReached={() => props.onMore(false)}
        onEndReachedThreshold={0.2}
        renderItem={({item, index}) => {
          const {month, action, taken_at, metadata} = item;
          let data = '';

          if (metadata['bill_id'])
            data = `${actions[action].text} ${metadata['bill_id']}`;
          else if (metadata['incident_code'])
            data = `${actions[action].text} ${props['incidents'][
              metadata['incident_code']
            ].name.toLowerCase()} xe ${metadata['vehicle'] ?? ''}`;
          else if (metadata['liter'])
            data = `${actions[action].text.replace(
              '<>',
              metadata['liter'],
            )} cho xe ${metadata['vehicle']}`;
          else {
            data = `${actions[action].text} ${metadata['vehicle']}`;
          }
          return (
            <View key={`header-${index}`} style={styles.container}>
              {month ? (
                <Text
                  text={`Tháng ${month}`}
                  color={Colors.overlay8}
                  size={Fonts['size']['android']['title']}
                  font={Fonts['style']['android']['medium']}
                  style={styles.header}
                />
              ) : null}
              <View style={styles.container_item}>
                <View style={styles.icon}>
                  <FastImage source={actions[action].image} style={{flex: 1}} />
                </View>
                <View>
                  <Text
                    text={data}
                    font={Fonts['style']['android']['medium']}
                    size={Fonts['size']['android']['normal']}
                  />
                  <Text
                    text={moment(taken_at).format('HH:mm DD-MM-YYYY')}
                    color={Colors.appLightGrayColor}
                    size={Fonts['size']['android']['normal']}
                  />
                </View>
              </View>
              <Divider
                height={0.8}
                width={Metrics.width - Metrics.margin.regular * 2}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Render;
