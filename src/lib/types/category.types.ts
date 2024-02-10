export interface ICategory  {
  _id?: string;
  name: string;
  image: string;
  types: string[];
  features: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IPremiumCategory {
  _id: string;
  name: string;
  image: string;
}