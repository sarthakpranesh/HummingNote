import {combineReducers} from 'redux';

const INITIAL_STATE = {
  authenticated: false,
  email: "",
  uid: ""
};

const userReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
      case "ADD_AUTH":
          return {authenticated: true, email: action.payload.email, uid: action.payload.uid};
      case "REMOVE_AUTH":
          return {authenticated: false, email: "", uid: ""}
      default:
        return state
  }
};

export default combineReducers({
  user: userReducer
});

export const authenticate = (user: any) => (
    {
      type: 'ADD_AUTH',
      payload: user,
    }
);

export const logout = () => (
  {
    type: 'REMOVE_AUTH',
    payload: null,
  }
);
