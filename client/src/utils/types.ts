export interface AuthState {
  accessToken: string | null;
  user: {
    role: string;
  } | null;
}

export interface RootState {
  auth: AuthState;
}
