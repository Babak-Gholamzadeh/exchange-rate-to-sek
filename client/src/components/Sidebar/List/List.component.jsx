import React from 'react';
import rightArrowIcon from '../../../assets/images/right-arrow-icon.svg';
import Spinning from '../../Spinning/Spinning.component';

import './List.style.scss';

const List = ({ list: { data, loading }, selectCountry }) => {
  let result = loading ? (
    <Spinning />
  ) : (
    <div className="no-item">Nothing found!</div>
  );

  if (data && data.getCountries.length)
    result = data.getCountries.map((country, index) => (
      <div
        className="country-item"
        key={index}
        onClick={selectCountry.bind(null, country)}
      >
        <span className="name">{country.name}</span>
        <img src={rightArrowIcon} className="arrow-icon" />
      </div>
    ));
  return (
    <div className="country-list">
      {result}
    </div>
  );
};

export default List;
