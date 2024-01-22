import { Schema, models, model } from 'mongoose';

const shopSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  coordinates:{ type: String, required: true },
});

const Shop = models.Shop || model('Shop', shopSchema);

export default Shop;