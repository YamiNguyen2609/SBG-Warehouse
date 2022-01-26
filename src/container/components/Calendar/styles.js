import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics, Fonts} from '../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appWhite,
    borderRadius: Metrics.borderRadius.regular,
    overflow: 'hidden',
  },
  container_input: {
    padding: Metrics.margin.regular,
  },
  input: {
    borderWidth: 1.5,
    borderColor: Colors.appLightGrayColor,
    borderRadius: Metrics.borderRadius.regular,
    ...Styles.input,
    margin: 0,
    color: Colors.appTextBlack,
    fontSize: Fonts.size.android.input,
    paddingVertical: Metrics.margin.regular,
    height: undefined,
    paddingHorizontal: Metrics.margin.regular,
  },
  container_button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1.5,
    borderTopColor: Colors.appLightGrayColor,
  },
  button: {
    flex: 1,
    paddingVertical: Metrics.margin.huge,
    ...Styles.center,
  },
});

export default styles;
