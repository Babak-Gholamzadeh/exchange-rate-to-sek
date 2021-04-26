import React from 'react';
import { useAuth } from '../AuthProvider/AuthProvider.component';
import WebStorage from '../../lib/web-storage';
import LogoutButton from './LogoutButton/LogoutButton.component';

import './Header.style.scss';

const Header = () => {
  const [authState, setAuthState] = useAuth();

  const hanldeLogout = () => {
    WebStorage.remove('token');
    setAuthState({ isLoggedIn: false });
  };

  return (
    <div className="header">
      <div className="site-name">EXCHANGE RATE</div>
      {authState.isLoggedIn ? <LogoutButton onClick={hanldeLogout} /> : null}
    </div>
  );
};

export default Header;
