import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    paddingVertical: Metrics.margin.large,
    paddingLeft: Metrics.margin.regular,
  },
  thumb: {
    width: Metrics.width / 3.5 - Metrics.margin.large,
    height: Metrics.width / 3.5 - Metrics.margin.large,
    marginLeft: Metrics.margin.large,
    borderRadius: Metrics.borderRadius.medium,
    overflow: 'hidden',
  },
  image: {
    width: Metrics.width,
    height: Metrics.width,
  },
});

export default styles;
