import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar.component';
import SEKInput from '../../components/SEKInput/SEKInput.component';
import SelectedList from '../../components/SelectedList/SelectedList.component';

import './Home.style.scss';

const HomePage = () => {
  const [SEKValue, setSEKValue] = useState(1);
  const [selectedCountries, setSelectedCountries] = useState([]);

  const selectCountry = (country) => {
    setSelectedCountries([...selectedCountries, exchangeValueToSEK(country)]);
  };

  const removeCountry = (countryIndex) => {
    selectedCountries.splice(countryIndex, 1);
    setSelectedCountries([...selectedCountries]);
  };

  useEffect(() => {
    setSelectedCountries(selectedCountries.map(exchangeValueToSEK));
  }, [SEKValue]);

  const exchangeValueToSEK = ({ currencies, ...rest }) => ({
    ...rest,
    currencies: currencies.map(({ code, rateToSEK }) => ({
      code,
      rateToSEK,
      value: SEKValue * rateToSEK,
    })),
  });

  return (
    <div className="home-page">
      <Sidebar selectCountry={selectCountry} />
      <div className="main">
        <SEKInput value={SEKValue} update={setSEKValue} />
        <SelectedList list={selectedCountries} removeCountry={removeCountry} />
      </div>
    </div>
  );
};

export default HomePage;
