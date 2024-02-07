import mongoose, { models } from 'mongoose';

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hexValue: { type: String, required: true },
}, {
  timestamps: true
});

const Color = models.Color || mongoose.model('Color', colorSchema);

export default Color;