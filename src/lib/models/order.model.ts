import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number }
}, {
  _id: false
});

const orderSchema = new mongoose.Schema({
  user: { 
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
  },
  products: [cartItemSchema],
  totalAmount: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  deliveryMethod: { type: String, required: true },
  deliveryStatus: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, required: true },
}, {
  timestamps: true
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;