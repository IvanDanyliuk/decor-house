import mongoose, { models } from 'mongoose';

const manufacturerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
});

const Manufacturer = models.Manufacturer || mongoose.model('Manufacturer', manufacturerSchema);

export default Manufacturer;