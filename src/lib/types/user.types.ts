import { IProduct } from "./products.types";

export interface ICartItem {
  product: IProduct;
  quantity: number;
}
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
  cart: ICartItem[];
}