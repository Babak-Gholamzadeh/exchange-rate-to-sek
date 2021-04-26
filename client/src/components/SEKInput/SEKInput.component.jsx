import React, { useState } from 'react';
import { normalizePositiveNumber } from '../../lib/number-normalizer';
import './SEKInput.style.scss';

const SEKInput = ({ value, update }) => {
  const [state, setState] = useState(value);

  const onChange = (e) => {
    const { value: inputValue } = e.target;
    const normalizeValue = normalizePositiveNumber(inputValue, {priceFormat: false});
    setState(normalizeValue);
    update(normalizeValue);
  };

  return (
    <div className="sek-input" title="Input SEK value to convert it to the currencies of the countries below">
      <label htmlFor="sek">SEK VALUE</label>
      <input
        type="text"
        id="sek"
        value={state}
        onChange={onChange}
      />
    </div>
  );
};

export default SEKInput;
