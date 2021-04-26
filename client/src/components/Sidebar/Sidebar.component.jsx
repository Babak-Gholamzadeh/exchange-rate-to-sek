import React from 'react';
import SearchBox from './SearchBox/SearchBox.component';
import List from './List/List.component';
import { useAuth } from '../AuthProvider/AuthProvider.component';
import { GET_COUNTRIES } from '../../graphql';
import { useLazyQuery } from '../../lib/graphql-client';

import './Sidebar.style.scss';

const Sidebar = ({selectCountry}) => {
  const [, setAuthState] = useAuth();
  const [getCountriesByName, countriesState] = useLazyQuery(GET_COUNTRIES);

  const submitSearch = (name) => {
    getCountriesByName({ variables: { name } });
  };

  if (countriesState.error) {
    setAuthState({ isLoggedIn: false });
  }

  return (
    <div className="side-bar">
      <SearchBox submitSearch={submitSearch} />
      <List list={countriesState} selectCountry={selectCountry} />
    </div>
  );
};

export default Sidebar;
