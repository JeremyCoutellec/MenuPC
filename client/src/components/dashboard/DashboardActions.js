import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const DashboardActions = ({ menu: { menu } }) => {
  return (
    <div className='dash-buttons'>
      <Link to='/menu' className='btn btn-light'>
        <i className='fa fa-file text-primary'></i> Modifier les informations
      </Link>
      {menu && (
        <Fragment>
          <Link
            to={`/menu/${menu._id}`}
            target='_blank'
            className='btn btn-light'
          >
            <i className='fa fa-eye text-primary'></i> Visualiser
          </Link>
          <Link to='/qr-menu' target='_blank' className='btn btn-light'>
            <i className='fas fa-qrcode text-primary'></i> Exporter
          </Link>
        </Fragment>
      )}
    </div>
  );
};

DashboardActions.propTypes = {
  menu: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  menu: state.menu,
});

export default connect(mapStateToProps)(DashboardActions);
