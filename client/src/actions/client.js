import axios from 'axios';
import { ADD_CLIENTS, CLEAR_CLIENTS, GET_CLIENTS, CLIENT_ERROR } from './types';

// Get clients by user
export const getClients = () => async dispatch => {
  try {
    dispatch({
      type: CLEAR_CLIENTS,
    });
    const res = await axios.get('/api/clients');

    dispatch({
      type: GET_CLIENTS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: CLIENT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Post Clients by user
export const createClients = (formData, companyId) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(
      '/api/clients',
      { clients: formData, company: companyId },
      config
    );

    dispatch({
      type: ADD_CLIENTS,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: CLIENT_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
