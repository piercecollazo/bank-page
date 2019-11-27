import { combineReducers } from 'redux';
import authReducer from './authReducer';
import handleMessageReducer from  './handleMessageReducer';

export default combineReducers({
    authUser: authReducer,
    handleMessage: handleMessageReducer
});