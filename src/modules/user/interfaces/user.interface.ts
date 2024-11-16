export interface UserResponseData {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface IUser extends UserResponseData {
  password: string;
}
