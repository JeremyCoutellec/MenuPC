import axios from 'axios';
import { setAlert } from './alert';
import {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  CLEAR_CATEGORIES,
  GET_CATEGORIES,
  CATEGORY_ERROR,
} from './types';

// Get categories by user
export const getCategories = () => async dispatch => {
  try {
    dispatch({
      type: CLEAR_CATEGORIES,
    });
    const res = await axios.get('/api/categories');

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: CATEGORY_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get categories by user
export const getCategoriesByType = idType => async dispatch => {
  try {
    dispatch({
      type: CLEAR_CATEGORIES,
    });
    const res = await axios.get(`/api/categories/type/${idType}`);

    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: CATEGORY_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add category
export const addCategory = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/categories', formData, config);

    dispatch({
      type: ADD_CATEGORY,
      payload: res.data,
    });
    dispatch(setAlert('Catégorie Ajoutée', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CATEGORY_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Remove category
export const removeCategory = idCategory => async dispatch => {
  try {
    await axios.delete(`/api/categories/${idCategory}`);

    dispatch({
      type: REMOVE_CATEGORY,
      payload: idCategory,
    });
    dispatch(setAlert('Catégorie Supprimée', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CATEGORY_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
