import { GET_CLIENTS, CLEAR_CLIENTS, CLIENT_ERROR } from '../actions/types';

const initialState = {
  clients: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CLIENTS:
      return {
        clients: payload,
        loading: false,
      };
    case CLEAR_CLIENTS:
      return {
        clients: null,
        loading: false,
      };
    case CLIENT_ERROR:
      return {
        clients: null,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
