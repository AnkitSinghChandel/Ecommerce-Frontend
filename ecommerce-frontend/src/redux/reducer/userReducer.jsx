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

    // ASC REDUX PROPS START //
    case "TIMELINE_PROPS":
      return {
        ...state,
        timeline_props: action.data,
      };
    // ASC REDUX PROPS END //

    default:
      return { ...state };
  }
};

export default userReducer;
