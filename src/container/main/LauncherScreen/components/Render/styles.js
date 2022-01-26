import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Metrics.height / 2 - Metrics.margin.huge * 4,
    ...Styles.center,
  },
  container_process: {
    width: Metrics.width - Metrics.margin.huge * 6,
    height: Metrics.margin.large,
    borderWidth: 0.8,
    borderRadius: Metrics.margin.large,
    borderColor: Colors.appLightGrayColor,
    overflow: 'hidden',
    marginTop: Metrics.margin.regular,
  },
});

export default styles;
