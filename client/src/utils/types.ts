export interface AuthState {
  accessToken: string | null;
  user: {
    role: string;
    name: string;
    email: string;
    id: number;
  } | null;
}

export interface RootState {
  auth: AuthState;
}
