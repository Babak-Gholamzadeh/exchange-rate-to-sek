import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header.component';
import HomePage from './pages/Home/Home.component';
import LoginPage from './pages/Login/Login.component';

import './App.scss';

const App = () => (
  <div className="container">
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route path="*" render={() => <div>404</div>} />
    </Switch>
  </div>
);

export default App;
