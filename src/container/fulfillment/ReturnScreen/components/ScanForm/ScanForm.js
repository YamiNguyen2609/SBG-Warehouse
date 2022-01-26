import React, {useRef} from 'react';
import {View, TouchableOpacity} from 'react-native';

import styles from './styles';
import Header from '../../../../components/Header';
import InputSearch from '../../../../components/InputSearch';
import {Metrics, Fonts, Colors} from '../../../../../assets/styles';
import {Input, Text} from '../../../../../components';

const defaultValue = {
  id: '',
  value: '',
};

const ScanForm = props => {
  let input = useRef(null);

  const onSubmit = () => {};

  return (
    <View style={styles.container}>
      <Header onBack={props.goBack} text={'Scan trả hàng'} company={'logi'} />
      <View style={{backgroundColor: Colors.appWhite}}>
        <InputSearch
          title={'chọn mã lỗi'}
          placeholder={'Nhập mã lỗi'}
          errorText={'Mã lỗi không tồn tại'}
          data={[]}
          style={{
            width: Metrics.width - Metrics.margin.regular * 2,
            marginHorizontal: Metrics.margin.regular,
            marginBottom: Metrics.margin.regular,
          }}
          itemSelect={defaultValue}
        />
      </View>
      <View style={[styles.container_counter, {paddingVertical: 0}]}>
        <View style={{flex: 1}}>
          <Input
            placeholder={'Nhập mã đơn hàng'}
            ref={input}
            style={styles.input}
            onSubmit={onSubmit}
          />
        </View>
        <TouchableOpacity style={styles.button_action} onPress={onSubmit}>
          <Text text={'Xong'} size={Fonts['size']['android']['message']} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScanForm;
