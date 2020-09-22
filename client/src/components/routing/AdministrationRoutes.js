import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Landing } from '../layout/Landing';
import Navbar from '../layout/Navbar';
import Routes from './Routes';

const AdministrationRoutes = () => {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route component={Routes} />
      </Switch>
    </Fragment>
  );
};

export default AdministrationRoutes;
