import { Schema, models, model } from 'mongoose';

const Product = new Schema({
  name: { type: String, required: true, unique: true },
  category: {
    type: String,
    enum: ['Bracelet', 'Earring', 'Necklace', 'Ring'],
    required: true,
  },
  description: String,
  visibilityStatus: {
    type: String,
    enum: ['published', 'hidden'],
    required: true,
  },
  slug: String,
  coupon: String,
  images: [
    {
      url: String,
      type: {
        type: String,
        enum: ['primary', 'secondary'],
      },
    },
  ],
  stocks: [
    {
      size: String,
      price: Number,
      color: String,
      quantity: Number,
      sku: String,
    },
  ],
});

export default models.Product || model('Product', Product);
