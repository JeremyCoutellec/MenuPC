import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { switchType } from '../../actions/type';

const ShowType = ({ type: { type }, dishes, switchType }) => {
  return (
    <div>
      {dishes.filter(dish => dish.category && dish.category.type === 0).length >
        0 && (
        <button
          className='btn'
          onClick={() => switchType(0)}
          disabled={type === 0}
        >
          <i className='fa fa-utensils'></i>
        </button>
      )}
      {dishes.filter(dish => dish.category && dish.category.type === 1).length >
        0 && (
        <button
          className='btn'
          onClick={() => switchType(1)}
          disabled={type === 1}
        >
          <i className='fa fa-coffee'></i>
        </button>
      )}
      {dishes.filter(dish => dish.category && dish.category.type === 2).length >
        0 && (
        <button
          className='btn'
          onClick={() => switchType(2)}
          disabled={type === 2}
        >
          <i className='fa fa-glass-martini-alt'></i>
        </button>
      )}
      {dishes.filter(dish => dish.category && dish.category.type === 3).length >
        0 && (
        <button
          className='btn'
          onClick={() => switchType(3)}
          disabled={type === 3}
        >
          <i className='fa fa-beer'></i>
        </button>
      )}
    </div>
  );
};

ShowType.propTypes = {
  switchType: PropTypes.func.isRequired,
  type: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  dishes: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  type: state.type,
});

export default connect(mapStateToProps, { switchType })(ShowType);
