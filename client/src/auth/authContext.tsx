import { createContext, ReactNode, Reducer, useEffect, useReducer } from 'react';
import axios, { Axios, AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface State {
  isAuthenticated: boolean,
  user?: string | null,
  isAdmin: boolean
}

enum actionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT"
}

interface authAction {
  type: actionType,
  payload: Partial<State>
}


const api = import.meta.env.VITE_SERVER_URL || "";

const initialState: State = {
  isAuthenticated: false,
  user: null,
  isAdmin: false
};

const authReducer = (state: State, { type, payload }: authAction): State => {
  switch (type) {
    case actionType.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
      };
    case actionType.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isAdmin: false
      };
    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  logIn: async (email: string, password: string) => {},           
  register: async (email: string, password: string) => false,
  logOut: async () => {},
});


export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const getUserInfo = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const res = await axios.get(`${api}/auth/user/info`, {
          headers: {
            'x-auth-token': token
          }
        });
        // axios.defaults.headers.common['x-auth-token'] = token;
        dispatch({
          type: actionType.LOGIN,
          payload: {
            user: res.data.user,
            isAdmin: res.data.user.isAdmin,
          },
        });
      } catch (err) {
        console.error(err);
        logOut();

      }
    }
  };

  const logIn = async (email: string, password: string) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(`${api}/auth/login`, body, config);
      localStorage.setItem('token', res.data.token);
      await getUserInfo();
      toast.success("Logged in successfully");

    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.msg || "Something went wrong");
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const register = async (email: string, password: string) => {
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post(`${api}/auth/register`, body, config);
      toast.success(res.data.msg);
      return true;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.msg || "Something went wrong");
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
      return false;
    }
  };

  const logOut = async () => {
    try {
      localStorage.removeItem('token');
      toast.success("Logged Out successfully");
      dispatch({
        type: actionType.LOGOUT,
        payload: {}
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.msg || "Something went wrong");
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  // verify user on reducer state init or changes
  useEffect(() => {
    async function gets() {
      if (!state.user) {
        await getUserInfo();
      }
    }
    gets();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, logIn, register, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;