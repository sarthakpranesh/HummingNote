import createDataContext from './createDataContext';
import {storeData} from '../components/AsyncStorage';

const UserContext = (UserSet: any, action: any) => {
  switch (action.type) {
    case 'getUser':
      getUser('user');
      return {
        box: action.payload.box,
        uid: UserSet.uid,
      };
    case 'setUser': {
      storeData('user', action.payload.user);
      return {
        user: action.payload.user,
      };
    }
    default:
      return UserSet;
  }
};

const getUser = (dispatch: any) => {
  return (box: any) => {
    dispatch({type: 'getUser', payload: {box}});
  };
};

const setUser = (dispatch: any) => {
  return (user: any) => {
    dispatch({type: 'setUser', payload: {user}});
  };
};

export const {Context, Provider} = createDataContext(
  UserContext,
  {
    setUser,
    getUser,
  },
  {
    email: '',
    uid: '',
  },
);
