import { Schema, models, model } from 'mongoose';

const Product = new Schema({
  name: { type: String, required: true, unique: true },
  category: {
    type: String,
    enum: ['bracelet', 'earring', 'necklace', 'ring'],
    required: true,
  },
  description: String,
  visibilityStatus: Boolean,
  slug: String,
  discount: Number,
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
      size: Number,
      price: Number,
      color: String,
      quantity: Number,
      sku: String,
    },
  ],
});

export default models.Product || model('Product', Product);
