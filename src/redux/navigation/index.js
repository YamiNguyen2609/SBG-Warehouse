const MOVE_SCREEN = 'MOVE_SCREEN';
const MOVE_SCREEN_WITH_RESET_STACK = 'MOVE_SCREEN_WITH_RESET_STACK';
const MOVE_SCREEN_WITH_REMOVE_STACK = 'MOVE_SCREEN_WITH_REMOVE_STACK';

const replaceScreen = (screen, data) => ({
  type: MOVE_SCREEN,
  screen,
  data,
});

const replaceScreenWithResetStack = (screen, data) => ({
  type: MOVE_SCREEN_WITH_RESET_STACK,
  screen,
  data,
});

const replaceScreenWithRemoveStack = (screen, data, index) => ({
  type: MOVE_SCREEN_WITH_REMOVE_STACK,
  screen,
  data,
  index,
});

const initialState = {
  screen: '',
  stack: 0,
  resetStack: 0,
  removeStack: 0,
  data: '',
  index: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MOVE_SCREEN:
      return {
        ...state,
        screen: action.screen,
        data: action.data ? action.data : '',
        stack: state.stack + 1,
      };

    case MOVE_SCREEN_WITH_RESET_STACK:
      return {
        ...state,
        screen: action.screen,
        data: action.data ? action.data : '',
        resetStack: state.resetStack + 1,
      };

    case MOVE_SCREEN_WITH_REMOVE_STACK:
      return {
        ...state,
        screen: action.screen,
        data: action.data ? action.data : '',
        removeStack: state.removeStack + 1,
        index: action.index ? action.index : 0,
      };

    default:
      return state;
  }
};

export {
  replaceScreen,
  replaceScreenWithResetStack,
  replaceScreenWithRemoveStack,
};
