import { SET_MODAL, REMOVE_MODAL } from './types';

export const setModal = (
  title,
  description,
  redirection,
  textApprouve = 'OUI',
  textCancel = 'NON'
) => dispatch => {
  dispatch({
    type: SET_MODAL,
    payload: {
      title,
      description,
      redirection,
      textApprouve,
      textCancel,
    },
  });
};

export const removeModal = () => dispatch => {
  dispatch({
    type: REMOVE_MODAL,
  });
};
