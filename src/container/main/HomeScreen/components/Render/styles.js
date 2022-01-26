import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: Colors.appWhite,
    elevation: 10,
    width: Metrics.width - Metrics.margin.huge * 2,
    borderRadius: Metrics.borderRadius.medium,
    marginHorizontal: Metrics.margin.huge,
    padding: Metrics.margin.large,
    flexDirection: 'row',
    marginTop: -Metrics.margin.huge * 2.5,
    zIndex: 999,
  },
  container_order: {
    backgroundColor: Colors.appWhite,
    elevation: 10,
    width: Metrics.width - Metrics.margin.huge * 2,
    borderRadius: Metrics.borderRadius.medium,
    marginHorizontal: Metrics.margin.huge,
    padding: Metrics.margin.large,
    flexDirection: 'row',
    marginTop: -Metrics.margin.huge * 2.5,
    zIndex: 999,
    borderBottomWidth: 7,
    borderBottomColor: Colors.appColor,
  },
  icon: {
    width: Metrics.icon.normal,
    height: Metrics.icon.normal,
    marginRight: Metrics.margin.small,
  },
  icon_2x: {
    width: Metrics.icon.huge,
    height: Metrics.icon.huge,
    marginRight: Metrics.margin.small,
  },
});

export default styles;
