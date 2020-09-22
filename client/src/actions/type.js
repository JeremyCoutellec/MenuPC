import { SWITCH_TYPE } from './types';

// Switch Type to show
export const switchType = type => dispatch => {
  dispatch({
    type: SWITCH_TYPE,
    payload: type,
  });
};
