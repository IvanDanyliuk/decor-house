'use server';

import mongoose from 'mongoose';
// import { AXIOS } from '../axios';
import { connectToDB } from '../database';
import Category from '../models/category.model';
import Order from '../models/order.model';
import Product from '../models/product.model';


export const getStatsFilterData = async () => {
  // const { data } = await AXIOS.get(
  //   '/api/stats/filters'
  // );
  // return data;

  await connectToDB();

  const categoriesData = await Category.find({}).select('-__v');
  const categories = categoriesData.map(category => ({ label: category.name, value: category._id }));
  const orders = await Order.find({}).sort({ createdAt: 1 });
  const periodFrom = orders.length > 0 ? orders[0].createdAt : new Date().toISOString();
  const periodTo = orders.length > 0 ? orders[orders.length - 1].createdAt : new Date().toISOString();

  return {
    categories,
    periodFrom,
    periodTo
  } as any;
};

export const getStats = async ({ 
  categoryId, 
  periodFrom, 
  periodTo 
}: { 
  categoryId: string;
  periodFrom: string;
  periodTo: string;
}) => {
  // const { data } = await AXIOS.get(
  //   '/api/stats',
  //   { params: { categoryId, periodFrom, periodTo } }
  // );
  // return data;

  const query = {
    createdAt: { $gte: periodFrom, $lte: periodTo }
  };

  await connectToDB();

  const categories = await Category.find({}).select('-__v');
  const orders = await Order.find(query).populate({ path: 'products.product', model: Product }).lean();

  const earnings = orders.length > 0 ? orders.reduce((acc, curr) => acc + curr.totalAmount, 0) : 0;
  const averageBill = Math.round(earnings / orders.length);
  const productsSoldData = orders.map(item => item.products).flat();
  
  const productsSold = categories.map(category => {
    const products = productsSoldData.filter(product => product.product.category.toString() === category._id.toString());
    const amountPerCategory = products.length > 0 ? products.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0) : 0;
    return {
      name: category.name,
      percentage: Math.round(amountPerCategory / earnings * 100)
    };
  });

  const ordersDynamic = await Order.aggregate([
    {
      $match: { 
        createdAt: { 
          $gte: new Date(periodFrom!), 
          $lte: new Date(periodTo!) 
        } 
      }
    },
    {
      $group: {
        _id: {
          'day': { $dayOfMonth: '$createdAt' },
          'month': { $month: '$createdAt' },
          'year': { $year: '$createdAt' }
        },
        totalAmount: { $sum: { $add: '$totalAmount' } }
      }
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1,
        '_id.day': 1,
      }
    }
  ]);

  const salesPerCategory = await Order.aggregate([
    {
      $match: { 
        createdAt: { 
          $gte: new Date(periodFrom!), 
          $lte: new Date(periodTo!) 
        } 
      }
    },
    {
      $unwind: {
        path: '$products'
      }
    },
    {
      $lookup: {
        from: Product.collection.name,
        localField: 'products.product',
        foreignField: '_id',
        let: {
          product: '$products.product',
          quantity: '$products.quantity'
        },
        pipeline: [
          {
            $project: {
              '_id': 0,
              product: '$$ROOT',
              quantity: '$$quantity'
            }
          }
        ],
        as: 'products'
      }
    },
    {
      $unwind: {
        path: '$products'
      }
    },
    {
      $group: {
        _id: {
          'day': { $dayOfMonth: '$createdAt' },
          'month': { $month: '$createdAt' },
          'year': { $year: '$createdAt' }
        },
        products: {
          $push: '$products'
        }
      }
    },
    {
      $unwind: '$products'
    },
    {
      $match: {
        'products.product.category': new mongoose.Types.ObjectId(categoryId!)
      }
    },
    {
      $group: {
        _id: '$_id',
        products: { $push: '$products' }
      }
    },
    {
      $unwind: '$products'
    },
    {
      $group: {
        _id: '$_id',
        amount: {
          $sum: {
            $multiply: ['$products.product.price', '$products.quantity']
          }
        }
      }
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1,
        '_id.day': 1,
      }
    },
  ]);

  const topCategories = await Order.aggregate([
    {
      $match: { 
        createdAt: { 
          $gte: new Date(periodFrom!), 
          $lte: new Date(periodTo!) 
        } 
      }
    },
    {
      $unwind: {
        path: '$products'
      }
    },
    {
      $lookup: {
        from: Product.collection.name,
        localField: 'products.product',
        foreignField: '_id',
        let: {
          product: '$products.product',
          quantity: '$products.quantity'
        },
        pipeline: [
          {
            $project: {
              '_id': 0,
              product: '$$ROOT',
              quantity: '$$quantity'
            }
          }
        ],
        as: 'products'
      }
    },
    {
      $unwind: {
        path: '$products'
      }
    },
    {
      $group: {
        _id: '$products.product.category',
        products: {
          $push: '$products'
        }
      }
    },
    {
      $lookup: {
        from: Category.collection.name,
        localField: '_id',
        foreignField: '_id',
        as: 'category'
      }
    },
    {
      $unwind: '$category'
    },
    {
      $project: {
        _id: '$category.name',
        products: 1
      }
    },
    {
      $unwind: '$products'
    },
    {
      $group: {
        _id: '$_id',
        amount: {
          $sum: {
            $multiply: ['$products.product.price', '$products.quantity']
          }
        }
      }
    },
    {
      $sort: {
        amount: -1
      }
    }
  ]);

  return {
    total: {
      earnings,
      ordersCount: orders.length,
      averageBill,
      productsSold: productsSoldData.length > 0 ? productsSoldData.reduce((acc, curr) => acc + curr.quantity, 0) : 0
    },
    productsSold,
    ordersDynamic,
    salesPerCategory,
    topCategories
  } as any;
};