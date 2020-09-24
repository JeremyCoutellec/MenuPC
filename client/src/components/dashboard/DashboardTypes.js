import React from 'react';
import PropTypes from 'prop-types';
import { switchType } from '../../actions/type';
import { connect } from 'react-redux';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const DashboardTypes = ({ type: { type }, switchType }) => {
  const handleType = (event, newType) => {
    switchType(newType);
  };

  return (
    <ToggleButtonGroup
      value={type}
      exclusive
      onChange={handleType}
      aria-label='text alignment'
    >
      <ToggleButton value={0} aria-label='left aligned' disabled={type === 0}>
        <i className='fa fa-utensils'></i>
      </ToggleButton>
      <ToggleButton value={1} aria-label='centered' disabled={type === 1}>
        <i className='fa fa-coffee'></i>
      </ToggleButton>
      <ToggleButton value={2} aria-label='right aligned' disabled={type === 2}>
        <i className='fa fa-glass-martini-alt'></i>
      </ToggleButton>
      <ToggleButton value={3} aria-label='justified' disabled={type === 3}>
        <i className='fa fa-beer'></i>
      </ToggleButton>
    </ToggleButtonGroup>
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
