import React, {useState, useEffect, useRef} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import r from 'reactotron-react-native';
import Swiper from 'react-native-swiper';

import {Styles, Metrics, Colors, Fonts} from '../../../../../assets/styles';
import Camera from '../../../../components/Camera';
import {showFlagMessage, hideFlagMessage} from '../../../../../redux/app';
import styles from './styles';
import Order from '../Order';
import {Divider, Input, Text} from '../../../../../components';
import Header from '../../../../components/Header';
import {checkIn} from '../../../../../redux/order/redux/checkIn';
import {getCheckIns} from '../../../../../redux/order/redux/getCheckIns';

const Render = props => {
  const dispatch = useDispatch();
  const swiper = useRef(null);
  const input = useRef(null);
  const [data, setData] = useState(props['data']);
  const [flag, setFlag] = useState(props['flag']);
  const [station, setStation] = useState(0);

  const onBarCodeRead = (code, state) => {
    //1: camera, 2: input
    if (state == 1) {
      dispatch(
        showFlagMessage({
          item: [`Đã tìm thấy ${code}`],
          buttons: [
            {
              text: 'Quay lại',
              onPress: () => dispatch(hideFlagMessage()),
            },
            {
              text: 'Tiếp tục',
              onPress: () => {
                dispatch(hideFlagMessage());
                setTimeout(
                  () => dispatch(checkIn({stationId: station, HAWB: code})),
                  300,
                );
              },
            },
          ],
        }),
      );
    } else {
      if (data) dispatch(checkIn({stationId: station, HAWB: code}));
    }
  };

  const onBack = () => swiper.current.scrollTo(0);

  useEffect(() => {
    if (station != 0) swiper.current.scrollTo(1);
  }, [station]);

  useEffect(() => {
    if (data.length == 0) setData(props['data']);
  }, [props['data']]);

  useEffect(() => {
    if (flag != props['flagFinish']) {
      setFlag(props['flagFinish']);
      swiper.current.scrollTo(1);
    }
  }, [props['flagFinish']]);

  const onCallBack = value => {
    if (value)
      var temp = props['data'].filter(
        x => x['name'].toLowerCase().indexOf(value.toLowerCase()) > -1,
      );
    else temp = props['data'];

    return setData([...temp]);
  };

  const getCheckIn = () => {
    swiper.current.scrollTo(2);
    dispatch(getCheckIns(station));
  };

  return (
    <Swiper
      ref={swiper}
      showsPagination={false}
      scrollEnabled={false}
      loop={false}>
      <View style={[Styles.container, {backgroundColor: Colors.appWhite}]}>
        <Header
          text={'Chọn trạm'}
          onBack={props.navigation.goBack}
          company={'sbp'}
        />
        <View style={styles.container_search}>
          <Input
            ref={input}
            width={Metrics.width - Metrics.margin.regular * 2}
            placeholder={'Tìm trạm'}
            style={{borderColor: Colors.appLightGrayColor}}
            callback={onCallBack}
          />
        </View>
        <FlatList
          data={data}
          style={{
            paddingHorizontal: Metrics.margin.large,
            backgroundColor: Colors.appWhite,
          }}
          ItemSeparatorComponent={() => <Divider height={1.5} />}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.container}
              onPress={() => setStation(item['id'])}>
              <Text
                text={item['name']}
                size={Fonts['size']['android']['message']}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={Styles.container}>
        <Camera
          onBack={onBack}
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
        <TouchableOpacity
          activeOpacity={1}
          onPress={getCheckIn}
          style={styles.button_package}>
          <Icon
            name={'package'}
            size={Metrics.icon.huge}
            color={Colors.appWhite}
          />
        </TouchableOpacity>
      </View>
      <View style={Styles.container}>
        <Order
          data={props['dataCheckIn']}
          stationId={station}
          onBack={() => (swiper.current ? swiper.current.scrollTo(1) : {})}
        />
      </View>
    </Swiper>
  );
};

export default Render;
