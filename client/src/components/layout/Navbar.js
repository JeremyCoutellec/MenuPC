import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/company'>
          <i className='fa fa-building'></i> Entreprise
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-file' /> Carte
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' /> Se deconnecter
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>S'inscrire</Link>
      </li>
      <li>
        <Link to='/login'>S'identifier</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h2>
        <Link to='/'>
          <i className='fas fa-qrcode'></i> QResto
        </Link>
      </h2>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
