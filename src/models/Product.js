import { model, models, Schema } from 'mongoose';
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Product = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, slug: 'name', unique: true },
    description: { type: String, required: true },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
        type: {
          type: String,
          enum: ['primary', 'secondary'],
          default: 'secondary',
          required: true,
        },
      },
    ],
    category: {
      type: String,
      enum: ['bracelet', 'earring', 'necklace', 'ring'],
      required: true,
      lowercase: true,
    },
    sold: { type: Number, required: true, default: 0 },
    visibilityStatus: {
      type: String,
      enum: ['published', 'hidden'],
      required: true,
    },
    discount: { type: Number, required: true, default: 0 },
    coupon: { type: String },
    stocks: [
      {
        size: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        quantity: { type: Number, required: true, default: 0 },
        sku: { type: String },
      },
    ],
    search: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default models.Product || model('Product', Product);
