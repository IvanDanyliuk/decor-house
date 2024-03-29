import { ICategory } from './category.types';
import { IManufacturer } from './manufacturer.types';

export interface IProduct {
  _id?: string;
  category: string | ICategory;
  type: string;
  features: string[];
  name: string;
  description: string;
  size: {
    width: string;
    height: string;
    depth: string;
  };
  manufacturer: IManufacturer;
  characteristics: string;
  price: number;
  sale: string;
  images: string;
  colors: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IFilterItem {
  value: string;
  label: string;
}

export interface IPrice {
  min: number;
  max: number;
}

export interface IProductFiltersData {
  types: IFilterItem[];
  features: IFilterItem[];
  manufacturers: IFilterItem[];
  price: IPrice;
  order?: string;
  sortIndicator?: string;
}

export interface ISearchFiltersData {
  category: IFilterItem[];
  types: IFilterItem[];
  manufacturers: IFilterItem[];
  order?: string;
  sortIndicator?: string;
}

export interface ICheckedProductFilters {
  types: string[];
  features: string[];
  manufacturers: string[];
  price: IPrice;
  order?: string;
  sortIndicator?: string;
}

export interface ICheckedSearchFilters {
  category: string[];
  types: string[];
  manufacturers: string[];
  order?: string;
  sortIndicator?: string;
}

export interface IRelatedProducts {
  related: IProduct[];
  viewed: IProduct[];
}