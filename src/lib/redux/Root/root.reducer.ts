import { combineReducers } from '@reduxjs/toolkit';
import request from '../Request/request.slice';

const rootReducer = combineReducers({
  request,
});

export default rootReducer;
