import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Product from '@/lib/models/product.model';
import Manufacturer from '@/lib/models/manufacturer.model';
import Category from '@/lib/models/category.model';
import { removeFalsyObjectFields } from '@/utils/helpers';


export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const page = req.nextUrl.searchParams.get('page');
    const itemsPerPage = req.nextUrl.searchParams.get('itemsPerPage');
    const categoryData = req.nextUrl.searchParams.get('category');
    const typesData = req.nextUrl.searchParams.get('types');
    const featuresData = req.nextUrl.searchParams.get('features');
    const manufacturersData = req.nextUrl.searchParams.get('manufacturers');
    const minPrice = req.nextUrl.searchParams.get('minPrice');
    const maxPrice = req.nextUrl.searchParams.get('maxPrice');

    const categoryPattern = new RegExp(`${categoryData?.replaceAll('-', ' ')}`);
    const category = await Category.findOne({ name: { $regex: categoryPattern, $options: 'i' } });

    const types = typesData ? { $in: typesData.split(', ') } : null;
    const features = featuresData ? { $in: featuresData.split(', ') } : null;
    const manufacturers = manufacturersData ? { $in: manufacturersData.split(', ') } : null;
    const price = minPrice && maxPrice ? { $gte: Number(minPrice), $lte: Number(maxPrice) } : null;

    const params = removeFalsyObjectFields({ category, type: types, features, manufacturer: manufacturers, price });
    
    const countParams = categoryData ? params : {};

    const products = (page && itemsPerPage) ? 
      await Product
        .find(params)
        .sort({ 'createdAt': -1 })
        .limit(+itemsPerPage)
        .skip((+page - 1) * +itemsPerPage)
        .populate([
          { path: 'category', select: 'name', model: Category },
          { path: 'manufacturer', model: Manufacturer }
        ])
        .select('-__v') :
      await Product
        .find(params)
        .sort({ 'createdAt': -1 })
        .populate([
          { path: 'category', select: 'name', model: Category },
          { path: 'manufacturer', model: Manufacturer }
        ])
        .select('-__v');
        
    const count = await Product.countDocuments(countParams);

    return NextResponse.json({
      data: {
        products,
        count,
      },
      error: null,
      message: ''
    });
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
};