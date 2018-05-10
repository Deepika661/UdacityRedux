import React from 'react';
import { Link } from 'react-router-dom';
import { VOTE_COUNTER, TIMESTAMP_ORDER } from '../utils/configure';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import Select from 'material-ui/Select';
import { FormControl } from 'material-ui/Form';
import AppBar from 'material-ui/AppBar';
import { MenuItem } from 'material-ui/Menu';
import Toolbar from 'material-ui/Toolbar';



const AllCategoriesArea = ({ categories, order, changeOrder }) => (

        <AppBar position="sticky" color="default">
          <Toolbar>
            {
              categories && categories.length > 0 && categories.map((category, i) => (
                <Link to={`/${category.path}`}key={i}style={{ textDecoration: 'none' }} >


                <Button raised color="contrast">{category.name}</Button>
                  </Link>
              ))
            }

          <FormControl>
            <Select style={{ color: 'black' }} value={order} onChange={changeOrder}input={<Input id="order-tag" />}
            >
              <MenuItem value={VOTE_COUNTER}>
              OrderByVote
              </MenuItem>
              <MenuItem value={TIMESTAMP_ORDER}>
              OrderByTime
              </MenuItem>
              
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
  );

    AllCategoriesArea.propTypes =
     
     {
      categories: PropTypes.array.isRequired,
      order: PropTypes.string.isRequired,
      changeOrder: PropTypes.func.isRequired
    };


export default AllCategoriesArea;
