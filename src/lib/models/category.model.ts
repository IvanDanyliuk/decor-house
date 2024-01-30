import mongoose, { models } from 'mongoose';


const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  types: [{
    type: String
  }],
  features: [{
    type: String
  }],
}, {
  timestamps: true
});

const Category = models.Category || mongoose.model('Category', categorySchema);

export default Category;