import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import ShowMenu from './components/menu/ShowMenu';
import ClientForm from './components/client/ClientForm';

import './App.css';
import AdministrationRoutes from './components/routing/AdministrationRoutes';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/menu/:id' component={ShowMenu} />
            <Route exact path='/clients/:id' component={ClientForm} />
            <Route component={AdministrationRoutes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
