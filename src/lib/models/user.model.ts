import mongoose, { models } from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String },
  role: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String },
  viewed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamps: true
});

const User = models.User || mongoose.model('User', userSchema);

export default User;