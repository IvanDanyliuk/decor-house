import { IProduct } from './products.types';


export interface IInterior {
  _id?: string,
  title: string,
  description: string;
  image: string;
  products: IProduct[] | string[];
}