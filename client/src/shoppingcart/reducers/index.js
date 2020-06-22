

import { combineReducers } from 'redux'
//import posts from './todos_reducers';
import cart from "./cart"
import auth from "./auth";

export default combineReducers({
  items:cart,
  auth
})