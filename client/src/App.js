import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './utils/store';

// Components
import Dashboard from './components/dashboard'
import AddUser from './components/user/add';
import SearchUser from './components/user/search';
import Navbar from './components/common/navbar';
import NotFound from './components/common/page-not-found';

import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/add" component={AddUser} />
            <Route exact path="/search" component={SearchUser} />
            <Route component={NotFound} />
          </Switch>
      </Router>
    </Provider>
  );
}

export default App;
