import {
  ADD_CATEGORY,
  CATEGORY_ERROR,
  CLEAR_CATEGORIES,
  GET_CATEGORIES,
  REMOVE_CATEGORY,
} from '../actions/types';

const initialState = {
  categories: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload],
        loading: false,
      };
    case REMOVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category._id !== payload
        ),
        loading: false,
      };
    case CLEAR_CATEGORIES:
      return {
        ...state,
        categories: [],
        loading: false,
      };
    case CATEGORY_ERROR:
      return {
        ...state,
        categories: [],
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
