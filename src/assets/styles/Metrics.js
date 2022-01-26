import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');
const ratio = PixelRatio.get();

const Metrics = {
  width,
  height,
  ratio,
  margin: {
    huge: 20,
    regular: 10,
    large: 15,
    small: 5,
    tiny: 2,
  },
  icon: {
    small: 20,
    normal: 25,
    regular: 30,
    large: 35,
    huge: 40,
  },
  borderRadius: {
    large: 15,
    regular: 10,
    medium: 7.5,
    small: 5,
    tiny: 2,
  },
};

export default Metrics;
