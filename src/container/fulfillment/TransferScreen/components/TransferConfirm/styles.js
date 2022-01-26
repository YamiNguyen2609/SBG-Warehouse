import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appWhite,
    width: Metrics.width,
  },
  input: {
    width: Metrics.width - Metrics.margin.large * 2,
    marginBottom: Metrics.margin.huge,
    borderWidth: 0,
    marginHorizontal: 0,
  },
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
  button: {
    width: '48%',
    padding: Metrics.margin.large,
    borderRadius: Metrics.borderRadius.medium,
    ...Styles.center,
  },
  container_button: {
    padding: Metrics.margin.regular,
    elevation: 20,
    backgroundColor: Colors.appWhite,
  },
});

export default styles;
