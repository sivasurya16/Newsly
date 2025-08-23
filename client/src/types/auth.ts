import type { ReactNode } from "react";

export interface State {
  isAuthenticated: boolean,
  user?: string | null,
  isAdmin: boolean
}

export enum actionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT"
}

export interface authAction {
  type: actionType,
  payload: Partial<State>
}

export interface AuthProviderProps {
  children: ReactNode;
}