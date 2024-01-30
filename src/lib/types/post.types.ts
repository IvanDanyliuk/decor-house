import { ICategory } from "./category.types";

export interface IPost {
  _id?: string;
  title: string;
  image: string;
  publicationDate: string;
  tags: ICategory[] | string[];
  content: string;
  createdAt?: string;
  updatedAt?: string;
}