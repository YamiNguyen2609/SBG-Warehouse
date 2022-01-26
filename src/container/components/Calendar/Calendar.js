import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import IonIcon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import {Fonts, Metrics, Styles, Colors} from '../../../assets/styles';
import {Divider, Text} from '../../../components';
import styles from './styles';

LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ],
  dayNames: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
  dayNamesShort: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
  today: '',
};

LocaleConfig.defaultLocale = 'vi';

const AppCalendar = props => {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const {
    visible = true,
    dateSelect = moment().format('YYYY-MM-DD'),
    minDate,
    maxDate,
  } = props;

  useEffect(() => {
    if (dateSelect != date) setDate(dateSelect);
  }, [dateSelect]);

  const onchange = day => setDate(day['dateString']);

  return (
    <Modal
      onBackdropPress={props.onClose}
      isVisible={visible}
      style={[Styles.modal, {paddingHorizontal: Metrics.margin.regular}]}>
      <View style={styles.container}>
        <Calendar
          style={{
            paddingBottom: Metrics.margin.regular,
          }}
          firstDay={0}
          enableSwipeMonths={true}
          current={date}
          onDayPress={props.onSubmit}
          markedDates={{
            [date]: {selected: true},
          }}
          renderArrow={direction => (
            <IonIcon
              name={
                direction == 'left'
                  ? 'ios-chevron-back-outline'
                  : 'ios-chevron-forward-outline'
              }
              size={Fonts.size.h5}
              color={Colors.appPrimaryColor}
            />
          )}
          {...props}
        />
        {/* <Divider height={1.5} />
        <View style={styles.container_input}>
          <TextInput
            placeholderTextColor={Colors.appLightGrayColor}
            placeholder={'dd-mm-yyyy'}
            style={styles.input}
            onChangeText={onChangeText}
          />
        </View>
        <View style={styles.container_button}>
          <TouchableOpacity onPress={props.onClose} style={styles.button}>
            <Text
              text={'Huỷ'}
              size={Fonts['size']['android']['message']}
              font={Fonts['style']['android']['medium']}
            />
          </TouchableOpacity>
          <Divider width={1.5} height={'100%'} />
          <TouchableOpacity
            onPress={() => props.onSubmit(date)}
            style={styles.button}>
            <Text
              text={'Xác nhận'}
              size={Fonts['size']['android']['message']}
              font={Fonts['style']['android']['medium']}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    </Modal>
  );
};

export default AppCalendar;
