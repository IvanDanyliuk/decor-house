'use server';

import mongoose from 'mongoose';
import { connectToDB } from '../database';
import Product from '../models/product.model';
import Manufacturer from '../models/manufacturer.model';
import Category from '../models/category.model';
import User from '../models/user.model';
import { removeFalsyObjectFields } from '@/utils/helpers';


export const getProducts = async ({ 
  page, 
  itemsPerPage, 
  category,
  types,
  features,
  manufacturers, 
  minPrice, 
  maxPrice,
  order,
  sortIndicator = 'createdAt',
}: { 
  page?: number, 
  itemsPerPage?: number, 
  category?: string;
  types?: string,
  features?: string,
  manufacturers?: string;
  minPrice?: number;
  maxPrice?: number;
  order?: string;
  sortIndicator?: string;
}) => {
  await connectToDB();

  const isCategoryDataValidObjectId = mongoose.Types.ObjectId.isValid(category!);
  const categoryPattern = new RegExp(`${category?.replaceAll('-', ' ')}`);
  
  const categoryData = isCategoryDataValidObjectId ? 
    await Category.findById(category) : 
    await Category.findOne({ name: { $regex: categoryPattern, $options: 'i' } });

  const typesData = types ? { $in: types.split(';') } : null;
  const featuresData = features ? { $in: features.split(';') } : null;
  const manufacturersData = manufacturers ? { $in: manufacturers.split(';') } : null;
  const price = minPrice && maxPrice ? { $gte: Number(minPrice), $lte: Number(maxPrice) } : null;

  const params = removeFalsyObjectFields({ 
    category: categoryData, 
    type: typesData, 
    features: featuresData, 
    manufacturer: manufacturersData, 
    price 
  });
  
  const countParams = category ? params : {};

  const products = (page && itemsPerPage) ? 
    await Product
      .find(params)
      .sort({ [sortIndicator]: order === 'asc' ? 1 : -1 })
      .limit(+itemsPerPage)
      .skip((+page - 1) * +itemsPerPage)
      .populate([
        { path: 'category', select: 'name', model: Category },
        { path: 'manufacturer', model: Manufacturer }
      ])
      .select('-__v')
      .lean() :
    await Product
      .find(params)
      .sort({ [sortIndicator]: order === 'asc' ? -1 : 1  })
      .populate([
        { path: 'category', select: 'name', model: Category },
        { path: 'manufacturer', model: Manufacturer }
      ])
      .select('-__v')
      .lean();
      
  const count = await Product.countDocuments(countParams);

  return {
    data: {
      products,
      count,
    },
    error: null,
    message: ''
  } as any;
};

export const getProduct = async (id: string) => {
  await connectToDB();

  const isProductIdValid = mongoose.Types.ObjectId.isValid(id);

  const product = isProductIdValid ? 
    await Product
      .findById(id)
      .populate({ path: 'manufacturer', model: Manufacturer })
      .select('-__v')
      .lean() :
    null;

  return product as any;
};

export const getProductsFilterData = async (category: string) => {
  await connectToDB();

  const categoryPattern = new RegExp(`${category?.replaceAll('-', ' ')}`);
  const categoryData = await Category.findOne({ name: { $regex: categoryPattern, $options: 'i' } });

  const products = await Product.find({ category: categoryData });
  const productManufacturers = products.map(item => item.manufacturer);
  const manufacturers = await Manufacturer.find({ _id: { $in: productManufacturers } });
  const prices: number[] = products.map(item => item.price);

  return {
    types: [...new Set(categoryData.types)].map(item => ({ label: item, value: item })),
    features: [...new Set(categoryData.features)].map(item => ({ label: item, value: item })),
    manufacturers: manufacturers.map(item => ({ label: item.name, value: item._id })),
    price: {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  } as any;
};

export const getRelatedProducts = async (email: string, limit: number, categoryId?: string) => {
  await connectToDB();

  const user: any = email ? 
    await User.findOne({ email }).populate({ path: 'viewed', model: Product }).lean() : 
    null;
  
  const query = categoryId ? [
    { $sample: { size: +limit! } },
    { $project: { '__v': 0 } },
    { $match: { category: new mongoose.Types.ObjectId(categoryId) } },
  ] : [
    { $sample: { size: +limit! } },
    { $project: { '__v': 0 } },
  ];

  const related = await Product.aggregate(query).limit(+limit!);
  await Product.populate(related, { path: 'category', model: Category });

  const viewed = user ? 
    await Product
      .find({ _id: { $in: user.viewed } })
      .populate({ path: 'category', model: Category })
      .select('-__v')
      .lean() : 
    [];

  return {
    related,
    viewed
  } as any;
};

export const getSearchFilterData = async () => {
  await connectToDB();

  const categories = await Category.find({}).select('-__v');
  const manufacturers = await Manufacturer.find({}).select('-__v');
  const minPriceProduct: any = await Product.find({}).sort({ price: 1 }).limit(1);
  const maxPriceProduct: any = await Product.find({}).sort({ price: -1 }).limit(1);

  return {
    data: {
      categories,
      manufacturers,
      minPrice: minPriceProduct[0].price,
      maxPrice: maxPriceProduct[0].price,
    },
    error: null,
    message: '',
  } as any;
};

export const searchProducts = async ({ 
  page, 
  itemsPerPage, 
  query, 
  category, 
  types, 
  manufacturers, 
  order, 
  sortIndicator 
} : {
  page: number;
  itemsPerPage: number;
  query: string;
  category?: string;
  types?: string;
  manufacturers?: string;
  order?: string;
  sortIndicator?: string;
}) => {
  const itemsToSkip = (page - 1) * itemsPerPage;

  const params: any = Object.values(removeFalsyObjectFields({
    query: {
      $or: [
        { 'category.name': { $regex: query, $options: 'i' } },
        { name: { $regex: query, $options: 'i' } },
      ]
    },
    category: category ? { 'category.name': { $regex: category, $options: 'i' } } : null,
    types: types ? { type: { $in: types.split(';') } } : null,
    manufacturer: manufacturers ? { manufacturer: { $in: manufacturers.split(';').map(item => new mongoose.Types.ObjectId(item)) } } : null,
  }));
  
  await connectToDB();

  const products = await Product.aggregate([
    {
      $lookup: {
        from: Category.collection.name,
        localField: 'category',
        foreignField: '_id',
        as: 'category'
      }
    },
    {
      $match: {
        $and: [
          ...params
        ]
      }
    },
    {
      $sort: {
        [sortIndicator!]: order === 'asc' ? 1 : -1
      }
    },
    {
      $facet: {
        products: [
          {
            $skip: itemsToSkip
          },
          {
            $limit: itemsPerPage
          },
        ],
        count: [
          {
            $count: 'count'
          }
        ]
      }
    }
  ]);

  return {
    data: {
      products: products[0].products,
      count: products[0].count[0].count
    },
    error: null,
    message: '',
  } as any;
};