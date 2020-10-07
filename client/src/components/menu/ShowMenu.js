import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import ShowDishes from './ShowDishes';
import ShowType from './ShowType';
import { getMenuById } from '../../actions/menu';
import { getCompanyByUserId } from '../../actions/company';
import { getAllDishesByUserId } from '../../actions/dish';
import WrapperCompany from '../layout/WrapperCompany';

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
    <CircularProgress />
  ) : (
    <Fragment>
      <WrapperCompany menu={menu} company={company} />
      <div id='main' style={{ marginBottom: '4rem', zIndex: 0 }}>
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
