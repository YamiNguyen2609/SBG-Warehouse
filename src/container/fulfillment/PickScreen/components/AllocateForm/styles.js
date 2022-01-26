import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Metrics.margin.regular,
    borderRadius: Metrics.borderRadius.medium,
    backgroundColor: Colors.appWhite,
    marginVertical: 0,
    padding: 0,
  },
  container_header: {
    paddingVertical: Metrics.margin.large,
    paddingLeft: Metrics.margin.regular,
  },
  container_item: {
    flexDirection: 'row',
    padding: Metrics.margin.regular,
    alignItems: 'center',
  },
});

export default styles;
