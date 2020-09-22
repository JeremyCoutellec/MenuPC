import axios from 'axios';
import { setAlert } from './alert';
import {
  CLEAR_DISH,
  GET_DISHES,
  ADD_DISH,
  DELETE_DISH,
  DISH_ERROR,
} from './types';

// Get all dishes
export const getAllDishes = () => async dispatch => {
  dispatch({
    type: CLEAR_DISH,
  });
  try {
    const res = await axios.get('/api/dishes');

    dispatch({
      type: GET_DISHES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DISH_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get all dishes by user Id
export const getAllDishesByUserId = userId => async dispatch => {
  dispatch({
    type: CLEAR_DISH,
  });
  try {
    const res = await axios.get(`/api/dishes/user/${userId}`);

    dispatch({
      type: GET_DISHES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DISH_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add dish
export const addDish = formData => async dispatch => {
  dispatch({
    type: CLEAR_DISH,
  });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/dishes', formData, config);

    dispatch({
      type: ADD_DISH,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: DISH_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// remove dish
export const removeDish = idDish => async dispatch => {
  dispatch({
    type: CLEAR_DISH,
  });
  try {
    await axios.delete(`/api/dishes/${idDish}`);

    dispatch({
      type: DELETE_DISH,
      payload: idDish,
    });

    dispatch(setAlert('Plat Retiré', 'success'));
  } catch (err) {
    dispatch({
      type: DISH_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
