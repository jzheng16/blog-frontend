import { SET_POSTS, SET_LAST_PAGE } from '../actions';


export const setPosts = posts => ({
  type: SET_POSTS,
  payload: posts
})
export const setLastPage = page => ({
  type: SET_LAST_PAGE,
  payload: page
})

export const gettingPosts = (page) => async dispatch => {
  try {
    const res = await fetch(`http://10.0.2.2:8000/api/posts?page=${page}&results=5`);
    const json = await res.json();
    dispatch(setPosts(json.data));
    dispatch(setLastPage(json.last_page));
  } catch (err) {

    console.error(err);
  }


};
