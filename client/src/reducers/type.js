import { SWITCH_TYPE } from '../actions/types';

const initialState = {
  type: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SWITCH_TYPE:
      return {
        type: payload,
      };
    default:
      return state;
  }
}
