import { COMPANY_ERROR, GET_COMPANY } from '../actions/types';

const initialState = {
  company: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COMPANY:
      return {
        ...state,
        company: payload,
        loading: false,
      };
    case COMPANY_ERROR:
      return {
        ...state,
        company: null,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
