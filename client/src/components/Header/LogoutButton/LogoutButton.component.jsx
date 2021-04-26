import React from 'react';
import logoutIcon from '../../../assets/images/logout-icon.svg';

import './LogoutButton.style.scss';

const LogoutButton = props => (
  <button className="logout-button" title="Logout" {...props}>
    <img src={logoutIcon}/>
  </button>
);

export default LogoutButton;
