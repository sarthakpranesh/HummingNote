// Imports: Dependencies
import {combineReducers} from 'redux';
import UserReducer from './UserReducer';
import NoteReducer from './NoteReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
    userReducer: UserReducer,
    noteReducer: NoteReducer,
});

export default rootReducer;