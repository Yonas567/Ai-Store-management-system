export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginUser {
  id: number;
  username: string;
}

export interface LoginResponse {
  access: string;
  user: LoginUser;
}
