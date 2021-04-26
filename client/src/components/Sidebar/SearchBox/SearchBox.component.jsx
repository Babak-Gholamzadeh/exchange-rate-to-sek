import React, { useState } from 'react';
import searchIcon from '../../../assets/images/search-icon.svg';

import './SearchBox.style.scss';

const SearchBox = ({ submitSearch }) => {
  const [name, setName] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    submitSearch(name);
  };

  return (
    <form className="search-box" onSubmit={onSubmit}>
      <input
        type="search"
        value={name}
        onChange={({ target: { value } }) => setName(value)}
        placeholder="SEARCH COUNTRY NAME"
      />
      <button type="submit">
        <img src={searchIcon} />
      </button>
    </form>
  );
};

export default SearchBox;
