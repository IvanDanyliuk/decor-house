import mongoose, { models } from 'mongoose';


const interiorSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
}, {
  timestamps: true
});

const Interior = models.Interior || mongoose.model('Interior', interiorSchema);

export default Interior;