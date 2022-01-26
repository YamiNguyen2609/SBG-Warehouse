import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    marginBottom: Metrics.margin.small,
  },
  logo: {
    width: Metrics.icon.huge * 4,
    height: Metrics.icon.huge * 4,
    marginVertical: -Metrics.icon.huge,
  },
});

export default styles;
