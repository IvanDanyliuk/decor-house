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
  productCart: {
    product: IProduct;
    quantity: number;
  }[];
}