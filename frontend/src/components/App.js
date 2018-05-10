import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ContentArea from './ContentArea';
import PostsData from './PostsData';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import AddIcon from 'material-ui-icons/Add';
import NotFoundError from './NotFoundError';
import PostContentForm from './PostContentForm';


const CreateNewPostButton = () => 
{
  return (
    <div
        style={{position: 'fixed',right: 30,bottom: 30,width: 30,height: 55,fill: '#3f51b5'
        }}
    >
      <Link to={`/post/new`} style={{ textDecoration: 'none' }}>
          <Button fab color="contrast">
              <AddIcon />
            </Button>
          </Link>
        </div>
      );
  };

class App extends Component {
  
  render() {
    return (
          <div>

              <Route exact path="/" component={CreateNewPostButton} />
              <Route exact path="/:category" component={CreateNewPostButton} />
             <Route path="/" component={ContentArea} />
             <Route path="*" component={NotFoundError} />


              <Switch>
                <Route path="/post/new" component={PostContentForm} />
                <Route path="/post/edit/:postId" component={PostContentForm} />
                <Route path="/:category/:postId" component={PostsData} />
              </Switch>
            </div>
    );
  }
}

export default App;
