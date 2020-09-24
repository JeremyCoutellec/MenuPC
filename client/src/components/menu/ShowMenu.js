import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ShowDishes from './ShowDishes';
import ShowType from './ShowType';
import { getMenuById } from '../../actions/menu';
import { getCompanyByUserId } from '../../actions/company';
import { getAllDishesByUserId } from '../../actions/dish';
import defaultJPG from '../../img/default.jpg';

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
      <div id='wrapper' className='fade-in'>
        <div id='intro'>
          {menu && menu.logo ? (
            <img
              style={{ maxWidth: '100em', maxHeight: '30em' }}
              src={`./img/${menu.logo}`}
              alt='Logo'
            />
          ) : company && company.logo ? (
            <img
              style={{ maxWidth: '100em', maxHeight: '30em' }}
              src={`./img/${company.logo}`}
              alt='Logo'
            />
          ) : (
            <img
              style={{ maxWidth: '100em', maxHeight: '30em' }}
              src={defaultJPG}
              alt='Logo'
            />
          )}
          <h1
            style={{
              position: 'relative',
              top: '-18rem',
              zIndex: 1,
              textAlign: 'center',
              color: 'black',
            }}
          >
            {menu && menu.name ? (
              menu.name
            ) : (
              <Fragment>
                Carte {company !== null && <span>{company.name}</span>}
              </Fragment>
            )}
          </h1>
        </div>
      </div>
      {!loadingCompany && <ShowType dishes={dishes} company={company} />}
      <div id='main'>
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
