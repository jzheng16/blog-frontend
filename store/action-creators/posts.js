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
    console.log('what is res?', res);
    const json = await res.json();
    console.log('JSON?', json);
    dispatch(setPosts(json.data));
    dispatch(setLastPage(json.last_page));
  } catch (err) {


    console.log(`Error getting ${page}`, err.message);
  }


};
