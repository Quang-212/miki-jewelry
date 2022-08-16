import { model, models, Schema } from 'mongoose';

const Product = new Schema({
  name: { type: String, required: true, unique: true },
  slug: String,
  description: String,
  images: [
    {
      url: String,
      type: {
        type: String,
        enum: ['primary', 'secondary'],
      },
    },
  ],
  category: {
    type: String,
    enum: ['Bracelet', 'Earring', 'Necklace', 'Ring'],
    required: true,
  },
  visibilityStatus: {
    type: String,
    enum: ['published', 'hidden'],
    required: true,
  },
  discount: Number,
  coupon: String,
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
