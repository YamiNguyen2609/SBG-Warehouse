import React, {useState, useRef, useImperativeHandle, useEffect} from 'react';
import {TouchableOpacity, View, Keyboard} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import r from 'reactotron-react-native';
import FS from 'react-native-fs';
import Resize from 'react-native-image-resizer';
import {useStore} from 'react-redux';

import styles from './styles';
import {Styles, Images, Metrics, Fonts, Colors} from '../../../assets/styles';
import {Divider, Text, Input, Indicator} from '../../../components';
import ImageForm from '../ImageForm';

const Form = React.forwardRef((props, ref) => {
  let input = useRef(null);
  const {placeholder = '', showSoftInputOnFocus = true, onSubmit = {}} = props;

  onfocus = () => {
    if (input) {
      input.current.focus();
    }
  };

  onBlur = () => {
    if (input) input.current.blur();
  };

  onClear = () => {
    if (input) input.current.setText('');
  };

  useImperativeHandle(ref, () => ({
    focus: onfocus,
    blur: onBlur,
    clear: onClear,
    getText: () => input.current.value,
  }));

  return (
    <View style={[styles.container_search]}>
      <Input
        ref={input}
        showSoftInputOnFocus={showSoftInputOnFocus}
        placeholder={placeholder}
        style={styles.input}
        onSubmit={onSubmit}
      />
      <TouchableOpacity
        onPress={() => {
          props.onBarCodeRead(String(input.current.value), 2);
          input.current.setText('');
        }}>
        <Text text={'Xong'} size={Fonts['size']['android']['message']} />
      </TouchableOpacity>
    </View>
  );
});

const Camera = React.forwardRef((props, ref) => {
  const store = useStore();
  stateBluetooth = store.getState()['app']['deviceState'];

  const camera = useRef(null);
  const imgForm = useRef(null);
  const inputForm = useRef(null);
  const [state, setState] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const {
    style,
    isScan = true,
    isFlash = true,
    text = '',
    searchForm = {active: true, placeholder: '', activeArea: true},
    imageForm = {active: true, placeholder: ''},
  } = props;

  useImperativeHandle(ref, () => ({
    getPhoto: onTakePicture,
    getImages: imgForm.current ? imgForm.current.images : [],
    setLoading: setIndicator,
  }));

  const onTakePicture = async () => {
    if (camera) {
      setIndicator(true);
      const options = {
        quality: 1,
        base64: true,
      };
      const data = await camera.current.takePictureAsync(options);
      const {uri, width} = data;

      if (imageForm['active']) {
        let path = `${FS.ExternalDirectoryPath}/${imageForm['placeholder']}/`;

        if (!(await FS.exists(path))) await FS.mkdir(path);

        let image = await Resize.createResizedImage(
          uri,
          width,
          width,
          'JPEG',
          100,
          0,
          path,
          false,
          {
            onlyScaleDown: true,
          },
        );

        let item = {
          uri: image.uri.toLowerCase(),
          name: image.name.toLowerCase(),
        };

        imgForm.current.onAdd(item);
        setIndicator(false);
      } else {
        setIndicator(false);

        return data;
      }
    }
  };

  useEffect(() => {
    if (searchForm['active'])
      if (stateBluetooth) inputForm.current.focus();
      else inputForm.current.blur();
  }, [stateBluetooth]);

  return (
    <View style={[Styles.container, style]}>
      <View style={styles.container_header}>
        <TouchableOpacity
          hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
          onPress={props.onBack}
          style={styles.icon}>
          <IonIcon
            name="ios-chevron-back"
            color={Colors.appWhite}
            size={Metrics.icon.large}
          />
        </TouchableOpacity>
        <Text
          text={text}
          size={Fonts['size']['android']['title']}
          font={Fonts['style']['android']['medium']}
          color={Colors.appWhite}
        />
        {isFlash ? (
          <TouchableOpacity
            onPress={() => setState(!state)}
            style={styles.icon}>
            <Icon
              name={'flashlight'}
              size={Metrics.icon.regular}
              color={!state ? Colors.appWhite : Colors.appYellow}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.icon} />
        )}
      </View>
      <RNCamera
        ref={camera}
        style={styles.container}
        flashMode={
          state
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        onBarCodeRead={e => {
          if (isScan) {
            const {width, height, origin} = e.bounds;

            let minX = (260 * width) / 1600;
            let maxX = (964 * width) / 1600;
            let minY = (550 * height) / 1200;
            let maxY = (1000 * height) / 1200;

            if (
              //origin[0].x >= minX &&
              //origin[1].x <= maxX &&
              origin[0].y >= minY &&
              origin[1].y <= maxY
            ) {
              props.onBarCodeRead(String(e.data), 1);
            }
          }
        }}
      />
      {searchForm['activeArea'] ? (
        <View style={styles.container_absolute}>
          <View style={styles.container_around}></View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.container_around}></View>
            <View style={styles.container_barcode}>
              <View style={styles.barcode} />
            </View>
            <View style={styles.container_around}></View>
          </View>
          <View style={styles.container_around}></View>
        </View>
      ) : null}
      {imageForm['active'] ? (
        <ImageForm ref={imgForm} onTakePicture={onTakePicture} {...imageForm} />
      ) : null}
      {searchForm['active'] ? (
        <Form
          {...searchForm}
          ref={inputForm}
          showSoftInputOnFocus={!stateBluetooth}
          onSubmit={() => {
            props.onBarCodeRead(String(inputForm.current.getText()), 2);
            inputForm.current.clear();
          }}
        />
      ) : null}
      <Indicator visible={indicator} />
    </View>
  );
});

export default Camera;
