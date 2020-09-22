import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { removeDish } from '../../actions/dish';
import { connect } from 'react-redux';

const DishItem = ({ dish, removeDish }) => {
  return (
    <Fragment>
      <div className='large'>
        <h3>{dish.name}</h3>
        <button
          onClick={() => removeDish()}
          className='btn btn-primary'
          type='button'
        >
          Retiré
        </button>
      </div>
    </Fragment>
  );
};

DishItem.propTypes = {
  dish: PropTypes.object.isRequired,
  removeDish: PropTypes.func.isRequired,
};

export default connect(null, { removeDish })(DishItem);
