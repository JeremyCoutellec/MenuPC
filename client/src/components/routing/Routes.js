import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Alert from '../layout/Alert';
import Modal from '../layout/Modal';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';
import NotFound from '../layout/NotFound';
import UpdateCompany from '../company/UpdateCompany';
import ExportMenu from '../menu/ExportMenu';
import UpdateMenu from '../menu/UpdateMenu';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Modal />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/menu' component={UpdateMenu} />
        <PrivateRoute exact path='/qr-menu' component={ExportMenu} />
        <PrivateRoute exact path='/company' component={UpdateCompany} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
