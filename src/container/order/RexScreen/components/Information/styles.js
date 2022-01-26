import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: Metrics.margin.large,
  },
  card: {
    ...Styles.card,
    flex: 0,
    paddingVertical: Metrics.margin.large,
    marginHorizontal: 0,
  },
  title: {
    marginTop: Metrics.margin.regular,
  },
  card_item: {
    ...Styles.card,
    marginHorizontal: 0,
  },
  header_item: {
    paddingBottom: Metrics.margin.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    borderColor: Colors.appLightGrayColor,
  },
  input_3x: {
    width: (Metrics.width - Metrics.margin.large * 6) / 3,
    marginHorizontal: 0,
  },
  input_1x: {
    width: '100%',
    marginHorizontal: 0,
  },
  input_2x: {
    width: '100%',
    marginHorizontal: 0,
  },
});

export default styles;
