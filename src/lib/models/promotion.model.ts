import mongoose, { models } from 'mongoose';


const promotionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  periodFrom: { type: String, required: true },
  periodTo: { type: String, required: true },
  description: { type: String, required: true },
});

const Promotion = models.Promotion || mongoose.model('Promotion', promotionSchema);

export default Promotion;