import {combineReducers} from 'redux';

const INITIAL_STATE = {
  notes: [],
};

const noteReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "UPDATE":
      return {notes: action.payload};
    default:
      return state
  }
};

export default combineReducers({
  note: noteReducer
});

export const update = (notes: any) => (
  {
    type: 'UPDATE',
    payload: notes,
  }
);
