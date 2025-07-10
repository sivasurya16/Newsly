import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
const api = import.meta.env.VITE_SERVER_URL || "";

const initialState = {
  isAuthenticated: false,

  user: null,
};

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        isAdmin: payload.isAdmin
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
      
        user: null,
      };
  }
};

const AuthContext = createContext({
  ...initialState,
  logIn: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logOut: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const getUserInfo = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const res = await axios.get(`${api}/auth/user/info`,{
          headers: {
            'x-auth-token': token
          }
        });
        // axios.defaults.headers.common['x-auth-token'] = token;
        dispatch({
          type: 'LOGIN',
          payload: {
            user: res.data.user,
            isAdmin: res.data.user.isAdmin
          },
        });
      } catch (err) {
        console.error(err);
        logOut();

      }
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  };

  // verify user on reducer state init or changes
  useEffect(() => {
    async function gets(){
      if (!state.user) {
          await getUserInfo();
      }
    }
    gets();
  }, []);

  const logIn = async (email, password) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(`${api}/auth/login`, body, config);
      localStorage.setItem('token', res.data.token);
      await getUserInfo();
    } catch (err) {
      console.error(err);
    }
  };

  const register = async (email, password) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post(`${api}/auth/register`, body, config);
      if (res.status == 200 && res.data?.token){
        localStorage.setItem('token', res.data.token);
        await getUserInfo();
        window.alert("registered successful");
      } else {
      console.warn("Unexpected response:", res);
    }
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  const logOut = async () => {
    try {
      localStorage.removeItem('token');
      dispatch({
        type: 'LOGOUT',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, logIn, register, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;