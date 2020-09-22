import axios from 'axios';
import { setAlert } from './alert';
import { GET_COMPANY, COMPANY_ERROR } from './types';

// Get company by user
export const getCompany = () => async dispatch => {
  try {
    const res = await axios.get('/api/companies');

    dispatch({
      type: GET_COMPANY,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: COMPANY_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get company by id
export const getCompanyByUserId = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/companies/user/${userId}`);

    dispatch({
      type: GET_COMPANY,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: COMPANY_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Update company
export const updateCompany = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/companies', formData, config);

    dispatch({
      type: GET_COMPANY,
      payload: res.data,
    });
    dispatch(setAlert('Entreprise Modifiée', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: COMPANY_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
