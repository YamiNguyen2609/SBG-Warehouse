import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    backgroundColor: Colors.appWhite,
    borderTopRightRadius: Metrics.borderRadius.large,
    borderTopLeftRadius: Metrics.borderRadius.large,
  },
  item: {
    padding: Metrics.margin.huge,
  },
});

export default styles;
