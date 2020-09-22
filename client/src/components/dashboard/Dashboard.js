import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import DashboardDishes from './DashboardDishes';
import { getMenu } from '../../actions/menu';
import { getCompany } from '../../actions/company';
import DashboardTypes from './DashboardTypes';

const Dashboard = ({
  company: { company },
  menu: { menu, loading },
  getMenu,
  getCompany,
}) => {
  useEffect(() => {
    getMenu();
    getCompany();
  }, [getMenu, getCompany]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>
        {menu && menu.name ? (
          menu.name
        ) : (
          <Fragment>
            Carte {company !== null && <span>{company.name}</span>}
          </Fragment>
        )}
      </h1>
      <Fragment>
        <DashboardActions />
        <DashboardTypes />
        <DashboardDishes menu={menu} />
      </Fragment>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getMenu: PropTypes.func.isRequired,
  getCompany: PropTypes.func.isRequired,
  menu: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  menu: state.menu,
  company: state.company,
});

export default connect(mapStateToProps, { getMenu, getCompany })(Dashboard);
