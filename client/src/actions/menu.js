import axios from 'axios';
import { setAlert } from './alert';
import { CLEAR_MENU, GET_MENU, MENU_ERROR } from './types';

// Get menu by user
export const getMenu = () => async dispatch => {
  dispatch({
    type: CLEAR_MENU,
  });
  try {
    const res = await axios.get('/api/menus');

    dispatch({
      type: GET_MENU,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MENU_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get menu by ID
export const getMenuById = idMenu => async dispatch => {
  try {
    const res = await axios.get(`/api/menus/${idMenu}`);

    dispatch({
      type: GET_MENU,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: MENU_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Update menu
export const updateMenu = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/menus', formData, config);

    dispatch({
      type: GET_MENU,
      payload: res.data,
    });
    dispatch(setAlert('Menu sauvegardé', 'success'));
    if (history) history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: MENU_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
