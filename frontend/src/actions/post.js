import { get } from '../utils/helpers';
import { FETCH_POSTSAREA, DELETE_POSTSAREA, UPDATE_POSTSAREA, ADD_POSTSAREA } from './action';
import * as Api from '../utils/Api';

  export const fetchPostsArea = () => dispatch =>
      Api.DisplayAllPosts()
      .then(payload => 
      dispatch(get(FETCH_POSTSAREA, payload))
      );

export const deletePostsArea = post => dispatch =>
    Api.PostDeletion(post.id)
    .then(res => {

      if (res.status === 200) 
      {
        dispatch({
          type: DELETE_POSTSAREA,
          value: post
              });
          }
      });

export const AllPostsVotes = (id, option) => dispatch =>
    Api.AllPostsVotes(id, option)
    .then(payload =>
      dispatch(get(UPDATE_POSTSAREA, payload))
    );

export const PostsReceive = id => dispatch =>
    Api.PostsReceive(id)
    .then(payload => 
    dispatch(get(UPDATE_POSTSAREA, payload)));

export const addPostsArea = post => dispatch =>
    Api.CreateNewPost(post)
    .then(payload => {
      dispatch({
            type: ADD_POSTSAREA,
            payload
          });
        });

export const updatePostsArea = post => dispatch =>
  Api.PostEditing(post)
    .then(payload => 
    dispatch(get(UPDATE_POSTSAREA, payload))
    );
