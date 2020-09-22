import { CLEAR_MENU, GET_MENU, MENU_ERROR } from '../actions/types';

const initialState = {
  menu: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MENU:
      return {
        ...state,
        menu: payload,
        loading: false,
      };
    case MENU_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_MENU:
      return {
        ...state,
        menu: null,
        loading: false,
      };
    default:
      return state;
  }
}
