export interface IUser {
  _id?: string;
  name: string;
  photo: string;
  role: string;
  phone: string;
  email: string;
  password?: string;
  address: string;
  viewed: string[];
}