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

export interface FetchBaseQueryError {
  status: number;
  data?: unknown;
}

export interface SerializedError {
  message: string;
}
