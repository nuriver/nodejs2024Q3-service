export interface UserResponseData {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface User extends UserResponseData {
  password: string;
}
