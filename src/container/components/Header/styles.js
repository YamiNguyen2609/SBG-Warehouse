import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    ...Styles.center,
    width: Metrics.width,
    paddingVertical: Metrics.margin.huge,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.margin.regular,
  },
  icon: {
    width: Metrics.icon.large,
    height: Metrics.icon.large,
    ...Styles.center,
  },
});

export default styles;
