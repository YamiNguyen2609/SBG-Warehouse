import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    width: Metrics.width - Metrics.margin.huge * 4,
    backgroundColor: Colors.appWhite,
    marginHorizontal: Metrics.margin.huge * 2,
    borderColor: Colors.appLightGrayColor,
    borderWidth: 1.5,
    borderRadius: Metrics.borderRadius.medium,
    marginBottom: Metrics.margin.huge,
    marginTop: Metrics.margin.regular,
    overflow: 'hidden',
  },
  item: {
    padding: Metrics.margin.huge,
  },
  button: {
    paddingHorizontal: Metrics.margin.regular,
    paddingVertical: Metrics.margin.large,
    borderBottomColor: Colors.appLightGrayColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
