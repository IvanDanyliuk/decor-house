import { Schema, models, model } from 'mongoose';

const shopSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  coordinates:{
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
}, {
  timestamps: true
});

const Shop = models.Shop || model('Shop', shopSchema);

export default Shop;