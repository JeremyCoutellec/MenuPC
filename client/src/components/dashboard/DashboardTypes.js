import React from 'react';
import PropTypes from 'prop-types';
import { switchType } from '../../actions/type';
import { connect } from 'react-redux';

const DashboardTypes = ({ type: { type }, switchType }) => {
  return (
    <div>
      <button
        className='btn'
        onClick={() => switchType(0)}
        disabled={type === 0}
      >
        <i className='fa fa-utensils'></i>
      </button>
      <button
        className='btn'
        onClick={() => switchType(1)}
        disabled={type === 1}
      >
        <i className='fa fa-coffee'></i>
      </button>
      <button
        className='btn'
        onClick={() => switchType(2)}
        disabled={type === 2}
      >
        <i className='fa fa-glass-martini-alt'></i>
      </button>
      <button
        className='btn'
        onClick={() => switchType(3)}
        disabled={type === 3}
      >
        <i className='fa fa-beer'></i>
      </button>
    </div>
  );
};

DashboardTypes.propTypes = {
  switchType: PropTypes.func.isRequired,
  type: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  type: state.type,
});

export default connect(mapStateToProps, { switchType })(DashboardTypes);
