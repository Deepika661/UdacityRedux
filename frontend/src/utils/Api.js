const url =  process.env.ORIGIN || `http://localhost:${process.env.PORT || 3001}`;

const headers = {
  Authorization: 'auth'
};


    export const ShowCategoriesSection = () =>
      fetch(`${url}/categories`, { headers }).then(res => res.json());

    export const ShowCategoriesSectionPosts = category =>
      fetch(`${url}/${category}/posts`, { headers }).then(res => res.json());

    export const DisplayAllPosts = () =>
      fetch(`${url}/posts`, { headers }).then(res => res.json());

    export const PostsReceive = id =>
      fetch(`${url}/posts/${id}`, { headers }).then(res => res.json());

    export const CommentsFetch = id =>
      fetch(`${url}/comments/${id}`, { headers }).then(res => res.json());

    export const ReceiveCommentPost = id =>
      fetch(`${url}/posts/${id}/comments`, { headers }).then(res => res.json());



export const CreateNewPost = post =>
  fetch(`${url}/posts`, 
  {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json());

export const AllPostsVotes = (id, option) =>
  fetch(`${url}/posts/${id}`,
   {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json());

export const CommentAddition = comment =>
  fetch(`${url}/comments`,

   {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json());

export const CommentVoting = (id, option) =>
  fetch(`${url}/comments/${id}`, 
  {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json());


export const PostEditing = post =>
  fetch(`${url}/posts/${post.id}`, 
  {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json());

export const CommentEditing = comment =>
  fetch(`${url}/comments/${comment.id}`,
   {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json());


export const PostDeletion = id =>
  fetch(`${url}/posts/${id}`,
   {
    method: 'DELETE',
    headers: {
      ...headers
    }
  });

export const CommentDelete = id =>
  fetch(`${url}/comments/${id}`, 
  {
    method: 'DELETE',
    headers: {
      ...headers
    }
  }).then(res => res.json());
