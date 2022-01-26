import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics, Fonts} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Metrics.margin.large,
    marginTop: Metrics.margin.large,
  },
  container_input: {
    paddingRight: Metrics.margin.regular,
    borderWidth: 1.5,
    paddingLeft: Metrics.margin.regular,
    marginLeft: Metrics.margin.small,
    marginRight: Metrics.margin.tiny,
    marginBottom: 0,
    marginTop: Metrics.margin.small,
  },
  input: {
    color: Colors.appTextBlack,
    fontSize: Fonts['size']['android']['input'],
  },
  container_button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.margin.large,
    paddingBottom: Metrics.margin.large,
  },
});

export default styles;
