export interface IUser {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  password?: string;
}
