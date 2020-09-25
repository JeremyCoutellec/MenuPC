import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Spinner from '../layout/Spinner';
import ShowDishes from './ShowDishes';
import ShowType from './ShowType';
import { getMenuById } from '../../actions/menu';
import { getCompanyByUserId } from '../../actions/company';
import { getAllDishesByUserId } from '../../actions/dish';
import defaultJPG from '../../img/default.jpg';
import PacriBG from '../../img/PacriBG.jpg';
import PacriLogo from '../../img/PacriLogo.jpg';
import defaultLogo from '../../img/defaultLogo.jpg';

const ShowMenu = ({
  company: { company, loading: loadingCompany },
  menu: { menu, loading },
  dish: { dishes, loading: loadingDish },
  getMenuById,
  getCompanyByUserId,
  getAllDishesByUserId,
  match,
}) => {
  useEffect(() => {
    if (!menu) {
      getMenuById(match.params.id);
    } else {
      getCompanyByUserId(menu.user);
      getAllDishesByUserId(menu.user);
    }
  }, [
    getMenuById,
    getCompanyByUserId,
    getAllDishesByUserId,
    menu,
    loading,
    match.params.id,
  ]);

  return loading || loadingDish ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        id='wrapper'
        className='fade-in'
        style={{
          padding: '0px 0 6rem',
        }}
      >
        <div id='intro'>
          {menu && menu.logo ? (
            <img
              style={{ position: 'fixed' }}
              src={`./img/${menu.logo}`}
              alt='Logo'
            />
          ) : company && company.logo ? (
            <img
              style={{ position: 'fixed' }}
              src={`./img/${company.logo}`}
              alt='Logo'
            />
          ) : menu && menu._id === '5f6c5a0198f60926d00ac5f6' ? (
            <img style={{ position: 'fixed' }} src={PacriBG} alt='Logo' />
          ) : (
            <img style={{ position: 'fixed' }} src={defaultJPG} alt='Logo' />
          )}
          <div className='logoAvatar'>
            {menu && menu._id === '5f6c5a0198f60926d00ac5f6' ? (
              <Avatar
                alt={`Logo ${(company && company.name) || menu.name}`}
                src={PacriLogo}
                style={{
                  height: '8rem',
                  width: '8rem',
                  border: 'white 2px solid',
                }}
              />
            ) : (
              <Avatar
                alt='Logo performance conseil'
                src={defaultLogo}
                style={{
                  height: '8rem',
                  width: '8rem',
                  border: 'white 2px solid',
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div
        id='main'
        style={{ marginBottom: '4rem', zIndex: 0, marginTop: '-6rem' }}
      >
        {!loadingCompany && <ShowType dishes={dishes} company={company} />}
        <ShowDishes dishes={dishes} user={menu.user} />
      </div>
    </Fragment>
  );
};

ShowMenu.propTypes = {
  getMenuById: PropTypes.func.isRequired,
  getCompanyByUserId: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  dish: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  menu: state.menu,
  company: state.company,
  dish: state.dish,
});

export default connect(mapStateToProps, {
  getAllDishesByUserId,
  getMenuById,
  getCompanyByUserId,
})(ShowMenu);
