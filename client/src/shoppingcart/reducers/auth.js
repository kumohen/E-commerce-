const initialState = {
  isLoginin: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, login: action.payload, isLoginin: true };
    case "USER_AUTH":
      return { ...state, login: action.payload };
    case "USER_LOGOUT":
      return { ...state, isLoginin: false };
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "USER_REGISTER":
      return {
        ...state,
        register: action.payload,
        isRegistation: true,
      };
    default:
      return state;
  }
}
