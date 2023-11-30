import mongoose, { models } from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  role: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String },
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
      amount: { type: Number, required: true }
    }
  ]
});

const User = models.User || mongoose.model('User', userSchema);

export default User;