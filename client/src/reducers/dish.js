import {
  CLEAR_DISH,
  GET_DISHES,
  DELETE_DISH,
  DISH_ERROR,
  ADD_DISH,
} from '../actions/types';

const initialState = {
  dishes: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_DISH:
      return {
        ...state,
        dishes: [...state.dishes, payload],
      };
    case GET_DISHES:
      return {
        ...state,
        dishes: payload,
        loading: false,
      };
    case DELETE_DISH:
      return {
        ...state,
        dishes: state.dish.filter(dish => dish._id !== payload),
        loading: false,
      };
    case CLEAR_DISH:
      return {
        ...state,
        dish: null,
        loading: false,
      };
    case DISH_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
