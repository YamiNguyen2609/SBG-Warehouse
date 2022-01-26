import React, {useState, useEffect} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import r from 'reactotron-react-native';

import styles from './styles';
import {Styles, Metrics, Colors} from '../../../assets/styles';
import Header from '../Header';
import {getToken} from '../../../helpers/LocalStorage';
import BuildConfig from '../../../config/BuildConfig';

const Detail = props => {
  const {visible, data = {bill_id: ''}, company = 'sbs'} = props;
  const [token, setToken] = useState(null);
  const [active, setActive] = useState(0);
  const [thumbs, setThumbs] = useState([]);

  useEffect(() => getToken());

  const getToken = async () => {
    if (!token) {
      let token_string = await getToken();

      setToken(JSON.parse(token_string));
    }
  };

  useEffect(() => {
    if (visible) {
      setThumbs(Object.keys(data['thumbs']));
    }
  }, [visible]);

  return (
    <Modal
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
      isVisible={visible}
      style={Styles.modal}>
      <View style={Styles.container}>
        <Header
          text={data['bill_id']}
          company={company}
          onBack={props.goBack}
        />
        <View style={{flex: 1}}>
          <Swiper
            loop={false}
            onIndexChanged={idx => setActive(idx)}
            showsPagination={false}>
            {thumbs.map((e, idx) =>
              token ? (
                <View
                  key={`img${idx}`}
                  style={[Styles.container, Styles.center]}>
                  <FastImage
                    style={styles.image}
                    source={{
                      uri: `https://${BuildConfig}api.globex.vn/tms/manifest/image?img_name=${e}`,
                      headers: {
                        'Access-token': token['access_system'],
                        responseType: 'arraybuffer',
                      },
                      priority: FastImage.priority.normal,
                    }}
                  />
                </View>
              ) : null,
            )}
          </Swiper>
          <View style={{paddingVertical: Metrics.margin.huge}}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={thumbs}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={[
                    styles.thumb,
                    index == thumbs.length
                      ? {marginRight: Metrics.margin.regular}
                      : null,
                    active == index
                      ? {
                          borderWidth: 1.5,
                          borderColor: Colors[`appColor_${company}`],
                        }
                      : null,
                  ]}
                  key={index}>
                  <FastImage
                    source={{
                      uri: `data:image/jpg;base64,${data['thumbs'][item]}`,
                    }}
                    style={{flex: 1}}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Detail;
