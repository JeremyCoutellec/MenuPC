import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMenu } from '../../actions/menu';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

const ExportMenu = ({ getMenu, menu: { menu, loading } }) => {
  useEffect(() => {
    getMenu();
  }, [getMenu]);
  return loading ? (
    <CircularProgress />
  ) : menu ? (
    <div>
      Voici le QR code de votre menu
      <div className='large m-1' style={{ height: '200px', width: '200px' }}>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=https://secure-brushlands-87379.herokuapp.com/menu/${menu._id}`}
          alt='QR code du menu'
          title='QR code du menu'
        />
      </div>
    </div>
  ) : (
    <div>
      Aucun menu n'est configuré
      <Link to='/menu'>Modifier les informations du menu</Link>
    </div>
  );
};

ExportMenu.propTypes = {
  getMenu: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  menu: state.menu,
});

export default connect(mapStateToProps, { getMenu })(ExportMenu);
