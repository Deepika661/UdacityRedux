import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { CommentAddition, CommentUpdation } from '../actions/comment';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

class CommentFormDisplay extends Component {
    static propTypes = {post: PropTypes.object, CommentAddition: PropTypes.func,
        comment: PropTypes.object,CommentUpdation: PropTypes.func,
        FormatFinish: PropTypes.func
    };

  state = {
    author: 
    this.props.comment ? this.props.comment.author : '',
    body: 
    this.props.comment ? this.props.comment.body : ''
  };

  

  submitHandle = event => {
    event.preventDefault();




    const {comment,FormatFinish,post,CommentUpdation,CommentAddition} = this.props;

    if (comment) {
      const updatedAllComment = {

          ...comment,
          timestamp: Date.now(),
          author: this.state.author,
          body: this.state.body
        };
        CommentUpdation(updatedAllComment);

      FormatFinish();
    }
         else {

          const addsComment = {

                  id: v4(),
                  parentId: post.id,
                  timestamp: Date.now(),
                  author: this.state.author,
                  body: this.state.body
          };

        CommentAddition(addsComment);
        }

        this.setState(
          { author: '', 
          body: '' }
          );

      };
      handleAfterChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { comment, FormatFinish } = this.props;

    return (
      <div
        style={{paddingLeft:20}}>
        
          <form
              style={{
                flexDirection: 'column',
                display: 'flex'
                
              }}
              onSubmit=
              {event => 
              this.submitHandle(event)}
              autoComplete="off"
          >
          <TextField required id="body" label="Comment" fullWidthmultilinerows="4"
            value={this.state.body} onChange={this.handleAfterChange('body')}
            style={{maxWidth: 450}}
          />
          <TextField required id="author" label="author" fullWidth
            value={this.state.author} onChange={this.handleAfterChange('author')}
            style={{
              maxWidth: 450,
              paddingTop: 15,
              paddingBottom: 25
            }}
          />

          <Button raised color="contrast" style={{  maxWidth: 400,marginBottom: 20 }}type="submit" >
            Save It
          </Button>

          {comment && (
            <Button style={{maxWidth: 400,marginBottom: 20}} onClick={FormatFinish}>
              Cancel From Here
            </Button>
              )}
            </form>
          </div>
        );
      }
    }

export default connect(null, { CommentAddition, CommentUpdation })(CommentFormDisplay);
