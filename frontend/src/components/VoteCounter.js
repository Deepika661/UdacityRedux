import React from 'react';
import { upVote, downVote } from '../utils/configure';
import PropTypes from 'prop-types';
import { ArrowUpward, ArrowDownward } from 'material-ui-icons';


const VoteCounter = ({ item, handleVote }) => (
  <div>
    <ArrowUpward

       onClick={() =>
        handleVote(item, upVote)} 
        />
      <div style=
      {{ 
      	textAlign: 'center'
      	 }}>{item.voteScore}
    	 </div>

    <ArrowDownward
       onClick={() =>
        handleVote(item, downVote)} 
        />
  </div>
);

VoteCounter.propTypes =

 {
 
  item: PropTypes.object.isRequired,
  handleVote: PropTypes.func.isRequired
};

export default VoteCounter;
