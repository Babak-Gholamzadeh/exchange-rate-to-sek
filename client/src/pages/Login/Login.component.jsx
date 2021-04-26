import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm.component';
import { Redirect } from 'react-router-dom';
import { LOGIN } from '../../graphql';
import { useMutation } from '../../lib/graphql-client';
import { useAuth } from '../../components/AuthProvider/AuthProvider.component';
import WebStorage from '../../lib/web-storage';

import './Login.style.scss';

const LoginPage = () => {
  const [authState, setAuthState] = useAuth();

  const formInputsState = {
    username: '',
    password: '',
    rememberMe: false,
  };

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: ({ login }) => {
      WebStorage.set(
        { token: login.token },
        { permanent: formInputsState.rememberMe }
      );
      setAuthState({ isLoggedIn: true });
    },
  });

  const submit = (newFormInputsState) => {
    Object.assign(formInputsState, newFormInputsState);
    login({
      variables: {
        username: newFormInputsState.username,
        password: newFormInputsState.password,
      },
    });
  };

  if (authState.isLoggedIn) return <Redirect to="/" />;
  return (
    <div className="login-page">
      <LoginForm submit={submit} formInputsState={formInputsState} loading={loading} error={error}/>
      {error ? <div className="login-error">Username / password is incorrect!</div> : null}
    </div>
  );
};

export default LoginPage;
