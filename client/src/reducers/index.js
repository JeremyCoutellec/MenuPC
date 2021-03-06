import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import menu from './menu';
import company from './company';
import dish from './dish';
import category from './category';
import type from './type';
import modal from './modal';
import client from './client';

export default combineReducers({
  alert,
  auth,
  menu,
  company,
  dish,
  category,
  type,
  modal,
  client,
});
