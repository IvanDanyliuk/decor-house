import { IProduct } from "./products.types";

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
  cart: {
    product: IProduct[];
    quantity: number;
  }[];
}