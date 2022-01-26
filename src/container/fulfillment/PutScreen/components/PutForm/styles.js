import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    // elevation: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.margin.regular,
    borderRadius: Metrics.borderRadius.small,
    backgroundColor: Colors.appWhite,
  },
  container_input: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderColor: Colors.appLightGrayColor,
    marginRight: 0,
  },
  item_header: {
    padding: Metrics.margin.regular,
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.overlay1,
    width: '100%',
  },
  item_body: {
    paddingBottom: Metrics.margin.regular,
    width: Metrics.width - Metrics.margin.large * 2,
  },
  item_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Metrics.margin.regular,
  },
});

export default styles;
