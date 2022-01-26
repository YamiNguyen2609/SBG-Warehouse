import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Metrics.margin.large,
    paddingHorizontal: Metrics.margin.large,
    borderWidth: 1.5,
    borderRadius: Metrics.borderRadius.medium,
    borderColor: Colors.appLightGrayColor,
    paddingVertical: Metrics.margin.large,
  },
});

export default styles;
