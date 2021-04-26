import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.component';
import Header from './components/Header/Header.component';
import HomePage from './pages/Home/Home.component';
import LoginPage from './pages/Login/Login.component';

const App = () => (
  <div className="container">
    <Header />
    <Switch>
      <ProtectedRoute exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route path="*" render={() => <div>404</div>} />
    </Switch>
  </div>
);

export default App;
