import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { sortBy } from '../utils/sorting';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import VoteCounter from './VoteCounter';
import { Edit, DeleteForever } from 'material-ui-icons';
import moment from 'moment';
import { PostsReceive, deletePostsArea, AllPostsVotes } from '../actions/post';
import {fetchCommentsArea,CommentVoting,CommentDelete} from '../actions/comment';
import CommentShow from './CommentShow';
import CommentFormDisplay from './CommentFormDisplay';


class PostData extends Component {
        static propTypes = {
              post: PropTypes.object,comments: PropTypes.array,
              PostsReceive: PropTypes.func.isRequired,fetchCommentsArea: PropTypes.func.isRequired,
              deletePostsArea: PropTypes.func.isRequired,
              AllPostsVotes: PropTypes.func.isRequired,CommentVoting: PropTypes.func.isRequired,
              CommentDelete: PropTypes.func.isRequired
            };

  state = 

  {
      CommentEditing: null,
      deleted: false
  };

  componentDidMount()
   {
    const { 
      postId } = this.props.match.params;

          this.props.PostsReceive(postId);
          this.props.fetchCommentsArea(postId);
  }

 
  handleEditButton = comment => 
  this.setState({ CommentEditing: comment });

  FormatFinish = () => 
  this.setState({ CommentEditing: null });

   handleDelete = post => {this.props.deletePostsArea(post);
this.setState({ deleted: true });
  };

  handlePostVote = (post, option) => 
  this.props.AllPostsVotes(post.id, option);

  handleCommentVote = (comment, option) =>
    this.props.CommentVoting(comment.id, option);

  handleCommentDelete = comment => 
  this.props.CommentDelete(comment);


  render() {

    const {
     post,
      comments } = this.props;
    const { CommentEditing, 
      deleted } = this.state;

    if (deleted)
     {
      return <Redirect to={'/'} />;
    }

    return (

      <div>{post && (
          <div><Card style={{ padding: 5, margin: 5 }}>
              <div style={{display: 'flex',
                  alignItems: 'center',paddingLeft: 16, paddingRight: 16
                }}
              >
        <VoteCounter item={post} handleVote={this.handlePostVote} />
                <CardHeader title={post.title} subheader={`Sent ${moment(post.timestamp).format(
                    'Do MMMM YYYY, h:mm a'
                  )} by ${post.author}`}
                />

                <div style={{
                    flex: '1 1 auto' }}
                />
                <div>
                  <Link to={`/post/edit/${post.id}`}style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <Edit />


                    </Link>

                    <DeleteForever
                     onClick={() => this.handleDelete(post)} />
                  </div>
                </div>
                <CardContent><Typography paragraph>{post.body}</Typography></CardContent>
              </Card>
            </div>
        )}
        {post && comments && (
            <div><Card style={{ padding: 8, margin: 8 }}>
                <CommentFormDisplay post={post} />
              </Card>
              <Card style={{ padding: 8, margin: 8 }}>
                <CardHeader title={`${post.commentCount} comments`} />
                <CommentShow

                      items={comments}
                      FormatFinish={this.FormatFinish}
                      handleVote={this.handleCommentVote}
                      handleDelete={this.handleCommentDelete}
                      handleEditButton={this.handleEditButton}
                      CommentEditing={CommentEditing}
                      
                />
                </Card>
              </div>
            )}
        </div>
      );
    }
  }

function mapStateToProps({ posts, comments }, { match }) {
    return {post: posts.filter(post => post.id === match.params.postId)[0],
      comments: sortBy(comments[match.params.postId])
    };
  }

export default connect(mapStateToProps, {PostsReceive,fetchCommentsArea,
    deletePostsArea,AllPostsVotes,CommentVoting,CommentDelete})(PostData);
