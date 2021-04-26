import React from 'react';
import Spinning from '../../Spinning/Spinning.component';

import './ButtonInput.style.scss';

const ButtonInput = ({children, loading, ...restProps}) => (
  <div className="button-input-wrapper">
    <button disabled={loading} {...restProps}>{!loading ? children : <Spinning/>}</button>
  </div>
);

export default ButtonInput;
