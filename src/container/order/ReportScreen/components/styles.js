import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.margin.regular,
    alignItems: 'center',
    marginTop: Metrics.margin.regular,
  },
  card: {
    backgroundColor: Colors.appWhite,
    marginHorizontal: Metrics.margin.large,
    width: Metrics.width - Metrics.margin.large * 2,
    borderWidth: 1.5,
    borderColor: Colors.appGrayColor,
    borderRadius: Metrics.borderRadius.medium,
    paddingVertical: Metrics.margin.regular,
  },
});

export default styles;
