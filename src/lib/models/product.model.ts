import mongoose, { models } from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  type: { type: String },
  color: { type: mongoose.Schema.Types.ObjectId, ref: 'Color' },
  features: { type: String },
  manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Manufacturer' },
  price: { type: Number, required: true },
  size: {
    width: { type: String, required: true },
    height: { type: String, required: true },
    depth: { type: String, required: true },
  },
  sale: { type: Number },
  description: { type: String, required: true },
  characteristics: { type: String, required: true },
  images: [{
    type: String
  }],
});

const Product = models.Product || mongoose.model('Product', productSchema);

export default Product;