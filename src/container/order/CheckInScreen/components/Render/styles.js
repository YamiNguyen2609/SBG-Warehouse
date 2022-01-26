import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics, Fonts} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    paddingVertical: Metrics.margin.huge,
  },
  button_package: {
    position: 'absolute',
    bottom: 46 + Metrics.margin.regular * 2 + 15,
    right: 15,
  },
  container_search: {
    // paddingVertical: Metrics.margin.small,
    elevation: 10,
    backgroundColor: Colors.appWhite,
  },
});

export default styles;
