import {StyleSheet} from 'react-native';
import {Styles, Colors, Metrics} from '../../../../../assets/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Styles.center,
  },
  container_item: {
    paddingHorizontal: Metrics.margin.regular,
    // paddingVertical: Metrics.margin.large,
    flexDirection: 'row',
    alignItems: 'center',
    width: Metrics.width,
  },
  header: {
    paddingTop: Metrics.margin.small + 2 + 0.8,
    paddingBottom: Metrics.margin.small + 2,
    paddingLeft: Metrics.margin.small,
    marginTop: -0.8,
    backgroundColor: Colors.appLightGrayColor,
    width: Metrics.width,
  },
  icon: {
    width: 45,
    height: 45,
    borderRadius: Metrics.borderRadius.medium,
    overflow: 'hidden',
    marginRight: Metrics.margin.regular,
  },
  item: {},
  container_input: {
    backgroundColor: Colors.appWhite,
    paddingHorizontal: Metrics.margin.huge * 2,
    paddingTop: Metrics.icon.huge * 1.5,
    paddingBottom: Metrics.icon.regular,
    borderTopLeftRadius: Metrics.borderRadius.large * 1.5,
    borderTopRightRadius: Metrics.borderRadius.large * 1.5,
    width: Metrics.width,
    alignItems: 'center',
  },
  container_text: {
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
  barcode_icon: {
    ...Styles.center,
    borderRadius: Metrics.icon.huge * 1.5,
    backgroundColor: Colors.appPrimaryColor,
    height: Metrics.icon.huge * 1.5,
    width: Metrics.icon.huge * 1.5,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  container_modal: {
    backgroundColor: Colors.appWhite,
    paddingHorizontal: Metrics.margin.huge * 2,
    paddingTop: Metrics.icon.huge * 1.5,
    paddingBottom: Metrics.icon.regular,
    borderTopLeftRadius: Metrics.borderRadius.large * 1.5,
    borderTopRightRadius: Metrics.borderRadius.large * 1.5,
    width: Metrics.width,
    alignItems: 'center',
  },
  input_modal: {
    width: '100%',
    marginBottom: Metrics.margin.huge,
    borderWidth: 0,
  },
  button: {
    elevation: 20,
    padding: Metrics.margin.regular,
    backgroundColor: Colors.appWhite,
  },
  container_button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.margin.regular,
    backgroundColor: '#f2f0f0',
  },
  button_action: {
    paddingHorizontal: Metrics.margin.regular,
    marginTop: Metrics.margin.regular,
    paddingVertical: Metrics.margin.regular,
    ...Styles.center,
    borderRadius: Metrics.borderRadius.medium,
    flexDirection: 'row',
  },
});

export default styles;
