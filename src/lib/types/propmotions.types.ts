import { IProduct } from './products.types';

export interface IPromotion {
  _id?: string;
  title: string;
  image: string;
  periodFrom: string;
  periodTo: string;
  description: string;
  products: IProduct[]
}