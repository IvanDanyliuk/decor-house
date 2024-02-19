import mongoose, { models } from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  type: { type: String },
  colors: [{ type: String, required: true }],
  features: [{ type: String }],
  manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: 'Manufacturer' },
  price: { type: Number, required: true },
  size: {
    width: { type: String, required: true },
    height: { type: String, required: true },
    depth: { type: String, required: true },
  },
  sale: { type: String },
  description: { type: String, required: true },
  characteristics: { type: String, required: true },
  images: [{
    type: String
  }],
}, {
  timestamps: true
});

const Product = models.Product || mongoose.model('Product', productSchema);

export default Product;