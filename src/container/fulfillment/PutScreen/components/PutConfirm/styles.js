import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.appColor_logi,
    paddingBottom: Metrics.margin.huge,
    ...Styles.center,
  },
  text: {
    backgroundColor: Colors.appWhite,
    padding: Metrics.margin.regular,
    borderRadius: Metrics.borderRadius.medium,
    width: Metrics.width - Metrics.margin.regular * 2,
  },
  input: {
    width: Metrics.width - Metrics.margin.huge * 4,
    marginBottom: Metrics.margin.huge,
    borderWidth: 0,
    marginHorizontal: Metrics.margin.huge * 2,
  },
  input_value: {
    width: '100%',
    marginHorizontal: 0,
    borderColor: Colors.appLightGrayColor,
  },
  button_date: {
    ...Styles.input,
    marginHorizontal: 0,
    paddingHorizontal: Metrics.margin.regular,
  },
  container_button: {
    padding: Metrics.margin.regular,
    elevation: 20,
    backgroundColor: Colors.appWhite,
  },
  container_items: {
    flex: 0.95,
    backgroundColor: Colors.appWhite,
    borderTopRightRadius: Metrics.borderRadius.large,
    borderTopLeftRadius: Metrics.borderRadius.large,
  },
  container_item: {
    padding: Metrics.margin.huge,
  },
  container_scrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.margin.regular,
    width: Metrics.width - Metrics.margin.huge * 4,
    marginHorizontal: Metrics.margin.huge * 2,
    marginVertical: Metrics.margin.regular,
  },
});

export default styles;
