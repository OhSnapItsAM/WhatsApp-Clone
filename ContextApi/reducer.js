export const initialState = {
  user: [],
  info: [],

  chat: [],

  showMessages: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      return {
        ...state,
        user: action.item,
      };
    case "SHOW":
      return {
        ...state,
        showMessages: action.item,
      };
    case "INFO":
      return {
        ...state,
        info: action.item,
      };
    case "CHAT":
      return {
        ...state,
        chat: action.item,
      };
    default:
      return state;
  }
};
