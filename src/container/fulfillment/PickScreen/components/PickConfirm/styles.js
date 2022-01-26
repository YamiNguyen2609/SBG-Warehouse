import {StyleSheet} from 'react-native';
import {Fonts, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_header: {
    paddingLeft: Metrics.margin.huge,
    paddingVertical: Metrics.margin.large,
  },
  container_item: {
    backgroundColor: Colors.appWhite,
    padding: Metrics.margin.regular,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container_input: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    fontSize: Fonts['size']['android']['input'] + 3,
    paddingHorizontal: 10,
    color: Colors.appTextBlack,
  },
  header: {
    paddingVertical: Metrics.margin.large,
    backgroundColor: Colors.appLightGrayColor,
    paddingLeft: Metrics.margin.regular,
  },
  container_item_lot: {
    paddingHorizontal: Metrics.margin.large,
    paddingVertical: Metrics.margin.regular,
    width: Metrics.width,
    backgroundColor: Colors.appWhite,
    flexDirection: 'row',
  },
});

export default styles;
