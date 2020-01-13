import { SET_POSTS, SET_LAST_PAGE } from '../actions';

const initialState = {
  posts: [],
  lastPage: 100
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: [...state.posts, ...action.payload] };
    case SET_LAST_PAGE:
      return { ...state, lastPage: action.payload }
    default:
      return state;
  }
};

export default postReducer;