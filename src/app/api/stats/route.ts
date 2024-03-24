import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Category from '@/lib/models/category.model';
import Order from '@/lib/models/order.model';
import Product from '@/lib/models/product.model';


export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const category = req.nextUrl.searchParams.get('categoryId');
    const periodFrom = req.nextUrl.searchParams.get('periodFrom');
    const periodTo = req.nextUrl.searchParams.get('periodTo');

    const query = {
      createdAt: { $gte: periodFrom, $lte: periodTo }
    };

    await connectToDB();

    const categories = await Category.find({}).select('-__v');
    const orders = await Order.find(query).populate({ path: 'products.product', model: Product });

    const earnings = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const averageBill = Math.round(earnings / orders.length);
    const productsSoldData = orders.map(item => item.products).flat();
    
    const productsSold = categories.map(category => {
      const products = productsSoldData.filter(product => product.product.category.toString() === category._id.toString());
      const amountPerCategory = products.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
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
          'products.product.category': new mongoose.Types.ObjectId(category!)
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
    
    return NextResponse.json({
      total: {
        earnings,
        ordersCount: orders.length,
        averageBill,
      },
      productsSold,
      ordersDynamic,
      salesPerCategory
    })
  } catch (error: any) {
    return new NextResponse(error, { status: 500 })
  }
};