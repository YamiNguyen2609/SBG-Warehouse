import React, {useState, useEffect, useImperativeHandle} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import {Button, Text} from '../../../components';
import {Colors, Metrics, Styles} from '../../../assets/styles';

const ImageForm = React.forwardRef((props, ref) => {
  let [images, setImages] = useState([]);
  const {
    placeholder,
    data,
    textColor,
    left = {component: <View />, style: null},
    right = {component: <View />, style: null},
  } = props;

  useEffect(() => {
    setImages(
      data.map(e => {
        return {
          ...e,
          selected: false,
        };
      }),
    );
  }, [data]);

  useImperativeHandle(ref, () => ({
    onAdd,
    images,
  }));

  const onSelect = item => {
    let index = images.findIndex(x => x == item);
    item['selected'] = !item['selected'];
    images[index] = item;
    setImages([...images]);
  };

  const onAdd = item => setImages([...[item].concat(images)]);

  const onDelete = () =>
    setImages([...images.filter(x => x['selected'] == false)]);

  const onPressRight = () => right.onPress(images);

  const onPressLeft = () => left.onPress(images);

  return (
    <View style={styles.container}>
      <View style={styles.container_button}>
        <TouchableOpacity
          onPress={onPressLeft}
          style={[
            styles.button,
            left['validate']
              ? images.length > 0
                ? left['style']
                : null
              : null,
          ]}>
          {left['validate']
            ? images.length > 0
              ? left['component']
              : null
            : left['component']}
        </TouchableOpacity>
        <Button
          style={styles.button}
          borderColor={Colors.appWhite}
          border={0.8}
          onPress={props.onTakePicture}
          render={() => (
            <Icon
              name={'ios-camera'}
              size={Metrics.icon.normal}
              color={Colors.appWhite}
            />
          )}
        />
        <TouchableOpacity
          onPress={onPressRight}
          style={[
            styles.button,
            right['validate']
              ? images.length > 0
                ? right['style']
                : null
              : null,
          ]}>
          {right['validate']
            ? images.length > 0
              ? right['component']
              : null
            : right['component']}
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.container_image,
          images.length == 0 ? {paddingBottom: 0} : null,
        ]}>
        <View style={styles.header}>
          <Text text={placeholder} color={textColor} style={Styles.title} />
          <TouchableOpacity
            hitSlop={{top: 5, left: 5, right: 5, bottom: 5}}
            onPress={onDelete}
            disabled={images.length == 0}
            activeOpacity={0.9}>
            <Icon
              name={'ios-trash'}
              color={images.length > 0 ? Colors.appRed : Colors.appWhite}
              size={Metrics.icon.regular}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={images}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View width={Metrics.margin.large} />}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              style={styles.thumb}
              onPress={() => onSelect(item)}>
              <FastImage
                style={{flex: 1}}
                source={{
                  uri: item['uri'],
                }}
              />
              {item['selected'] && !item['isExist'] ? (
                <View style={styles.selected}>
                  <Icon
                    name={'ios-checkmark-circle-outline'}
                    size={Metrics.icon.regular}
                    color={textColor}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
});

export default ImageForm;
