import r from 'reactotron-react-native';

const FLAG_INDICATOR = 'FLAG_INDICATOR';

const FLAG_TEXT_MESSAGE = 'FLAG_TEXT_MESSAGE';

const ROUTE_FOCUS = 'ROUTE_FOCUS';

const SHOW_FLAG_MESSAGE = 'SHOW_FLAG_MESSAGE';

const HIDE_FLAG_MESSAGE = 'HIDE_FLAG_MESSAGE';

const GET_CONNECT = 'GET_CONNECT';

const MESSAGE_WARNING = 'MESSAGE_WARNING';

const UPDATE_COMPANY = 'UPDATE_COMPANY';

const MESSAGE_ERROR = 'MESSAGE_ERROR';

const BARCODE_DEVICE = 'BARCODE_DEVICE';

const flagIndicator = (status, params) => ({
  type: FLAG_INDICATOR,
  status,
  params,
});

const flagTextMessage = params => ({
  type: FLAG_TEXT_MESSAGE,
  params,
});

const getRouteFocus = route => ({
  type: ROUTE_FOCUS,
  route,
});

const showFlagMessage = params => ({
  type: SHOW_FLAG_MESSAGE,
  params,
});

const hideFlagMessage = () => ({
  type: HIDE_FLAG_MESSAGE,
});

const connectionNetwork = state => ({
  type: GET_CONNECT,
  state,
});

const messageWarning = data => ({
  type: MESSAGE_WARNING,
  data,
});

const updateCompany = company => ({
  type: UPDATE_COMPANY,
  company,
});

const messageError = (errCode, data, isNotify = false) => ({
  type: MESSAGE_ERROR,
  errCode,
  data,
  isNotify,
});

const toggleDevice = state => ({
  type: BARCODE_DEVICE,
  state,
});

const initialState = {
  flagIndicator: false,
  colorIndicator: '',
  routeFocus: 'Home',
  textMessage: {
    message: '',
    time: 2,
    flag: 0,
  },
  flagMessage: {
    title: '',
    flag: false,
    item: [],
    buttons: [],
  },
  connection: true,
  messageWarning: {
    message: '',
    flag: 0,
  },
  company: 'sbs',
  deviceState: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FLAG_INDICATOR: {
      if (action.status) {
        return {
          ...state,
          colorIndicator: action.params.color,
          flagIndicator: action.status,
        };
      } else {
        return {
          ...state,
          flagIndicator: action.status,
        };
      }
    }

    case FLAG_TEXT_MESSAGE:
      return {
        ...state,
        textMessage: {
          ...state.textMessage,
          message: action.params.message,
          flag: state.textMessage.flag + 1,
        },
      };

    case ROUTE_FOCUS:
      return {
        ...state,
        routeFocus: action.route,
      };

    case SHOW_FLAG_MESSAGE:
      return {
        ...state,
        flagMessage: {
          title: action.params.title,
          item: action.params.item,
          flag: true,
          buttons: action.params.buttons,
        },
      };

    case HIDE_FLAG_MESSAGE:
      return {
        ...state,
        messageWarning: {
          message: action.data,
          flag: state.messageWarning.flag,
        },
        flagMessage: {
          item: [],
          flag: false,
          buttons: [],
        },
      };

    case GET_CONNECT:
      return {
        ...state,
        connection: action.state,
      };

    case MESSAGE_WARNING:
      return {
        ...state,
        messageWarning: {
          message: action.data,
          flag: state.messageWarning.flag + 1,
        },
      };

    case UPDATE_COMPANY:
      return {
        ...state,
        company: action.company,
      };

    case MESSAGE_ERROR:
      return {
        ...state,
      };

    case BARCODE_DEVICE:
      return {
        ...state,
        deviceState: action['state'],
      };

    default:
      return {...state};
  }
};

export {
  MESSAGE_ERROR,
  flagIndicator,
  flagTextMessage,
  getRouteFocus,
  hideFlagMessage,
  showFlagMessage,
  connectionNetwork,
  messageWarning,
  updateCompany,
  messageError,
  toggleDevice,
};
