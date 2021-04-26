import React, { useState } from 'react';
import TextInput from './TextInput/TextInput.component';
import usernameIcon from '../../assets/images/user-icon.svg';
import passwordIcon from '../../assets/images/password-icon.svg';
import CheckboxInput from './CheckboxInput/CheckboxInput.component';
import ButtonInput from './ButtonInput/ButtonInput.component';

import './LoginForm.style.scss';

const LoginForm = ({ formInputsState, submit, loading }) => {
  const [state, setState] = useState(formInputsState);

  const textInputOnChange = ({ target: { name, value } }) => {
    setState({ ...state, [name]: value });
  };

  const checkboxInputOnChange = () => {
    setState({
      ...state,
      rememberMe: !state.rememberMe,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    submit(state);
  };

  return (
    <div className="form-wrapper">
      <div className="form-title">Login Form</div>
      <form className="form" onSubmit={onSubmit}>
        <TextInput
          name="username"
          value={state.username}
          onChange={textInputOnChange}
          placeholder="USERNAME"
          icon={usernameIcon}
        />
        <TextInput
          type="password"
          name="password"
          value={state.password}
          onChange={textInputOnChange}
          placeholder="PASSWORD"
          icon={passwordIcon}
        />
        <CheckboxInput
          name="rememberMe"
          value={state.rememberMe}
          onChange={checkboxInputOnChange}
          label="Remember me?"
        />
        <ButtonInput type="submit" loading={loading}>
          LOGIN
        </ButtonInput>
      </form>
    </div>
  );
};

export default LoginForm;
