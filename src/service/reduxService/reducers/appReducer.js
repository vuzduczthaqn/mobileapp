const initData = {
  darkMode: false,
  isLoading: false,
};
const appReducer = (state = initData, {type, payload}) => {
  switch (type) {
    case 'change_app_mode':
      return {
        ...state,
        isLoading: true,
      };
    case 'change_app_success':
      return {
        ...state,
        isLoading:false,
        darkMode:payload.darkMode,
      };
      default:
        return state;
  }
};

export
default appReducer;