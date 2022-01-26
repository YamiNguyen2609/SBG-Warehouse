import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../assets/styles';

const styles = StyleSheet.create({
  container: {},
  container_title: {
    borderWidth: 1.5,
    borderRadius: Metrics.borderRadius.regular,
    borderColor: Colors.appLightGrayColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    flexDirection: 'row',
    paddingHorizontal: Metrics.margin.regular,
    backgroundColor: Colors.appWhite,
  },
  container_title_list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.margin.large,
    alignItems: 'center',
    paddingVertical: Metrics.margin.large,
    backgroundColor: Colors.appWhite,
    borderTopLeftRadius: Metrics.borderRadius.large,
    borderTopRightRadius: Metrics.borderRadius.large,
  },
  item: {
    paddingVertical: Metrics.margin.large,
    paddingLeft: Metrics.margin.regular,
    justifyContent: 'center',
  },
});

export default styles;
