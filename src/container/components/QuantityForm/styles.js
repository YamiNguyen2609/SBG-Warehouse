import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.appWhite,
    paddingHorizontal: Metrics.margin.huge * 2,
    paddingTop: Metrics.icon.huge * 1.5,
    paddingBottom: Metrics.icon.regular,
    borderTopLeftRadius: Metrics.borderRadius.large * 1.5,
    borderTopRightRadius: Metrics.borderRadius.large * 1.5,
    width: Metrics.width,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginBottom: Metrics.margin.huge,
    borderWidth: 0,
  },
});

export default styles;
