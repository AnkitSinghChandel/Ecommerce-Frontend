const initialState = {
  loginRes: {},
  signupRes: {},
  fetchUserRes: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loginRes: action.data,
      };

    case "SIGNUP":
      return {
        ...state,
        signupRes: action.data,
      };

    case "FETCH_USER_BY_ID":
      return {
        ...state,
        fetchUserRes: action.data,
      };

    default:
      return { ...state };
  }
};

export default userReducer;
