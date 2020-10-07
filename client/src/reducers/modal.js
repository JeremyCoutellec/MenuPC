import { SET_MODAL, REMOVE_MODAL } from '../actions/types';

const initialState = {
  open: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MODAL:
      return {
        ...payload,
        open: true,
      };
    case REMOVE_MODAL:
      return {
        open: false,
      };
    default:
      return state;
  }
}
