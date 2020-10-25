// Imports: Dependencies
import {combineReducers} from 'redux';
import UserReducer from './UserReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
    userReducer: UserReducer
});

export default rootReducer;