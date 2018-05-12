import React, { Component } from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { v4 } from 'uuid';
import { basicCategory } from '../utils/configure';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPostsArea, updatePostsArea } from '../actions/post';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Select from 'material-ui/Select';
import NotFoundError from './NotFoundError';


class PostContentForm extends Component {
      static propTypes = {
        post: PropTypes.object,categories: PropTypes.array,
        addPostsArea: PropTypes.func.isRequired,
        updatePostsArea: PropTypes.func.isRequired,
      };


  state = {
      author: this.props.post ? 
      this.props.post.author : '',
      title: this.props.post ?
       this.props.post.title : '',
      body: this.props.post ?
       this.props.post.body : '',
      category: this.props.post ? 
      this.props.post.category : 'react',
      finished: false,

  };
 componentDidMount()
   {
    const { 
      postId } = this.props.match.params;

      console.log(this.props.post)

  }

  redirect = (
    ) => 
  this.setState({
   finished: true 
 });

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  submitHandle = event => 
  {
    event.preventDefault();

    const { post, 
      addPostsArea, 
      updatePostsArea } = this.props;

    if (post) 
    {
      const updatedPost = {

          ...post,
          timestamp: Date.now(),
          body: this.state.body,
          title: this.state.title,
          author: this.state.author,
          category: this.state.category
      };

      updatePostsArea(updatedPost);
    }

     else {
      const newPost =
       {
          id: v4(),
          timestamp: Date.now(),
          title: this.state.title,
          author: this.state.author,
          body: this.state.body,
          category: this.state.category
      };

      addPostsArea(newPost);
    }this.redirect();
  };

  render() 
  {
    const { categories } = this.props;
    const { finished } = this.state;
    const postId = this.props.match.params; 
    let flag = true;
    console.log('finished', this.props.match.params)
    if(!this.props.post ){
      flag = false;
      console.log("inininininin")
      console.log(this.props.post)
      console.log("length",this.props.match.params.postId)
      if(this.props.match.params.postId== null){
        flag=true;
      }
    }
    // console.log(PostsReceive(postId));
    if (finished)
     {
      return <Redirect to={'/'} />;
    }

    if(flag){
    return (

              <Card style=
              {{ padding: 5,
               margin: 5 }}>
                <div
                  style={{
                    paddingLeft: 5
                  }}
                >
          <form style={{
              display: 'flex',
                flexDirection: 'column',
                maxWidth: 650
            }}
            onSubmit={event =>
             this.submitHandle(event)}
            autoComplete="off"
          >
            <TextField required id="title" label="Title" fullWidth value={this.state.title}
              onChange={this.handleChange('title')}
              style={{
                paddingTop: 15,
                paddingBottom: 25
              }}
            />
            <TextField required id="body"  label="Body"   fullWidth multilinerows="4"
              value={this.state.body}onChange={this.handleChange('body')}
              style={{
                paddingTop: 15,
                paddingBottom: 25
              }}
            />
            <TextField required  id="author" label="Author"
              fullWidth value={this.state.author}
              onChange={this.handleChange('author')}
              style={{
                paddingTop: 15,
                paddingBottom: 25
              }}
            />
            <FormControl>
              <InputLabel htmlFor="category">
              Category
              </InputLabel>
              <Select value={this.state.category}
                onChange={this.handleChange('category')} input={<Input id="category" />}
                style={{
                  marginBottom: 25
                }}
              >
                {categories && categories.length > 0 && categories.map((category, i) => (
                    <MenuItem key={i} value={category.path}> {category.name}
                    </MenuItem>
                  ))}
                    </Select>
                  </FormControl>
            <Button raised color="primary"
              style={{
                marginBottom: 25
              }}
             
              type="submit"
            >
              Save
            </Button>

            <Button

              style={{
                marginBottom: 20
              }}

              onClick={this.redirect}
            >
                    Cancel
                  </Button>
                </form>
              </div>
            </Card>
          );}
          else{
            return (
              <NotFoundError/>
              )
          }
        }
      }

function mapStateToProps({ posts, categories }, { match }) {
  
  return {

        post: posts.filter(post => post.id === match.params.postId)[0],
        categories: categories.filter(
        category => category.path !== basicCategory.path
    )
  };
}

export default connect(mapStateToProps, { addPostsArea, updatePostsArea })(PostContentForm);
