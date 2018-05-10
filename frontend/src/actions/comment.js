import { get } from '../utils/helpers';
import {FETCH_COMMENTSAREA,UPDATE_COMMENTSAREA,DELETE_COMMENTSAREA,ADD_COMMENTSECTION } from './action';
import * as Api from '../utils/Api';


export const fetchCommentsArea = postId => dispatch =>
      Api.ReceiveCommentPost(postId).then(payload =>
        dispatch(get(FETCH_COMMENTSAREA, { postId, payload }))
      );

export const CommentDelete = comment => dispatch =>
      Api.CommentDelete(comment.id).then(res => {
        dispatch({
          type: DELETE_COMMENTSAREA,
          payload: comment
        });
      });

export const CommentVoting = (id, option) => dispatch =>
      Api.CommentVoting(id, option).then(payload =>
        dispatch(get(UPDATE_COMMENTSAREA, payload))
      );


export const CommentAddition = comment => dispatch =>
      Api.CommentAddition(comment).then(res => {
        dispatch({
          type: ADD_COMMENTSECTION,
          payload: res
        });
      });

export const CommentUpdation = comment => dispatch =>
    Api.CommentEditing(comment).then(payload =>
      dispatch(get(UPDATE_COMMENTSAREA, payload))
    );
