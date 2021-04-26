import React from 'react';
import removeIcon from '../../assets/images/remove-icon.svg';
import { normalizePositiveNumber } from '../../lib/number-normalizer';

import './SelectedList.style.scss';

const SelectedList = ({ list, removeCountry }) => {
  const headers = (
    <div className="main-item main-header">
      <div className="item-flag"></div>
      <div className="item-name">NAME</div>
      <div className="item-population">POPULATION</div>
      <div className="item-currencies">CURRENCIES</div>
      <div className="item-action">ACTION</div>
    </div>
  );

  let result = (
    <div className="no-item">Search countries and add them here!</div>
  );

  if (list.length) {
    result = list.map(({ name, population, flag, currencies }, index) => (
      <div className="main-item" key={index}>
        <img src={flag} class="item-flag" />
        <div class="item-name">{name}</div>
        <div class="item-population">{normalizePositiveNumber(population, {priceFormat: true, fixed: 0})}</div>
        <div class="item-currencies">
          {currencies.map(({ code, value }) => (
            <div key={code} className="currency-box">
              <span className="currency-code">{code}</span>
              <span className="currency-value">
                {value
                  ? normalizePositiveNumber(value, {
                      priceFormat: true,
                      fixed: 3,
                    })
                  : 'N/A'}
              </span>
            </div>
          ))}
        </div>
        <div className="item-action">
          <button onClick={() => removeCountry(index)}>
            <img src={removeIcon} />
          </button>
        </div>
      </div>
    ));
  }

  return (
    <div className="main-list">
      {result.length ? headers : null}
      {result}
    </div>
  );
};

export default SelectedList;
