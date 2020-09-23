import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large' style={{ color: 'white' }}>
            QResto
          </h1>
          <p className='lead'>Ici une description rapide de QResto</p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              S'inscrire
            </Link>
            <Link to='/login' className='btn btn-light'>
              S'identifier
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
