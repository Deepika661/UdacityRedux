import React from 'react';
import CommentFormDisplay from './CommentFormDisplay';
import { timeOrder } from '../utils/configure';
import List, { ListItem, ListItemText } from 'material-ui/List';
import PropTypes from 'prop-types';
import VoteCounter from './VoteCounter';
import moment from 'moment';
import Card from 'material-ui/Card';
import { Edit, DeleteForever } from 'material-ui-icons';


const Container = ({ item }) => (
    <div style=
    {{ 

      paddingLeft: 15


     }}>

      <ListItemText primary={item.body} secondary={`${moment(item.timestamp)
              .format(timeOrder)} - Author: ${item.author}`}
              />

    </div>
      );

const CommentShow = ({items, handleDelete,handleVote,CommentEditing,
  handleEditButton,FormatFinish}) => {

return (
<List> {items && items.length > 0 && items.map((item, i) => (
          <div key={i}><Card style=
            {{
             padding: 5, 
              margin: 5 
            }}>

      {!(CommentEditing && CommentEditing.id === item.id) && (
     <ListItem><div
        style={{
          flex: '1 1 auto',
              display: 'flex',
             alignItems: 'center'
               
              }}
                  >
                    <VoteCounter
                     item={item}
                      handleVote={handleVote}
                       />
                    <Container
                     item={item} />
                    <div
                      style=
                      {{
                        flex: '1 1 auto'
                      }}
                    />
                    <div>
                      <Edit 
                      onClick={() => handleEditButton(item)}
                       />
                      <DeleteForever
                       onClick={() => 
                        handleDelete(item)} />
                    </div>
                  </div>
                </ListItem>
              )}

              {CommentEditing &&
                CommentEditing.id === item.id
                 && (
                  <CommentFormDisplay comment={item}
                    FormatFinish={FormatFinish}
                  />
                )}
            </Card>
          </div>
        ))}
    </List>
  );
};

  Container.propTypes = 
  {
    item: PropTypes.object.isRequired
  };

  CommentShow.propTypes =
   {
      
      items: PropTypes.array.isRequired,handleDelete: PropTypes.func.isRequired,
      CommentEditing: PropTypes.bool,handleEditButton: PropTypes.func.isRequired,
      handleVote: PropTypes.func.isRequired, FormatFinish: PropTypes.func.isRequired
      
};

export default CommentShow;
