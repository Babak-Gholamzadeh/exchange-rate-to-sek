import React from 'react';
import './CheckboxInput.style.scss';

const CheckboxInput = ({ label, ...restProps }) => {
  const id = 'input-' + Math.floor(Math.random() * 0xFFFF).toString(32);
  return (
    <div className="checkbox-input-wrapper">
      <label htmlFor={id}>
        <input type="checkbox" id={id} {...restProps}/>
        <span className="box"></span>
        <span className="descrption">{label}</span>
      </label>
    </div>
  );
};

export default CheckboxInput;
