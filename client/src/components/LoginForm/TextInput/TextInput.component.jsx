import React from 'react';

import './TextInput.style.scss';

const TextInput = ({icon, ...restProps}) => (
  <div className="text-input-wrapper">
    <img src={icon} className="input-icon"/>
    <input type="text" {...restProps}/>
  </div>
);

export default TextInput;
