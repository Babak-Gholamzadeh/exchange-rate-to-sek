import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { IS_USER_AUTHENTICATED } from '../../graphql';
import { useQuery } from '../../lib/graphql-client';

const AuthContext = createContext();
const DispatcherContext = createContext();

const types = {
  AUTH_STATE: 'AUTH_STATE',
};

export const authReducer = (state, { type, payload }) => {
  switch (type) {
    case types.AUTH_STATE:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export const useAuth = () => {
  const authState = useContext(AuthContext);
  const authDispatcher = useContext(DispatcherContext);
  const setAuthState = (payload) =>
    authDispatcher({
      type: types.AUTH_STATE,
      payload,
    });
  return [authState, setAuthState];
};

const AuthProvider = ({ children }) => {
  const [authState, authDispatcher] = useReducer(authReducer, {});
  const { loading, error } = useQuery(IS_USER_AUTHENTICATED);

  useEffect(() => {
    if(!loading)
      authDispatcher({
        type: types.AUTH_STATE,
        payload: { isLoggedIn: error ? false : true },
      });
  }, [loading]);

  if (loading) return null;

  return (
    <AuthContext.Provider value={authState}>
      <DispatcherContext.Provider value={authDispatcher}>
        {children}
      </DispatcherContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
